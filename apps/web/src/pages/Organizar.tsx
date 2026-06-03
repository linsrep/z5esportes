import { FormEvent, useState } from 'react';

export default function Organizar() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-10">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-primary">Área do Organizador</p>
          <h1 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">Organize seu evento com a Z5 Esportes</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Se você é organizador de provas, trilhas ou eventos esportivos, use este espaço para entrar em contato com a nossa equipe e cadastrar sua próxima competição na plataforma.
          </p>
        </div>

        {success && (
          <div className="mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-medium text-emerald-700">
            Mensagem enviada! Nossa equipe entrará em contato em breve.
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] bg-slate-50 p-6">
              <h2 className="text-xl font-black text-slate-900">Como funciona</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>1. Conte-nos sobre seu evento e perfil de público.</li>
                <li>2. Nossa equipe validará e orientará sobre a publicação.</li>
                <li>3. Seu evento será exibido para atletas em todo o Brasil.</li>
              </ul>
            </div>

            <div className="rounded-[28px] bg-slate-50 p-6">
              <h2 className="text-xl font-black text-slate-900">Contato rápido</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Envie uma mensagem usando o formulário ou escreva diretamente para:
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p>
                  <strong>E-mail:</strong> <a href="mailto:contato@z5esportes.com.br" className="text-primary hover:underline">contato@z5esportes.com.br</a>
                </p>
                <p>
                  <strong>Telefone:</strong> <a href="tel:+5511999999999" className="text-primary hover:underline">(11) 99999-9999</a>
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Fale com a equipe</h2>
            <p className="mt-2 text-sm text-slate-500">Nos diga brevemente sobre seu evento e a ideia para cadastro.</p>

            <label className="mt-6 block">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Nome</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium focus:border-primary focus:ring-primary/10"
                placeholder="Seu nome"
              />
            </label>

            <label className="mt-4 block">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium focus:border-primary focus:ring-primary/10"
                placeholder="contato@empresa.com"
              />
            </label>

            <label className="mt-4 block">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Mensagem</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium focus:border-primary focus:ring-primary/10"
                placeholder="Conte-nos sobre seu evento, público-alvo e quando gostaria de publicar."
              />
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-3xl bg-primary px-6 py-3 text-sm font-black text-white transition-all hover:bg-red-700"
            >
              Enviar mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
