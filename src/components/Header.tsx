import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuAlhF3PUxLRSEuTaEt4rlEV4N48lVEP4-0bYaKalFSUSgxWA6_RBUqNVlTECWHzbLyoMM6WG8Fnv7OEu_EiIrl98-DnJSkJ_uZOnhmYBmfugLaAyK2em0V9ZhVLyU-wicSzJefOAn0WU4KF3ODXreZE4Nm9D_6aHJkFFMGEhWg-mAoqdEDqZqZZz6SPy-8LMWxpD03dSvLDoVhNpva74wIrYXnQtyepGUqIOmrB02YeXJjL-mp7xpF7r3CCPd8DTcD2azGpd1_I4mc";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: 'Explorar Eventos', path: '/explorar' },
    { name: 'Criar Evento', path: '/organizar' },
    { name: 'Central de Ajuda', path: '/ajuda' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/60 backdrop-blur-2xl border-b border-white/20 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Link to="/" className="flex items-center gap-2">
          <img alt="Z5 Esportes Logo" className="h-7 w-auto object-contain" src={LOGO_URL} />
          <span className="font-bold text-lg tracking-tight text-slate-900">Z5 <span className="text-primary">Esportes</span></span>
        </Link>
        
        <nav className="hidden flex-1 justify-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-xs font-medium transition-colors hover:text-primary",
                location.pathname === item.path ? "text-primary" : "text-slate-600"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-xs font-bold text-slate-900 hover:text-primary transition-colors">Entrar</Link>
          <Link to="/cadastro" className="rounded-lg bg-primary px-5 py-2 text-xs font-bold text-white shadow-md shadow-primary/20 hover:bg-red-700 transition-all">Cadastrar</Link>
        </div>
      </div>
    </header>
  );
}
