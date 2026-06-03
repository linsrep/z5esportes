import { useState } from 'react';
import { Plus, Edit, Trash2, Package, Users, Eye, X } from 'lucide-react';
import { getAuthUser } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import CreateEvent from './CreateEvent';
import ManageUsers from './ManageUsers';
import EventCompetitors from './EventCompetitors';
import RegisterUser from './RegisterUser';
import UserProfile from './UserProfile';

interface EventExtra {
  id?: string;
  name: string;
  description?: string;
  price: string;
}

import React from 'react';

interface AdminEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  image?: string;
  participants: number;
  extras: EventExtra[];
  status: 'active' | 'draft' | 'finished';
}

const MOCK_EVENTS: AdminEvent[] = [
  {
    id: '1',
    title: 'Z5 Trail 2024 - São Paulo',
    date: '15 de Março, 2024',
    location: 'Parque da Cantareira, São Paulo - SP',
    price: 'R$ 150,00',
    participants: 342,
    status: 'active',
    extras: [
      { name: 'Camiseta Extra', price: 'R$ 35,00' },
      { name: 'Caneca Personalizada', price: 'R$ 25,00' },
    ],
  },
  {
    id: '2',
    title: 'Z5 Trail 2024 - Rio de Janeiro',
    date: '20 de Março, 2024',
    location: 'Parque Estadual da Pedra Branca, Rio - RJ',
    price: 'R$ 140,00',
    participants: 128,
    status: 'draft',
    extras: [],
  },
];

