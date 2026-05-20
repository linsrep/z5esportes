import path from 'node:path';
import {fileURLToPath} from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {GoogleGenAI} from '@google/genai';
import {Pool} from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.resolve(__dirname, '../../../.env.local')});
dotenv.config({path: path.resolve(__dirname, '../../../.env')});

const apiPort = Number(process.env.API_PORT ?? '3333');
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
const databaseUrl = process.env.DATABASE_URL;
const geminiApiKey = process.env.GEMINI_API_KEY;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const app = express();
const db = databaseUrl ? new Pool({connectionString: databaseUrl}) : null;
const registeredEmails = new Set<string>();
const registeredCpfs = new Set<string>();

function normalizeCpf(value: string) {
  return value.replace(/\D/g, '');
}

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  }),
);
app.use(express.json({limit: '10mb'}));

app.get('/health', async (_req, res) => {
  let database = 'not-configured';

  if (db) {
    try {
      await db.query('select 1');
      database = 'up';
    } catch {
      database = 'down';
    }
  }

  res.json({
    service: 'z5esportes-api',
    status: 'ok',
    database,
    frontendUrl,
  });
});

app.post('/api/auth/register', async (req, res) => {
  const {name, cpf, email, password} = req.body as {
    name?: string;
    cpf?: string;
    email?: string;
    password?: string;
  };

  const normalizedName = name?.trim() ?? '';
  const normalizedCpf = normalizeCpf(cpf ?? '');
  const normalizedEmail = email?.trim().toLowerCase() ?? '';

  if (!normalizedName) {
    return res.status(400).json({error: 'Informe seu nome completo.'});
  }

  if (normalizedCpf.length !== 11) {
    return res.status(400).json({error: 'Informe um CPF valido.'});
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return res.status(400).json({error: 'Informe um e-mail valido.'});
  }

  if (!PASSWORD_REGEX.test(password ?? '')) {
    return res.status(400).json({error: 'Use uma senha com no minimo 8 caracteres, letra e numero.'});
  }

  if (registeredEmails.has(normalizedEmail)) {
    return res.status(409).json({error: 'Este e-mail ja foi cadastrado.'});
  }

  if (registeredCpfs.has(normalizedCpf)) {
    return res.status(409).json({error: 'Este CPF ja foi cadastrado.'});
  }

  registeredEmails.add(normalizedEmail);
  registeredCpfs.add(normalizedCpf);

  return res.status(201).json({
    message: 'Cadastro realizado com sucesso.',
    user: {
      name: normalizedName,
      email: normalizedEmail,
      cpf: normalizedCpf,
    },
  });
});

app.post('/api/veo/generate', async (req, res) => {
  if (!geminiApiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY não configurada na API.',
    });
  }

  const {imageBase64, prompt, aspectRatio} = req.body as {
    imageBase64?: string;
    prompt?: string;
    aspectRatio?: '16:9' | '9:16';
  };

  if (!imageBase64) {
    return res.status(400).json({
      error: 'Envie uma imagem em base64 para gerar o vídeo.',
    });
  }

  const ai = new GoogleGenAI({apiKey: geminiApiKey});

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt:
        prompt ||
        'A cinematic video of a marathon runner crossing the finish line with high energy',
      image: {
        imageBytes: imageBase64.split(',')[1],
        mimeType: 'image/png',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio ?? '16:9',
      },
    });

    while (!operation.done) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({operation});
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) {
      return res.status(502).json({
        error: 'A API não retornou a URL do vídeo gerado.',
      });
    }

    const response = await fetch(videoUri, {
      method: 'GET',
      headers: {
        'x-goog-api-key': geminiApiKey,
      },
    });

    if (!response.ok) {
      return res.status(502).json({
        error: 'Falha ao baixar o vídeo gerado.',
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Video = Buffer.from(arrayBuffer).toString('base64');

    return res.json({
      videoDataUrl: `data:video/mp4;base64,${base64Video}`,
    });
  } catch (error) {
    console.error('Erro ao gerar vídeo com Gemini/Veo:', error);
    return res.status(500).json({
      error: 'Falha ao gerar o vídeo.',
    });
  }
});

app.listen(apiPort, () => {
  console.log(`API running on http://localhost:${apiPort}`);
});
