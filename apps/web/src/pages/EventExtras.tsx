import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJsonCookie, SelectedEvent, setJsonCookie } from '../lib/cookies';
import Toast from '../components/Toast';

type ExtraSelection = {
  selected: boolean;
  size: string;
};

const SHIRT_SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XG'];

export default function EventExtras() {
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
  const [extras, setExtras] = useState<Record<string, ExtraSelection>>({});
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEvent = getJsonCookie<SelectedEvent>('z5_selected_event');
    if (!savedEvent || !savedEvent.extra_items || savedEvent.extra_items.length === 0) {
      navigate('/painel');
      return;
    }

    setSelectedEvent(savedEvent);
    const initialExtras: Record<string, ExtraSelection> = {};
    savedEvent.extra_items.forEach((item) => {
      const key = item.id ?? item.name;
      initialExtras[key] = {
        selected: false,
        size: 'M',
      };
    });
    setExtras(initialExtras);
  }, [navigate]);

  if (!selectedEvent) {
    return null;
  }

  const handleCheckboxChange = (key: string) => {
    setExtras((current) => ({
      ...current,
      [key]: {
        ...current[key],
        selected: !current[key].selected,
      },
    }));
  };

  const handleSizeChange = (key: string, value: string) => {
    setExtras((current) => ({
      ...current,
      [key]: {
        ...current[key],
        size: value,
      },
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedExtras = selectedEvent.extra_items
      ?.map((item) => {
        const key = item.id ?? item.name;
        const choice = extras[key];
        return {
          ...item,
          selected: choice?.selected ?? false,
          size: choice?.size,
        };
      })
      .filter((item) => item.selected) || [];

    setJsonCookie('z5_selected_event_extras', selectedExtras, 7);
    setShowToast(true);
    setTimeout(() => {
      navigate('/painel');
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 sm:px-6 sm:py-20">
      <div className="max-w-3xl w-full bg-white p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">Escolha os adicionais</h1>
          <p className="text-xs text-slate-500">Complete sua inscrição selecionando os itens opcionais do evento.</p>
        </div>

        <div className="mb-8 rounded-3xl border border-primary/20 bg-primary/5 p-4 text-sm text-slate-900">
          <p className="font-bold text-slate-900">Evento selecionado</p>
          <p className="mt-1 font-semibold">{selectedEvent.title}</p>
          <p className="text-slate-500 text-xs">{selectedEvent.date} • {selectedEvent.price}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {selectedEvent.extra_items?.map((item) => {
            const key = item.id ?? item.name;
            const isShirt = /camiseta/i.test(item.name);
            const extra = extras[key];

            return (
              <div key={key} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-black text-slate-900">{item.name}</p>
                    {item.description && <p className="mt-2 text-sm text-slate-600">{item.description}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900">{item.price}</p>
                    <label className="inline-flex items-center gap-2 mt-3 text-slate-700 font-semibold">
                      <input
                        type="checkbox"
                        checked={extra?.selected ?? false}
                        onChange={() => handleCheckboxChange(key)}
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      Adicionar
                    </label>
                  </div>
                </div>

                {isShirt && extra?.selected && (
                  <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
                    <label htmlFor={`size-${key}`} className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2 block">Tamanho da camiseta</label>
                    <select
                      id={`size-${key}`}
                      value={extra.size}
                      onChange={(e) => handleSizeChange(key, e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium focus:border-primary focus:ring-primary"
                    >
                      {SHIRT_SIZES.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="submit"
            className="w-full bg-primary text-white py-3.5 sm:py-4 rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-xl shadow-red-500/20"
          >
            Finalizar inscrição
          </button>
        </form>
      </div>

      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        message="Adicionais registrados. Redirecionando para o painel..."
        variant="success"
      />
    </div>
  );
}
