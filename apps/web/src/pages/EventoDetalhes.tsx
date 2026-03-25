import { useParams, Link } from 'react-router-dom';
import { FEATURED_EVENTS } from '../lib/utils';
import { Calendar, MapPin, Clock, Share2, Heart, ChevronRight, Info, Award, FileText, Users, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import Toast from '../components/Toast';

export default function EventoDetalhes() {
  const { id } = useParams();
  const event = FEATURED_EVENTS.find(e => e.id === id) || FEATURED_EVENTS[0];
  const [activeTab, setActiveTab] = useState('info');
  const [showToast, setShowToast] = useState(false);

  const handleRegister = () => {
    setShowToast(true);
  };

  const tabs = [
    { id: 'info', label: 'Informações', icon: Info },
    { id: 'categories', label: 'Categorias', icon: Award },
    { id: 'rules', label: 'Regulamento', icon: FileText },
    { id: 'organizer', label: 'Organizador', icon: Users },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-red-500/40">
                {event.tag}
              </span>
              <span className="px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-emerald-500/40">
                Inscrições Abertas
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight max-w-4xl">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/80 font-bold text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {event.date}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {event.location.split('.')[0]}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Largada: 07:00h
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 border-b border-slate-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-slate-900 text-white shadow-xl' 
                      : 'bg-white/40 text-slate-500 hover:bg-white/60'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white/40 backdrop-blur-md rounded-[40px] border border-white/20 p-8 md:p-12 shadow-sm">
              {activeTab === 'info' && (
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-2xl font-black text-slate-900 mb-6">Sobre o Evento</h2>
                  <p className="text-slate-600 leading-relaxed font-medium mb-6">
                    Prepare-se para um dos eventos mais desafiadores da temporada. O {event.title} reúne atletas de elite e entusiastas em um percurso técnico e emocionante.
                  </p>
                  <h3 className="text-xl font-black text-slate-900 mb-4">O que está incluso:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {[
                      'Kit Atleta (Camiseta, Sacochila, Viseira)',
                      'Medalha de Participação (Finisher)',
                      'Hidratação no Percurso',
                      'Seguro Atleta',
                      'Cronometragem Eletrônica',
                      'Frutas e Isotônico na Chegada'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-xl font-black text-slate-900 mb-4">Programação:</h3>
                  <div className="space-y-4">
                    {[
                      { time: '06:00', event: 'Abertura da Arena' },
                      { time: '06:30', event: 'Aquecimento Coletivo' },
                      { time: '07:00', event: 'Largada Oficial' },
                      { time: '10:00', event: 'Premiação' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 p-4 bg-white/50 rounded-2xl border border-white/20">
                        <span className="text-primary font-black text-lg">{item.time}</span>
                        <span className="text-slate-700 font-bold">{item.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'categories' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-6">Categorias Disponíveis</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'Elite Masculino', dist: '21km', age: '18+ anos', price: 'R$ 120,00' },
                      { name: 'Elite Feminino', dist: '21km', age: '18+ anos', price: 'R$ 120,00' },
                      { name: 'Amador Masculino', dist: '10km', age: '16+ anos', price: 'R$ 80,00' },
                      { name: 'Amador Feminino', dist: '10km', age: '16+ anos', price: 'R$ 80,00' },
                      { name: 'Caminhada', dist: '5km', age: 'Livre', price: 'R$ 60,00' },
                    ].map((cat, i) => (
                      <div key={i} className="relative p-8 bg-white/50 rounded-[32px] border border-white/20 hover:border-primary hover:shadow-2xl transition-all group cursor-pointer overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
                        
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors">{cat.name}</h4>
                            <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                              Selecionar
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 mb-6 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {cat.dist}</span>
                            <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> {cat.age}</span>
                          </div>

                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-slate-900 group-hover:scale-110 origin-left transition-transform duration-300">{cat.price}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">por vaga</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-slate-900 mb-6">Regulamento</h2>
                  <div className="p-8 bg-slate-900/5 rounded-3xl border border-slate-900/10">
                    <p className="text-slate-600 font-medium leading-relaxed mb-6">
                      Ao se inscrever, o atleta declara estar em perfeitas condições de saúde e aceita todos os termos do regulamento oficial.
                    </p>
                    <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                      <FileText className="w-5 h-5" />
                      Baixar Regulamento PDF
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'organizer' && (
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden border-4 border-white shadow-xl">
                    <img src="/logo-v.png" alt="Z5 Sports Management" className="w-full h-full object-contain p-2" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Z5 Sports Management</h3>
                  <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">
                    Especialistas em criar experiências esportivas memoráveis e de alto nível técnico.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
                      Ver Perfil
                    </button>
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
                      Seguir
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white/60 backdrop-blur-xl rounded-[40px] border border-white/30 p-8 shadow-2xl shadow-slate-900/5">
                <div className="mb-8">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Inscrições a partir de</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">{event.price}</span>
                    <span className="text-slate-500 font-bold text-sm">/ atleta</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Lote Atual</span>
                    <span className="text-xs font-bold text-emerald-900">1º Lote Disponível</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Encerramento</span>
                    <span className="text-xs font-bold text-slate-900">12 Out 2024</span>
                  </div>
                </div>

                <button 
                  onClick={handleRegister}
                  className="w-full bg-primary text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-all shadow-xl shadow-red-500/30 active:scale-95 mb-4"
                >
                  Inscrever-se Agora
                </button>
                
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all">
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </button>
                  <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-primary hover:border-primary transition-all">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white/40 backdrop-blur-md rounded-[40px] border border-white/20 p-8 shadow-sm">
                <h4 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">Localização</h4>
                <div className="aspect-video bg-slate-200 rounded-3xl mb-4 overflow-hidden relative">
                  <img 
                    src="https://picsum.photos/seed/map/400/225" 
                    alt="Mapa" 
                    className="w-full h-full object-cover grayscale opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
                      <MapPin className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 font-bold leading-relaxed">
                  {event.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast 
        isOpen={showToast} 
        onClose={() => setShowToast(false)} 
        message="Iniciando processo de inscrição..." 
      />
    </div>
  );
}
