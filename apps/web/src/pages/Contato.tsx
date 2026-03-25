import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contato() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Fale Conosco</h1>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Dúvidas sobre sua inscrição ou quer organizar um evento com a gente? Nossa equipe está pronta para ajudar.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">E-mail</p>
                <p className="text-sm font-bold text-slate-900">suporte@z5esportes.com.br</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-primary">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Telefone</p>
                <p className="text-sm font-bold text-slate-900">0800 555 1234</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Sede</p>
                <p className="text-sm font-bold text-slate-900">Florianópolis, SC - Brasil</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
          <form className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-900 uppercase mb-1 block">Nome Completo</label>
              <input type="text" className="w-full rounded-xl border-slate-100 bg-slate-50 focus:ring-primary focus:border-primary text-sm" placeholder="Seu nome" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-900 uppercase mb-1 block">E-mail</label>
              <input type="email" className="w-full rounded-xl border-slate-100 bg-slate-50 focus:ring-primary focus:border-primary text-sm" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-900 uppercase mb-1 block">Mensagem</label>
              <textarea className="w-full rounded-xl border-slate-100 bg-slate-50 focus:ring-primary focus:border-primary text-sm min-h-[120px]" placeholder="Como podemos ajudar?"></textarea>
            </div>
            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-xs hover:bg-red-700 transition-all shadow-lg shadow-red-500/20">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
