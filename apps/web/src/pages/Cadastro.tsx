import { Link } from 'react-router-dom';

export default function Cadastro() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full bg-white p-10 rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Crie sua conta</h1>
          <p className="text-xs text-slate-500">Junte-se à maior comunidade esportiva do Brasil.</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="text-[10px] font-bold text-slate-900 uppercase mb-1.5 block">Nome Completo</label>
            <input 
              type="text" 
              className="w-full rounded-2xl border-slate-100 bg-slate-50 px-5 py-3.5 focus:ring-primary focus:border-primary text-sm font-medium" 
              placeholder="Seu nome completo" 
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-900 uppercase mb-1.5 block">E-mail ou Usuário</label>
            <input 
              type="text" 
              className="w-full rounded-2xl border-slate-100 bg-slate-50 px-5 py-3.5 focus:ring-primary focus:border-primary text-sm font-medium" 
              placeholder="seu@email.com ou usuario" 
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-900 uppercase mb-1.5 block">Senha</label>
            <input 
              type="password" 
              className="w-full rounded-2xl border-slate-100 bg-slate-50 px-5 py-3.5 focus:ring-primary focus:border-primary text-sm font-medium" 
              placeholder="••••••••" 
            />
          </div>

          <div className="flex items-start gap-2 py-2">
            <input type="checkbox" className="mt-1 rounded border-slate-200 text-primary focus:ring-primary" id="terms" />
            <label htmlFor="terms" className="text-[10px] text-slate-500 leading-tight">
              Eu concordo com os <Link to="/termos" className="text-primary font-bold hover:underline">Termos de Uso</Link> e a <Link to="/privacidade" className="text-primary font-bold hover:underline">Política de Privacidade</Link>.
            </label>
          </div>

          <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 mt-2">
            Criar minha conta
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-500">
            Já tem uma conta? <Link to="/login" className="text-primary font-bold hover:underline">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
