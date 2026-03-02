import { Link } from 'react-router-dom';

const FOOTER_LOGO = './logo-h.png';

export default function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-xl py-12 border-t border-white/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-row items-center gap-3 mb-4">
              <img alt="Z5 Esportes" className="h-6 w-auto object-contain" src={FOOTER_LOGO} />
              <br className="hidden md:hidden flex flex-row" />  
              <span className="font-bold text-lg tracking-tight text-slate-900">
                Encontre seu próximo <span className="text-primary">desafio</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              A plataforma definitiva para conectar atletas e organizadores de eventos esportivos em todo o Brasil. Performance, paixão e tecnologia.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                aria-label="Site oficial Z5 Esportes"
                className="text-slate-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">public</span>
              </a>
              <a
                href="#"
                aria-label="E-mail Z5 Esportes"
                className="text-slate-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">alternate_email</span>
              </a>
            </div>
          </div>

          {/* Explorar */}
          <nav aria-label="Links de exploração">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-4">Explorar</h3>
            <ul className="space-y-2">
              <li><Link to="/explorar" className="text-xs text-slate-500 hover:text-primary transition-colors">Corridas de Rua</Link></li>
              <li><Link to="/explorar" className="text-xs text-slate-500 hover:text-primary transition-colors">Campeonatos</Link></li>
              <li><Link to="/explorar" className="text-xs text-slate-500 hover:text-primary transition-colors">Triatlo</Link></li>
              <li><Link to="/explorar" className="text-xs text-slate-500 hover:text-primary transition-colors">Eventos Virtuais</Link></li>
            </ul>
          </nav>

          {/* Para Organizadores */}
          <nav aria-label="Links para organizadores">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-4">Para Organizadores</h3>
            <ul className="space-y-2">
              <li><Link to="/organizar" className="text-xs text-slate-500 hover:text-primary transition-colors">Criar Evento</Link></li>
              <li><Link to="/organizar" className="text-xs text-slate-500 hover:text-primary transition-colors">Taxas</Link></li>
              <li><Link to="/organizar" className="text-xs text-slate-500 hover:text-primary transition-colors">Gestão de Atletas</Link></li>
              <li><Link to="/organizar" className="text-xs text-slate-500 hover:text-primary transition-colors">Casos de Sucesso</Link></li>
            </ul>
          </nav>

          {/* Suporte */}
          <nav aria-label="Links de suporte">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><Link to="/ajuda" className="text-xs text-slate-500 hover:text-primary transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/termos" className="text-xs text-slate-500 hover:text-primary transition-colors">Termos e Condições</Link></li>
              <li><Link to="/privacidade" className="text-xs text-slate-500 hover:text-primary transition-colors">Privacidade</Link></li>
              <li><Link to="/contato" className="text-xs text-slate-500 hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-slate-50 text-center">
          <p className="text-[10px] text-slate-400">© 2026 Z5 Esportes. Todos os direitos reservados. Emoção em alta frequência.</p>
        </div>
      </div>
    </footer>
  );
}
