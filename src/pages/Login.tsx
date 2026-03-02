import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full bg-white p-10 rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Bem-vindo de volta</h1>
          <p className="text-xs text-slate-500">Acesse sua conta para gerenciar suas inscrições.</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="text-[10px] font-bold text-slate-900 uppercase mb-1.5 block">E-mail</label>
            <input 
              type="email" 
              className="w-full rounded-2xl border-slate-100 bg-slate-50 px-5 py-3.5 focus:ring-primary focus:border-primary text-sm font-medium" 
              placeholder="seu@email.com" 
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] font-bold text-slate-900 uppercase block">Senha</label>
              <a href="#" className="text-[10px] font-bold text-primary hover:underline">Esqueceu a senha?</a>
            </div>
            <input 
              type="password" 
              className="w-full rounded-2xl border-slate-100 bg-slate-50 px-5 py-3.5 focus:ring-primary focus:border-primary text-sm font-medium" 
              placeholder="••••••••" 
            />
          </div>

          <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 mt-4">
            Entrar na conta
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-500">
            Não tem uma conta? <Link to="/cadastro" className="text-primary font-bold hover:underline">Cadastre-se agora</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
