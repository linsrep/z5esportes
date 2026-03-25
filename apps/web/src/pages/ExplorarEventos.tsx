import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FEATURED_EVENTS } from '../lib/utils';
import EventCard from '../components/EventCard';
import Toast from '../components/Toast';
import { Search, MapPin, Calendar, DollarSign, SlidersHorizontal, Map, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ExplorarEventos() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('Distância (km)');
  const [dateFilter, setDateFilter] = useState('Data do Evento');
  const [priceFilter, setPriceFilter] = useState('Faixa de Preço');
  const [showFilters, setShowFilters] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [registeredEvent, setRegisteredEvent] = useState('');

  useEffect(() => {
    if (categoryParam) {
      // Map slug back to search query or a specific category filter if we had one
      // For now, let's just use it to filter by tag in the logic below
    }
  }, [categoryParam]);

  const handleRegister = (event: any) => {
    navigate(`/evento/${event.id}`);
  };

  const filteredEvents = FEATURED_EVENTS.filter(event => {
    // Category filter from URL
    if (categoryParam) {
      const categoryMap: Record<string, string> = {
        'corrida': 'Corrida',
        'futebol': 'Futebol',
        'crossfit': 'CrossFit',
        'ciclismo': 'Ciclismo',
        'natacao': 'Natação',
        'tennis': 'Beach Tennis',
        'basquete': 'Basquete',
        'volei': 'Vôlei',
        'triatlo': 'Triatlo',
        'trail': 'Trail Run'
      };
      const targetTag = categoryMap[categoryParam];
      if (targetTag && !event.tag.includes(targetTag)) return false;
    }

    // Basic search by title or location
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Location filter
    const matchesLocation = !locationFilter || event.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    // Price filter logic (simplified for demo)
    let matchesPrice = true;
    if (priceFilter === 'Grátis') matchesPrice = event.price.toLowerCase().includes('grátis');
    else if (priceFilter === 'Até R$ 50') {
      const price = parseInt(event.price.replace(/\D/g, '')) || 0;
      matchesPrice = price <= 50;
    } else if (priceFilter === 'Até R$ 100') {
      const price = parseInt(event.price.replace(/\D/g, '')) || 0;
      matchesPrice = price <= 100;
    } else if (priceFilter === 'Acima de R$ 100') {
      const price = parseInt(event.price.replace(/\D/g, '')) || 0;
      matchesPrice = price > 100;
    }

    return matchesSearch && matchesLocation && matchesPrice;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setDistanceFilter('Distância (km)');
    setDateFilter('Data do Evento');
    setPriceFilter('Faixa de Preço');
  };

  const hasActiveFilters = searchQuery || locationFilter || distanceFilter !== 'Distância (km)' || dateFilter !== 'Data do Evento' || priceFilter !== 'Faixa de Preço';

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 lg:px-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Explorar Eventos</h1>
          <p className="text-slate-500 mt-2 font-medium">Encontre os melhores desafios perto de você.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl text-sm font-bold text-slate-700 hover:bg-white/60 transition-all">
            <Map className="w-4 h-4" />
            Ver no Mapa
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filters Toggle */}
        <div className="lg:hidden">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-6 py-4 bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl text-sm font-black uppercase tracking-widest text-slate-900 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              Filtros {hasActiveFilters && <span className="w-2 h-2 bg-primary rounded-full"></span>}
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Left Column: Filters (Ecommerce Style) */}
        <aside className={`lg:w-64 shrink-0 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white/40 backdrop-blur-md rounded-[32px] border border-white/20 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Filtros</h3>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest"
                >
                  Limpar
                </button>
              )}
            </div>
            
            <div className="space-y-6">
              {/* Search */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Busca</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Nome do evento..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Localização</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    placeholder="Cidade ou estado..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* Distance */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Distância</label>
                <select 
                  value={distanceFilter}
                  onChange={(e) => setDistanceFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                >
                  <option>Distância (km)</option>
                  <option>Até 5km</option>
                  <option>Até 10km</option>
                  <option>Até 25km</option>
                  <option>Até 50km</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Data</label>
                <select 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                >
                  <option>Data do Evento</option>
                  <option>Este Fim de Semana</option>
                  <option>Este Mês</option>
                  <option>Próximo Mês</option>
                  <option>Este Ano</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Preço</label>
                <div className="space-y-2">
                  {['Faixa de Preço', 'Grátis', 'Até R$ 50', 'Até R$ 100', 'Acima de R$ 100'].map((price) => (
                    <button 
                      key={price}
                      onClick={() => setPriceFilter(price)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${priceFilter === price ? 'bg-primary text-white' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Middle Column: Events Grid */}
        <main className="flex-1">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onRegister={handleRegister}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white/20 backdrop-blur-md rounded-[32px] border border-white/10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhum evento encontrado</h3>
              <p className="text-slate-500 max-w-xs mx-auto mb-8">Tente ajustar seus filtros para encontrar o que procura.</p>
              <button 
                onClick={clearFilters}
                className="px-8 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </main>

        {/* Right Column: Map View */}
        <aside className="hidden xl:block w-[400px] shrink-0">
          <div className="sticky top-24 h-[calc(100vh-120px)] bg-slate-200 rounded-[40px] overflow-hidden border border-white/20 shadow-xl relative group">
            {/* Placeholder for Map */}
            <img 
              src="https://picsum.photos/seed/map/800/1200" 
              className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" 
              alt="Map View"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-transparent pointer-events-none"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white/40 text-center max-w-[280px]">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-tight">Visualização em Mapa</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Veja todos os {filteredEvents.length} eventos disponíveis na sua região diretamente no mapa.
                </p>
                <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                  Explorar no Mapa
                </button>
              </div>
            </div>

            {/* Floating Event Markers (Visual only) */}
            {filteredEvents.slice(0, 5).map((event, i) => (
              <div 
                key={event.id}
                className="absolute w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce"
                style={{ 
                  top: `${20 + i * 15}%`, 
                  left: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              >
                <span className="material-symbols-outlined text-sm">location_on</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <Toast 
        isOpen={showToast} 
        onClose={() => setShowToast(false)} 
        message={`Inscrição realizada com sucesso em: ${registeredEvent}`} 
      />
    </div>
  );
}
