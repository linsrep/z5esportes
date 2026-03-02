import { Link } from 'react-router-dom';

const FOOTER_LOGO = "https://lh3.googleusercontent.com/aida-public/AB6AXuAlhF3PUxLRSEuTaEt4rlEV4N48lVEP4-0bYaKalFSUSgxWA6_RBUqNVlTECWHzbLyoMM6WG8Fnv7OEu_EiIrl98-DnJSkJ_uZOnhmYBmfugLaAyK2em0V9ZhVLyU-wicSzJefOAn0WU4KF3ODXreZE4Nm9D_6aHJkFFMGEhWg-mAoqdEDqZqZZz6SPy-8LMWxpD03dSvLDoVhNpva74wIrYXnQtyepGUqIOmrB02YeXJjL-mp7xpF7r3CCPd8DTcD2azGpd1_I4mc";

export default function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-xl py-12 border-t border-white/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img alt="Z5 Esportes Logo" className="h-6 w-auto object-contain" src={FOOTER_LOGO} />
              <span className="font-bold text-lg tracking-tight text-slate-900">Z5 <span className="text-primary">Esportes</span></span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              A plataforma definitiva para conectar atletas e organizadores de eventos esportivos em todo o Brasil. Performance, paixão e tecnologia.
            </p>
            <div className="flex gap-4 mt-6">
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-lg">public</span></a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-lg">alternate_email</span></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-4">Explorar</h4>
            <ul className="space-y-2">
              <li><Link to="/explorar" className="text-xs text-slate-500 hover:text-primary transition-colors">Corridas de Rua</Link></li>
              <li><Link to="/explorar" className="text-xs text-slate-500 hover:text-primary transition-colors">Campeonatos</Link></li>
              <li><Link to="/explorar" className="text-xs text-slate-500 hover:text-primary transition-colors">Triatlo</Link></li>
              <li><Link to="/explorar" className="text-xs text-slate-500 hover:text-primary transition-colors">Eventos Virtuais</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-4">Para Organizadores</h4>
            <ul className="space-y-2">
              <li><Link to="/organizar" className="text-xs text-slate-500 hover:text-primary transition-colors">Criar Evento</Link></li>
              <li><Link to="/organizar" className="text-xs text-slate-500 hover:text-primary transition-colors">Taxas</Link></li>
              <li><Link to="/organizar" className="text-xs text-slate-500 hover:text-primary transition-colors">Gestão de Atletas</Link></li>
              <li><Link to="/organizar" className="text-xs text-slate-500 hover:text-primary transition-colors">Casos de Sucesso</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li><Link to="/ajuda" className="text-xs text-slate-500 hover:text-primary transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/termos" className="text-xs text-slate-500 hover:text-primary transition-colors">Termos e Condições</Link></li>
              <li><Link to="/privacidade" className="text-xs text-slate-500 hover:text-primary transition-colors">Privacidade</Link></li>
              <li><Link to="/contato" className="text-xs text-slate-500 hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-50 text-center">
          <p className="text-[10px] text-slate-400">© 2024 Z5 Esportes. Todos os direitos reservados. Focados no seu desempenho.</p>
        </div>
      </div>
    </footer>
  );
}
