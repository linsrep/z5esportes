import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { getJsonCookie, SelectedEvent } from '../lib/cookies';
import { loginUser } from '../services/authService';
import { setAuthUser } from '../lib/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedEvent = getJsonCookie<SelectedEvent>('z5_selected_event');
    if (savedEvent) {
      setSelectedEvent(savedEvent);
    }
  }, []);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Credenciais de superadmin local para ambiente de desenvolvimento
    if (email === 'goatechbr@gmail.com' && password === 'Dol40sk8@') {
      setAuthUser({
        name: 'Super Admin',
        email,
        role: 'admin',
      });
      navigate('/admin/dashboard', { replace: true });
      return;
    }

    try {
      const user = await loginUser(email, password);
      setAuthUser({
        name: user.displayName || user.email || 'Usuário',
        email: user.email ?? '',
        role: 'athlete',
      });

      const savedEvent = getJsonCookie<SelectedEvent>('z5_selected_event');
      const hasExtras = savedEvent?.extra_items?.length > 0;
      const nextPath = savedEvent ? (hasExtras ? '/evento/adicionais' : '/painel') : from;
      navigate(nextPath, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 sm:px-6 sm:py-20">
      <div className="max-w-md w-full bg-white p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">Bem-vindo de volta</h1>
          <p className="text-xs text-slate-500">Acesse sua conta para gerenciar suas inscrições.</p>
        </div>

        {selectedEvent && (
          <div className="mb-6 rounded-3xl border border-primary/20 bg-primary/5 p-4 text-sm text-slate-900">
            <p className="font-bold text-slate-900">Evento selecionado</p>
            <p className="mt-1 font-semibold">{selectedEvent.title}</p>
            <p className="text-slate-500 text-xs">
              {selectedEvent.date} • {selectedEvent.price}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="text-[10px] font-bold text-slate-900 uppercase mb-1.5 block">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-2xl border-slate-100 bg-slate-50 px-4 sm:px-5 py-3.5 focus:ring-primary focus:border-primary text-sm font-medium"
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-2xl border-slate-100 bg-slate-50 px-4 sm:px-5 py-3.5 focus:ring-primary focus:border-primary text-sm font-medium"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button className="w-full bg-primary text-white py-3.5 sm:py-4 rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 mt-4">
            Entrar na conta
          </button>
        </form>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-500">
            Não tem uma conta? <Link to="/cadastro" className="text-primary font-bold hover:underline">Cadastre-se agora</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
