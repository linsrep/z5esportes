import React, { useState } from 'react';
import { generateVeoVideo } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Play, Loader2, Sparkles } from 'lucide-react';

export default function VeoGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;
    
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);

    try {
      const url = await generateVeoVideo(image, prompt, aspectRatio);
      setVideoUrl(url);
    } catch (err) {
      setError('Falha ao gerar o vídeo. Verifique sua chave de API e tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4">
          Transforme Fotos em <span className="text-primary">Vídeos Épicos</span>
        </h2>
        <p className="text-slate-600">
          Utilize a tecnologia Veo da Google para animar suas fotos de corrida e criar conteúdos promocionais incríveis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">1. Upload da Foto</label>
            <div 
              className={`relative aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden ${
                image ? 'border-primary/50 bg-slate-50' : 'border-slate-200 hover:border-primary/30 bg-white'
              }`}
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center p-6 text-center">
                  <Upload className="w-10 h-10 text-slate-300 mb-2" />
                  <span className="text-sm text-slate-500">Clique para enviar ou arraste uma foto</span>
                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">2. Descreva a Animação</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Um corredor cruzando a linha de chegada com fogos de artifício ao fundo..."
              className="w-full rounded-xl border-slate-200 focus:border-primary focus:ring-primary text-sm min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">3. Formato</label>
            <div className="flex gap-4">
              <button 
                onClick={() => setAspectRatio('16:9')}
                className={`flex-1 py-2 px-4 rounded-lg border text-xs font-bold transition-all ${
                  aspectRatio === '16:9' ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                16:9 (Horizontal)
              </button>
              <button 
                onClick={() => setAspectRatio('9:16')}
                className={`flex-1 py-2 px-4 rounded-lg border text-xs font-bold transition-all ${
                  aspectRatio === '9:16' ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                9:16 (Vertical)
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!image || isGenerating}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Gerando Vídeo...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Gerar Vídeo com Veo
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">Resultado</label>
          <div className="aspect-video rounded-xl bg-slate-900 flex flex-col items-center justify-center text-white overflow-hidden relative">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center p-8"
                >
                  <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-sm font-medium">Isso pode levar alguns minutos...</p>
                  <p className="text-xs text-slate-400 mt-2">Nossa IA está processando cada frame para criar a animação perfeita.</p>
                </motion.div>
              ) : videoUrl ? (
                <motion.video 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={videoUrl} 
                  controls 
                  autoPlay 
                  loop 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-8 text-slate-500">
                  <Play className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-sm">O vídeo gerado aparecerá aqui</p>
                </div>
              )}
            </AnimatePresence>
            
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-500/90 text-white text-[10px] p-2 rounded-lg text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
