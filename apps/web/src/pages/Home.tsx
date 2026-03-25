import { useState, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FEATURED_EVENTS, TRENDS } from '../lib/utils';
import EventCard from '../components/EventCard';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { Search, MapPin, Calendar, Layers, ChevronRight, Navigation, Users } from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORIES = [
  { id: 1, name: 'Corrida de Rua', icon: '🏃', slug: 'corrida' },
  { id: 2, name: 'Futebol', icon: '⚽', slug: 'futebol' },
  { id: 3, name: 'CrossFit', icon: '🏋️', slug: 'crossfit' },
  { id: 4, name: 'Ciclismo', icon: '🚴', slug: 'ciclismo' },
  { id: 5, name: 'Natação', icon: '🏊', slug: 'natacao' },
  { id: 6, name: 'Beach Tennis', icon: '🎾', slug: 'tennis' },
  { id: 7, name: 'Basquete', icon: '🏀', slug: 'basquete' },
  { id: 8, name: 'Vôlei', icon: '🏐', slug: 'volei' },
  { id: 9, name: 'Triatlo', icon: '🏊‍♂️', slug: 'triatlo' },
  { id: 10, name: 'Trail Run', icon: '⛰️', slug: 'trail' },
];

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export default function Home() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Tudo');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isModalityModalOpen, setIsModalityModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('Março');
  const [selectedLocation, setSelectedLocation] = useState('Sua cidade');
  const [selectedDate, setSelectedDate] = useState('Data');
  const [selectedModality, setSelectedModality] = useState('Modalidade');
  const [showNewsletterToast, setShowNewsletterToast] = useState(false);

  // Refs to avoid document.querySelector anti-patterns
  const locationInputRef = useRef<HTMLInputElement>(null);

  const filteredTrends = activeFilter === 'Tudo'
    ? TRENDS
    : TRENDS.filter(trend => trend.category === activeFilter);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowNewsletterToast(true);
  };

  const confirmLocation = () => {
    const value = locationInputRef.current?.value.trim();
    if (value) {
      setSelectedLocation(value);
      setIsLocationModalOpen(false);
    }
  };

  return (
    <div className="relative">

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 px-6 text-center overflow-hidden z-10">
        <div className="relative z-10 mx-auto max-w-5xl">
          <h1 className="text-[56px] md:text-[84px] font-[900] tracking-[-0.04em] text-[#0F172A] leading-[0.95] mb-8">
            Encontre seu próximo <br />
            <span className="bg-gradient-to-r from-[#FF0000] to-[#FFB800] bg-clip-text text-transparent">desafio</span>
          </h1>
          <p className="text-base md:text-[19px] text-slate-600 max-w-3xl mx-auto mb-16 leading-[1.6] font-medium">
            A maior plataforma para inscrições em corridas, torneios de futebol <br className="hidden md:block" />
            e eventos esportivos de elite.
          </p>

          {/* Search Bar */}
          <div
            role="search"
            aria-label="Buscar eventos esportivos"
            className="mx-auto max-w-[1200px] bg-white/70 backdrop-blur-3xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 p-2 flex flex-col md:flex-row items-stretch gap-0"
          >
            <button
              onClick={() => setIsSearchModalOpen(true)}
              aria-label={searchQuery ? `Busca atual: ${searchQuery}. Alterar busca por esporte` : 'Buscar por esporte'}
              className="flex-[1.5] flex items-center gap-3 px-6 py-4 group transition-all text-left"
            >
              <Search className="w-5 h-5 text-primary" strokeWidth={3} aria-hidden="true" />
              <span className={`text-[14px] font-bold truncate ${searchQuery ? 'text-slate-900' : 'text-slate-500'}`}>
                {searchQuery || 'Busque pelo nome do evento?'}
              </span>
            </button>

            <div aria-hidden="true" className="hidden md:block w-px h-8 bg-slate-200 self-center" />

            <button
              onClick={() => setIsLocationModalOpen(true)}
              aria-label={selectedLocation !== 'Sua cidade' ? `Localização: ${selectedLocation}. Alterar` : 'Selecionar localização'}
              className="flex-1 flex items-center gap-3 px-6 py-4 hover:bg-white/40 transition-all group"
            >
              <MapPin className="w-5 h-5 text-primary" strokeWidth={3} aria-hidden="true" />
              <span className={`text-[14px] font-bold truncate group-hover:text-slate-900 ${selectedLocation !== 'Sua cidade' ? 'text-slate-900' : 'text-slate-500'}`}>
                {selectedLocation}
              </span>
            </button>

            <div aria-hidden="true" className="hidden md:block w-px h-8 bg-slate-200 self-center" />

            <button
              onClick={() => setIsDateModalOpen(true)}
              aria-label={selectedDate !== 'Data' ? `Data: ${selectedDate}. Alterar` : 'Selecionar data'}
              className="flex-1 flex items-center gap-3 px-6 py-4 hover:bg-white/40 transition-all group"
            >
              <Calendar className="w-5 h-5 text-primary" strokeWidth={3} aria-hidden="true" />
              <span className={`text-[14px] font-bold truncate group-hover:text-slate-900 ${selectedDate !== 'Data' ? 'text-slate-900' : 'text-slate-500'}`}>
                {selectedDate}
              </span>
            </button>

            <div aria-hidden="true" className="hidden md:block w-px h-8 bg-slate-200 self-center" />

            <button
              onClick={() => setIsModalityModalOpen(true)}
              aria-label={selectedModality !== 'Modalidade' ? `Modalidade: ${selectedModality}. Alterar` : 'Selecionar modalidade'}
              className="flex-1 flex items-center gap-3 px-6 py-4 hover:bg-white/40 transition-all group"
            >
              <Layers className="w-5 h-5 text-primary" strokeWidth={3} aria-hidden="true" />
              <span className={`text-[14px] font-bold truncate group-hover:text-slate-900 ${selectedModality !== 'Modalidade' ? 'text-slate-900' : 'text-slate-500'}`}>
                {selectedModality}
              </span>
            </button>

            <button className="bg-primary text-white px-10 py-4 rounded-full font-black text-[15px] hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 active:scale-95 ml-2">
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* ── Featured Competitions ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10" aria-labelledby="featured-heading">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 id="featured-heading" className="text-2xl font-bold tracking-tight text-slate-900">Competições em Destaque</h2>
            <p className="text-xs text-slate-500 mt-1">Eventos esportivos selecionados para você superar seus limites</p>
          </div>
          <button
            onClick={() => navigate('/explorar')}
            aria-label="Ver todos os eventos em destaque"
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest transition-all"
          >
            Ver todos <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_EVENTS.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* ── Trends Section ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10" aria-labelledby="trends-heading">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 id="trends-heading" className="text-2xl font-bold tracking-tight text-slate-900">Tendências Esportivas</h2>
            <p className="text-xs text-slate-500 mt-1">O que os atletas estão buscando agora</p>
          </div>
          <button
            onClick={() => navigate('/explorar')}
            aria-label="Ver todas as tendências esportivas"
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest transition-all"
          >
            Ver todas <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
          </button>
        </div>

        <div className="relative overflow-hidden py-4">
          <div className="flex whitespace-nowrap">
            <div
              className="flex gap-6 px-4 hover:[animation-play-state:paused]"
              style={{ animation: 'slide-trends 30s linear infinite' }}
            >
              {/* Visible items — accessible */}
              {filteredTrends.map((trend) => (
                <div key={trend.id} className="inline-block w-[240px] group cursor-pointer whitespace-normal">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-3 shadow-sm border border-white/20">
                    <img src={trend.image} alt={trend.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 mb-1 group-hover:text-primary transition-colors uppercase tracking-tight">{trend.title}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{trend.location}</p>
                </div>
              ))}
              {/* Duplicates for seamless loop — hidden from assistive tech */}
              {filteredTrends.map((trend) => (
                <div key={`dup-${trend.id}`} aria-hidden="true" className="inline-block w-[240px] group cursor-pointer whitespace-normal">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-3 shadow-sm border border-white/20">
                    <img src={trend.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <p className="text-xs font-black text-slate-900 mb-1 uppercase tracking-tight">{trend.title}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{trend.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes slide-trends {
            0% { transform: translateX(0); }
            100% { transform: translateX(-1200px); }
          }
        `}} />
      </section>

      {/* ── Features Section ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10" aria-labelledby="features-heading">
        <div className="text-center mb-16">
          <h2 id="features-heading" className="text-4xl font-black text-slate-900 tracking-tight mb-4">Por que organizar com a Z5?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">Tecnologia de ponta para elevar o nível do seu evento esportivo.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Automação Inteligente', desc: 'Gestão automática de lotes e confirmações de pagamento.', icon: 'bolt' },
            { title: 'Suporte ao Atleta', desc: 'Canal direto para tirar dúvidas e resolver problemas rapidamente.', icon: 'support_agent' },
            { title: 'Personalização Total', desc: 'Sua marca em evidência com páginas exclusivas e customizadas.', icon: 'palette' },
            { title: 'Multiformulário', desc: 'Colete exatamente os dados que você precisa de cada atleta.', icon: 'list_alt' },
            { title: 'Repasse Rápido', desc: 'Receba seus valores de forma flexível e segura.', icon: 'payments' },
            { title: 'Ficha Médica', desc: 'Segurança em primeiro lugar com histórico médico integrado.', icon: 'medical_services' },
            { title: 'Cupons de Desconto', desc: 'Crie campanhas de marketing com cupons personalizados.', icon: 'confirmation_number' },
            { title: 'Pré-venda Exclusiva', desc: 'Fidelize seus atletas com acessos antecipados.', icon: 'stars' },
          ].map((feature, idx) => (
            <div key={idx} className="p-8 bg-white/40 backdrop-blur-md rounded-[32px] border border-white/20 hover:shadow-xl transition-all group">
              <div aria-hidden="true" className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials Section ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10" aria-labelledby="testimonials-heading">
        <div className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-4xl font-black text-slate-900 tracking-tight mb-4">Quem usa, aprova</h2>
          <p className="text-slate-500 font-medium">A experiência de quem transformou seus eventos com a Z5.</p>
        </div>

        <div className="relative overflow-hidden py-10">
          {/* Fade masks — decorative */}
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f5f5f0] to-transparent z-10 pointer-events-none" />
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f5f5f0] to-transparent z-10 pointer-events-none" />

          <div className="flex whitespace-nowrap">
            <div
              className="flex gap-8 px-4 hover:[animation-play-state:paused]"
              style={{ animation: 'slide 40s linear infinite' }}
            >
              {/* Visible testimonials — accessible */}
              {[
                { name: 'Lane Santana', role: 'Organizadora Corre-Corre', text: 'Site maravilhoso. Atende a todas as necessidades para o evento. Suporte rápido e atencioso.', img: 'https://picsum.photos/seed/lane/100/100' },
                { name: 'Rafael RSF', role: 'Desafio Entre Barras', text: 'A Z5 revolucionou nossa gestão. Personalizamos tudo e o evento foi um sucesso absoluto.', img: 'https://picsum.photos/seed/rafa/100/100' },
                { name: 'Mikelle Coelho', role: 'Mika Bday Run', text: 'Com mais de 500 inscritos, eu precisava de uma plataforma à altura - e a Z5 superou tudo.', img: 'https://picsum.photos/seed/mika/100/100' },
              ].map((t, idx) => (
                <figure key={idx} className="inline-block w-[450px] p-10 bg-white/80 backdrop-blur-xl rounded-[48px] border border-white/40 shadow-xl relative whitespace-normal group hover:scale-[1.02] transition-all">
                  <span aria-hidden="true" className="material-symbols-outlined text-primary/10 text-7xl absolute top-6 right-8">format_quote</span>
                  <blockquote>
                    <p className="text-slate-600 italic mb-10 relative z-10 leading-relaxed font-bold text-lg">"{t.text}"</p>
                  </blockquote>
                  <figcaption className="flex items-center gap-4">
                    <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full border-2 border-primary/20 object-cover" />
                    <div>
                      <p className="font-black text-slate-900 text-lg">{t.name}</p>
                      <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}

              {/* Duplicates for seamless loop — hidden from assistive tech */}
              {[
                { name: 'Lane Santana', role: 'Organizadora Corre-Corre', text: 'Site maravilhoso. Atende a todas as necessidades para o evento. Suporte rápido e atencioso.', img: 'https://picsum.photos/seed/lane/100/100' },
                { name: 'Rafael RSF', role: 'Desafio Entre Barras', text: 'A Z5 revolucionou nossa gestão. Personalizamos tudo e o evento foi um sucesso absoluto.', img: 'https://picsum.photos/seed/rafa/100/100' },
                { name: 'Mikelle Coelho', role: 'Mika Bday Run', text: 'Com mais de 500 inscritos, eu precisava de uma plataforma à altura - e a Z5 superou tudo.', img: 'https://picsum.photos/seed/mika/100/100' },
              ].map((t, idx) => (
                <div key={`dup-${idx}`} aria-hidden="true" className="inline-block w-[450px] p-10 bg-white/80 backdrop-blur-xl rounded-[48px] border border-white/40 shadow-xl relative whitespace-normal">
                  <span className="material-symbols-outlined text-primary/10 text-7xl absolute top-6 right-8">format_quote</span>
                  <p className="text-slate-600 italic mb-10 relative z-10 leading-relaxed font-bold text-lg">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.img} alt="" className="w-14 h-14 rounded-full border-2 border-primary/20 object-cover" />
                    <div>
                      <p className="font-black text-slate-900 text-lg">{t.name}</p>
                      <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-1200px); }
          }
        `}} />
      </section>

      {/* ── Newsletter Section ───────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center" aria-labelledby="newsletter-heading">
        <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-[48px] shadow-2xl shadow-primary/20">
          <div className="bg-white/90 backdrop-blur-md rounded-[44px] px-8 py-16">
            <h2 id="newsletter-heading" className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Não perca nenhum desafio</h2>
            <p className="text-slate-600 mb-10 font-medium">Receba em primeira mão as aberturas de inscrições dos maiores eventos.</p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={handleNewsletterSubmit}
              aria-label="Formulário de inscrição na newsletter"
            >
              <div className="flex-1 flex flex-col">
                <label htmlFor="newsletter-email" className="sr-only">Seu melhor e-mail</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Seu melhor e-mail"
                  className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
              >
                Inscrever
              </button>
            </form>
            <p className="text-[10px] text-slate-400 mt-6 font-medium uppercase tracking-widest">Respeitamos sua privacidade. Cancele a qualquer momento.</p>
          </div>
        </div>
      </section>

      {/* ── Featured Organizers ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 border-t border-white/10" aria-label="Organizadores parceiros">
        <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Grandes organizadores que confiam na Z5</p>
        <div className="flex flex-wrap justify-center items-center gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
          {[
            { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
            { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
            { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
            { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
            { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
            { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
            { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
          ].map((brand) => (
            <img key={brand.name} src={brand.logo} alt={brand.name} className="h-12 w-auto object-contain" loading="lazy" />
          ))}
        </div>
      </section>

      {/* ── Past Events Section ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10" aria-labelledby="past-events-heading">
        <div className="mb-12 text-center">
          <h2 id="past-events-heading" className="text-4xl font-black text-slate-900 tracking-tight mb-4">Eventos Realizados</h2>
          <p className="text-slate-500 font-medium">Confira o sucesso de competições que já passaram pela nossa plataforma.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Maratona do Sol 2024', date: 'Jan 2024', img: 'https://picsum.photos/seed/run1/400/300', athletes: '1.200' },
            { title: 'Copa Z5 de Futebol', date: 'Fev 2024', img: 'https://picsum.photos/seed/soccer1/400/300', athletes: '32 Times' },
            { title: 'CrossFit Games Regional', date: 'Mar 2024', img: 'https://picsum.photos/seed/cross1/400/300', athletes: '450' },
            { title: 'Pedal da Serra', date: 'Abr 2024', img: 'https://picsum.photos/seed/bike1/400/300', athletes: '800' },
          ].map((event, idx) => (
            <article key={idx} className="group relative overflow-hidden rounded-[32px] bg-white/40 backdrop-blur-md border border-white/20 shadow-sm grayscale hover:grayscale-0 transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={event.img} alt={event.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{event.date}</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase">Finalizado</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-2">{event.title}</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Users className="w-3 h-3" aria-hidden="true" /> {event.athletes} Atletas
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Modals ───────────────────────────────────────────────── */}
      <Modal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        title="Buscar Desafio"
        size="full"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <label htmlFor="modal-search-input" className="sr-only">Nome do evento</label>
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" strokeWidth={3} aria-hidden="true" />
            <input
              id="modal-search-input"
              type="search"
              placeholder="Nome do evento..."
              value={modalSearchQuery}
              onChange={(e) => setModalSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearchQuery(modalSearchQuery);
                  setIsSearchModalOpen(false);
                }
              }}
              className="w-full pl-16 pr-20 py-6 bg-slate-50 border border-slate-100 rounded-[32px] text-lg font-black focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
            />
            <button
              onClick={() => {
                setSearchQuery(modalSearchQuery);
                setIsSearchModalOpen(false);
              }}
              aria-label="Confirmar busca"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 active:scale-95"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Filters & Latest Events */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Últimos Eventos Cadastrados</h3>
              <div className="flex gap-3">
                <label htmlFor="year-select" className="sr-only">Ano</label>
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                >
                  {['2024', '2025', '2026'].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <label htmlFor="month-select" className="sr-only">Mês</label>
                <select
                  id="month-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                >
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="relative overflow-hidden py-4">
              <div className="flex whitespace-nowrap">
                <div
                  className="flex gap-6 px-4 hover:[animation-play-state:paused]"
                  style={{ animation: 'slide-modal-events 40s linear infinite' }}
                >
                  {[...FEATURED_EVENTS, ...FEATURED_EVENTS].map((event, idx) => (
                    <div key={`${event.id}-${idx}`} className="inline-block w-[260px] whitespace-normal scale-90 origin-top" aria-hidden={idx >= FEATURED_EVENTS.length ? 'true' : undefined}>
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes slide-modal-events {
            0% { transform: translateX(0); }
            100% { transform: translateX(-1600px); }
          }
        `}} />
      </Modal>

      <Modal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        title="Onde você quer competir?"
      >
        <div className="space-y-8">
          <div className="text-center">
            <div aria-hidden="true" className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <p className="text-slate-600 font-medium leading-relaxed">
              Ative sua localização para encontrarmos os desafios mais próximos de você agora mesmo.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                navigator.geolocation.getCurrentPosition(() => {
                  setSelectedLocation('Sua Localização');
                  setIsLocationModalOpen(false);
                });
              }}
              className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95"
            >
              <Navigation className="w-5 h-5" aria-hidden="true" />
              Usar Localização Atual
            </button>

            <div role="separator" className="relative flex items-center">
              <div className="flex-grow border-t border-slate-100" />
              <span className="flex-shrink mx-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ou</span>
              <div className="flex-grow border-t border-slate-100" />
            </div>

            <div className="relative">
              <label htmlFor="location-input" className="sr-only">Cidade ou estado</label>
              <div aria-hidden="true" className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input
                id="location-input"
                ref={locationInputRef}
                type="text"
                placeholder="Digite sua cidade ou estado..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmLocation();
                }}
                className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
              />
            </div>

            <button
              onClick={confirmLocation}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 active:scale-95"
            >
              Confirmar Localização
            </button>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="flex gap-3">
              <div aria-hidden="true" className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-white text-[12px]">lock</span>
              </div>
              <p className="text-[11px] text-emerald-800 font-medium leading-relaxed">
                Sua privacidade é prioridade. Usamos sua localização apenas para filtrar eventos próximos e nunca compartilhamos esses dados.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        title="Quando você quer ir?"
        size="full"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Quick Options */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Opções Rápidas</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-2 lg:gap-3 lg:overflow-visible">
              {['Hoje', 'Amanhã', 'Este Fim de Semana', 'Próxima Semana', 'Este Mês', 'Próximo Mês'].map((date) => (
                <button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setIsDateModalOpen(false);
                  }}
                  className="whitespace-nowrap lg:whitespace-normal px-6 py-4 bg-white border border-slate-100 rounded-2xl hover:border-primary hover:shadow-lg transition-all text-[11px] font-black text-slate-700 uppercase tracking-widest text-center"
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            {/* Stylized Calendar */}
            <div className="w-full max-w-sm bg-white border border-slate-100 rounded-[40px] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Março 2026</h3>
                <div className="flex gap-2">
                  <button aria-label="Mês anterior" className="p-1 rounded-full hover:bg-slate-50 text-slate-400">
                    <ChevronRight className="w-4 h-4 rotate-180" aria-hidden="true" />
                  </button>
                  <button aria-label="Próximo mês" className="p-1 rounded-full hover:bg-slate-50 text-slate-400">
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-4" role="row">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                  <div key={d} className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest" aria-hidden="true">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Calendário de Março 2026">
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1;
                  const isToday = day === 2;
                  const isSelected = day === 15;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedDate(`${day} de Março`);
                        setIsDateModalOpen(false);
                      }}
                      aria-label={`${day} de Março de 2026${isToday ? ' (hoje)' : ''}${isSelected ? ' (selecionado)' : ''}`}
                      aria-pressed={isSelected}
                      className={`aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all
                        ${isToday ? 'bg-primary/10 text-primary border border-primary/20' : ''}
                        ${isSelected ? 'bg-primary text-white shadow-lg shadow-red-500/40' : 'hover:bg-slate-50 text-slate-600'}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
                  <p className="text-[10px] font-black text-slate-900">15 de Março, 2026</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedDate('15 de Março');
                    setIsDateModalOpen(false);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isModalityModalOpen}
        onClose={() => setIsModalityModalOpen(false)}
        title="Modalidades"
        size="full"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedModality(cat.name);
                setIsModalityModalOpen(false);
              }}
              className="flex flex-col items-center gap-4 p-8 bg-white border border-slate-100 rounded-[32px] hover:border-primary hover:shadow-2xl transition-all group"
            >
              <span className="text-5xl group-hover:scale-110 transition-transform" aria-hidden="true">{cat.icon}</span>
              <span className="text-xs font-black text-slate-700 uppercase tracking-widest group-hover:text-primary">{cat.name}</span>
            </button>
          ))}
        </div>
      </Modal>

      <Toast
        isOpen={showNewsletterToast}
        onClose={() => setShowNewsletterToast(false)}
        message="Inscrição na newsletter realizada com sucesso! Fique atento ao seu e-mail."
      />
    </div>
  );
}
