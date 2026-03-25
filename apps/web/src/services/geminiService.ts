const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

export const generateVeoVideo = async (
  imageBase64: string,
  prompt: string,
  aspectRatio: '16:9' | '9:16' = '16:9',
) => {
  const response = await fetch(`${API_BASE_URL}/api/veo/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageBase64,
      prompt,
      aspectRatio,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.videoDataUrl) {
    throw new Error(data.error ?? 'Falha ao gerar o vídeo.');
  }

  return data.videoDataUrl as string;
};