export default function AdminDashboard() {
  const [events, setEvents] = useState<AdminEvent[]>(MOCK_EVENTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AdminEvent | null>(null);
  const [showExtrasModal, setShowExtrasModal] = useState(false);
  const [currentTab, setCurrentTab] = useState<'overview' | 'create' | 'users' | 'register' | 'competitors' | 'profile'>('overview');
  const [competitorEventId, setCompetitorEventId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'error'>('success');
  const user = getAuthUser();
  const navigate = useNavigate();

  if (!user || (user.role !== 'admin' && user.role !== 'organizer')) {
    navigate('/');
    return null;
  }

  const handleDeleteEvent = (id: string) => {
    setEvents((current) => current.filter((e) => e.id !== id));
    setToastMessage('Evento deletado com sucesso');
    setToastVariant('success');
    setShowToast(true);
  };

  const handleCreateEvent = () => {
    const newEvent: AdminEvent = {
      id: `${Date.now()}`,
      title: 'Novo Evento',
      date: new Date().toLocaleDateString('pt-BR'),
      location: 'Local a definir',
      price: 'R$ 0,00',
      participants: 0,
      status: 'draft',
      extras: [],
    };
    setEvents((current) => [...current, newEvent]);
    setToastMessage('Evento criado! Clique para editar os detalhes.');
    setToastVariant('success');
    setShowToast(true);
    // ensure admin views overview after creating
    setCurrentTab('overview');
  };

  const handleAddExtra = (eventId: string) => {
    setSelectedEvent(events.find((e) => e.id === eventId) || null);
    setShowExtrasModal(true);
  };

  const handleViewCompetitors = (eventId: string) => {
    setCompetitorEventId(eventId);
    setCurrentTab('competitors');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'emerald';
      case 'draft':
        return 'amber';
      case 'finished':
        return 'slate';
      default:
        return 'slate';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'draft':
        return 'Rascunho';
      case 'finished':
        return 'Finalizado';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-[85vh] px-4 sm:px-6 py-10 sm:py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Dashboard de Eventos</h1>
          <p className="text-sm sm:text-base text-slate-600">Gerencie seus eventos, adicionais e inscrições</p>
        </div>

        {/* Admin Tabs */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setCurrentTab('overview')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm ${currentTab === 'overview' ? 'bg-primary text-white border border-primary' : 'bg-slate-50 text-slate-700 border border-slate-100'}`}
          >Visão Geral</button>
          <button
            onClick={() => setCurrentTab('create')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm ${currentTab === 'create' ? 'bg-primary text-white border border-primary' : 'bg-slate-50 text-slate-700 border border-slate-100'}`}
          >Criar Evento</button>
          <button
            onClick={() => setCurrentTab('users')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm ${currentTab === 'users' ? 'bg-primary text-white border border-primary' : 'bg-slate-50 text-slate-700 border border-slate-100'}`}
          >Gerir Usuários</button>
          <button
            onClick={() => setCurrentTab('register')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm ${currentTab === 'register' ? 'bg-primary text-white border border-primary' : 'bg-slate-50 text-slate-700 border border-slate-100'}`}
          >Cadastrar Usuário</button>
          <button
            onClick={() => setCurrentTab('profile')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm ${currentTab === 'profile' ? 'bg-primary text-white border border-primary' : 'bg-slate-50 text-slate-700 border border-slate-100'}`}
          >Perfil</button>
        </div>

        {/* Main Content (tabs) */}
        <div>
          {currentTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {events.map((event: any) => (
                <div key={event.id} className="bg-white rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-lg hover:shadow-xl transition-all border border-slate-100">
              {/* Event Header */}
              <div className="p-6 sm:p-8 border-b border-slate-100">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">{event.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 text-xs font-black uppercase tracking-widest rounded-full bg-${getStatusColor(event.status)}-100 text-${getStatusColor(event.status)}-700`}>
                        {getStatusLabel(event.status)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2 hover:bg-red-50 rounded-xl text-red-600 transition-colors"
                    title="Deletar evento"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-bold">Data:</span> {event.date}
                  </p>
                  <p>
                    <span className="font-bold">Local:</span> {event.location}
                  </p>
                  <p>
                    <span className="font-bold">Preço:</span> {event.price}
                  </p>
                </div>
              </div>

              {/* Event Stats */}
              <div className="px-6 sm:px-8 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-6 sm:gap-12">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Inscritos</p>
                    <p className="text-xl font-black text-slate-900">{event.participants}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Adicionais</p>
                    <p className="text-xl font-black text-slate-900">{event.extras.length}</p>
                  </div>
                </div>
              </div>

              {/* Extras List */}
              {event.extras.length > 0 && (
                <div className="px-6 sm:px-8 py-4 border-b border-slate-100">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Adicionais disponíveis:</p>
                  <div className="space-y-2">
                    {event.extras.map((extra: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-slate-700 font-bold">{extra.name}</span>
                        <span className="text-slate-600">{extra.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
                      <div className="px-6 sm:px-8 py-4 bg-slate-50 flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all">
                          <Edit className="w-4 h-4" />
                          Editar
                        </button>
                        <button
                          onClick={() => handleAddExtra(event.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all"
                        >
                          <Package className="w-4 h-4" />
                          Adicionais
                        </button>
                        <button onClick={() => handleViewCompetitors(event.id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-300 transition-all">
                          <Eye className="w-4 h-4" />
                          Competidores
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          )}

          {currentTab === 'create' && (
            <div className="mt-6">
              <CreateEvent />
            </div>
          )}

          {currentTab === 'users' && (
            <div className="mt-6">
              <ManageUsers />
            </div>
          )}

          {currentTab === 'register' && (
            <div className="mt-6">
              <RegisterUser />
            </div>
          )}

          {currentTab === 'competitors' && competitorEventId && (
            <div className="mt-6">
              <EventCompetitors eventId={competitorEventId} />
            </div>
          )}

          {currentTab === 'profile' && (
            <div className="mt-6">
              <UserProfile />
            </div>
          )}

          {currentTab === 'overview' && events.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-slate-600 mb-6">Nenhum evento criado ainda.</p>
              <button
                onClick={handleCreateEvent}
                className="px-8 py-4 bg-primary text-white rounded-2xl font-black hover:bg-red-700 transition-all"
              >
                Criar Primeiro Evento
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Extras Modal */}
      {showExtrasModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[32px] max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">Gerenciar Adicionais</h2>
              <button
                onClick={() => setShowExtrasModal(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-black text-slate-900 mb-4">{selectedEvent.title}</h3>

              {selectedEvent.extras.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {selectedEvent.extras.map((extra, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <p className="font-bold text-slate-900">{extra.name}</p>
                        {extra.description && <p className="text-sm text-slate-600">{extra.description}</p>}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-black text-slate-900">{extra.price}</span>
                        <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-2xl text-center text-slate-600 mb-6">Nenhum adicional criado ainda</div>
              )}

              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all">
                <Plus className="w-4 h-4" />
                Adicionar Novo Adicional
              </button>
            </div>

            <button
              onClick={() => setShowExtrasModal(false)}
              className="w-full px-6 py-3 bg-primary text-white rounded-xl font-black hover:bg-red-700 transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <Toast isOpen={showToast} onClose={() => setShowToast(false)} message={toastMessage} variant={toastVariant} />
    </div>
  );
}
