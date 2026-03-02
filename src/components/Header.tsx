import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

// Logo served from /public — use absolute path
const LOGO_URL = '/logo-v-slogan.png';

const navItems = [
  { name: 'EVENTOS', path: '/explorar' },
  { name: 'NOVIDADES', path: '/organizar' },
  { name: 'CENTRAL DE AJUDA', path: '/ajuda' },
];

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/60 backdrop-blur-2xl border-b border-white/20 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">

        {/* Logo */}
        <Link
          to="/"
          aria-label="Z5 Esportes — Página inicial"
          className="flex items-center"
        >
          <img
            src={LOGO_URL}
            alt="Z5 Esportes"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Navegação principal"
          className="hidden flex-1 justify-center gap-8 md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={location.pathname === item.path ? 'page' : undefined}
              className={cn(
                'text-xs font-medium transition-colors hover:text-primary',
                location.pathname === item.path ? 'text-primary' : 'text-slate-600',
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + Mobile hamburger */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden md:block text-xs font-bold text-slate-900 hover:text-primary transition-colors"
          >
            Entrar
          </Link>
          <Link
            to="/cadastro"
            className="hidden md:block rounded-lg bg-primary px-5 py-2 text-xs font-bold text-white shadow-md shadow-primary/20 hover:bg-red-700 transition-all"
          >
            Cadastrar
          </Link>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            {isMobileMenuOpen
              ? <X className="w-5 h-5" aria-hidden="true" />
              : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Menu de navegação mobile"
          className="md:hidden border-t border-white/20 bg-white/95 backdrop-blur-2xl px-6 py-4"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  onClick={closeMobileMenu}
                  className={cn(
                    'block py-2.5 text-sm font-medium transition-colors hover:text-primary',
                    location.pathname === item.path ? 'text-primary' : 'text-slate-600',
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="text-sm font-bold text-slate-900 hover:text-primary transition-colors"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                onClick={closeMobileMenu}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white text-center shadow-md shadow-primary/20 hover:bg-red-700 transition-all"
              >
                Cadastrar
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
