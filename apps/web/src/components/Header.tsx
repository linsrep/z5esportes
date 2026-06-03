import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { clearAuthUser, getAuthUser } from '../lib/auth';
import { logoutUser } from '../services/authService';

// Logo served from /public — use absolute path
const LOGO_URL = '/logo-v-slogan.png';

const navItems = [
  { name: 'EVENTOS', path: '/explorar' },
  { name: 'ÁREA DO ORGANIZADOR', path: '/organizar' },
  { name: 'CENTRAL DE AJUDA', path: '/ajuda' },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(getAuthUser());

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    await logoutUser();
    clearAuthUser();
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    setUser(getAuthUser());
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/60 backdrop-blur-2xl border-b border-white/20 shadow-sm">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 lg:px-10">

        {/* Logo */}
        <Link
          to="/"
          aria-label="Z5 Esportes — Página inicial"
          className="flex items-center"
        >
          <img
            src={LOGO_URL}
            alt="Z5 Esportes"
            className="h-10 w-auto object-contain sm:h-12"
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
          {user ? (
            <>
              <span className="hidden md:block text-xs font-medium text-slate-700">Olá, {user.name}</span>
              {(user.role === 'admin' || user.role === 'organizer') && (
                <Link
                  to="/admin/dashboard"
                  className="hidden md:block rounded-lg border border-emerald-500 px-4 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/painel"
                className="hidden md:block rounded-lg border border-primary px-4 py-2 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
              >
                Painel
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden md:block rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <>
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
            </>
          )}

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
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
          className="md:hidden border-t border-white/20 bg-white/95 backdrop-blur-2xl px-4 py-4 sm:px-6"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  onClick={closeMobileMenu}
                  className={cn(
                    'block rounded-xl py-3 px-1 text-sm font-medium transition-colors hover:text-primary',
                    location.pathname === item.path ? 'text-primary' : 'text-slate-600',
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
              {user ? (
                <>
                  {(user.role === 'admin' || user.role === 'organizer') && (
                    <Link
                      to="/admin/dashboard"
                      onClick={closeMobileMenu}
                      className="rounded-xl border border-emerald-500 px-5 py-3 text-sm font-bold text-emerald-600 text-center hover:bg-emerald-50 transition-all"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/painel"
                    onClick={closeMobileMenu}
                    className="rounded-xl border border-primary px-5 py-3 text-sm font-bold text-primary text-center hover:bg-primary/10 transition-all"
                  >
                    Painel
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      handleLogout();
                    }}
                    className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-900 text-center hover:bg-slate-200 transition-all"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
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
                    className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white text-center shadow-md shadow-primary/20 hover:bg-red-700 transition-all"
                  >
                    Cadastrar
                  </Link>
                </>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
