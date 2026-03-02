import React from 'react';
import { Event } from '../lib/utils';
import { Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: Event;
  onRegister?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
  const navigate = useNavigate();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white/40 backdrop-blur-md shadow-sm transition-all hover:shadow-xl border border-white/20">
      <Link to={`/evento/${event.id}`} className="aspect-[16/9] overflow-hidden relative block">
        <img 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
          src={event.image} 
          alt={event.title}
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[9px] font-black text-slate-900 shadow-sm uppercase tracking-wider">
            {event.tag}
          </div>
          <div className="rounded-full bg-emerald-500/90 backdrop-blur-md px-3 py-1 text-[9px] font-black text-white shadow-sm uppercase tracking-wider">
            Inscrições Abertas
          </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
          <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">A partir de</p>
          <p className="text-sm font-black text-primary leading-none">{event.price}</p>
        </div>
      </Link>
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
          <Calendar className="w-3 h-3" /> {event.date}
        </div>
        <Link to={`/evento/${event.id}`}>
          <h3 className="mb-3 text-lg font-black text-slate-900 group-hover:text-primary transition-colors leading-tight tracking-tight">{event.title}</h3>
        </Link>
        <p className="text-[12px] text-slate-500 mb-6 line-clamp-2 leading-relaxed font-medium">{event.location}</p>
        
        <div className="flex flex-col gap-4 border-t border-white/20 pt-5">
          <div className="flex justify-between items-center">
            <span className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">Lote Atual</span>
            <span className="text-[0.7rem] font-bold text-slate-900">1º Lote Disponível</span>
          </div>
          <button 
            onClick={() => {
              if (onRegister) {
                onRegister(event);
              } else {
                navigate(`/evento/${event.id}`);
              }
            }}
            className="w-full rounded-xl bg-primary text-white py-4 text-[0.75rem] font-black uppercase tracking-widest transition-all hover:bg-red-700 active:scale-95 shadow-lg shadow-red-500/20"
          >
            {event.type === 'team' ? 'Inscrever Time' : 'Garantir Vaga'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
