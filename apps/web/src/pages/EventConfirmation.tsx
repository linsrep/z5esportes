import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJsonCookie, SelectedEvent, setJsonCookie } from '../lib/cookies';
import { getAuthUser } from '../lib/auth';
import Toast from '../components/Toast';
import { CheckCircle2 } from 'lucide-react';

type ExtraSelection = {
  selected: boolean;
  size?: string;
};

const SHIRT_SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XG'];

export default function EventConfirmation() {
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
  const [extras, setExtras] = useState<Record<string, ExtraSelection>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const user = getAuthUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const savedEvent = getJsonCookie<SelectedEvent>('z5_selected_event');
    if (!savedEvent) {
      navigate('/explorar');
      return;
    }

    setSelectedEvent(savedEvent);
    const initialExtras: Record<string, ExtraSelection> = {};
    savedEvent.extra_items?.forEach((item) => {
      const key = item.id ?? item.name;
      initialExtras[key] = {
        selected: false,
        size: 'M',
      };
    });
    setExtras(initialExtras);
  }, [user, navigate]);

  if (!selectedEvent || !user) {
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

  const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    const isFree = selectedEvent.price === 'Grátis' || selectedEvent.price === 'Gratis' || !selectedEvent.price;
    
    if (isFree) {
      setToastMessage('Inscrição finalizada com sucesso!');
    } else {
      setToastMessage('Redirecionando para pagamento...');
    }
    
    setShowToast(true);
    setTimeout(() => {
      if (isFree) {
        navigate('/painel');
      } else {
        navigate('/pagamento');
      }
    }, 600);
  };

  const totalPrice = selectedEvent.price;
  const selectedCount = Object.values(extras).filter((e) => (e as ExtraSelection).selected).length;

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 sm:px-6 sm:py-20">
      <div className="max-w-3xl w-full bg-white p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">Confirme sua inscrição</h1>
          <p className="text-xs text-slate-500">Revise os detalhes e escolha os adicionais desejados.</p>
        </div>

        {/* User Info */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Inscrição para</p>
          <p className="font-bold text-slate-900">{user.name}</p>
          <p className="text-sm text-slate-600">{user.email}</p>
        </div>

        {/* Event Info */}
        <div className="mb-8 rounded-3xl border border-primary/20 bg-primary/5 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Evento</p>
              <p className="text-xl font-black text-slate-900">{selectedEvent.title}</p>
              <p className="text-sm text-slate-600 mt-2">{selectedEvent.date}</p>
              <p className="text-sm text-slate-600">{selectedEvent.location}</p>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Preço da inscrição</p>
                <p className="text-3xl font-black text-primary">{totalPrice}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Extras Selection */}
        {selectedEvent.extra_items && selectedEvent.extra_items.length > 0 && (
          <form onSubmit={handleConfirm} className="space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-900 mb-4">Adicionais disponíveis</h2>
              <div className="space-y-4">
                {selectedEvent.extra_items.map((item) => {
                  const key = item.id ?? item.name;
                  const isShirt = /camiseta/i.test(item.name);
                  const isCaneca = /caneca/i.test(item.name);
                  const extra = extras[key];

                  return (
                    <div key={key} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
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

                      {(isShirt || isCaneca) && extra?.selected && (
                        <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
                          <label htmlFor={`size-${key}`} className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2 block">
                            Tamanho
                          </label>
                          <select
                            id={`size-${key}`}
                            value={extra.size ?? 'M'}
                            onChange={(e) => handleSizeChange(key, e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium focus:border-primary focus:ring-primary"
                          >
                            {SHIRT_SIZES.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-[0.2em] mb-3">Resumo da inscrição</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-emerald-900">Inscrição no evento:</span>
                  <span className="font-bold text-emerald-900">{totalPrice}</span>
                </div>
                {selectedCount > 0 && (
                  <div className="flex justify-between text-sm text-emerald-700">
                    <span>{selectedCount} adicional(is) selecionado(s)</span>
                  </div>
                )}
                <div className="pt-2 mt-2 border-t border-emerald-200 flex justify-between">
                  <span className="font-black text-emerald-900">Total:</span>
                  <span className="font-black text-emerald-900">{totalPrice}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-4 sm:py-5 rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-xl shadow-red-500/20"
            >
              {selectedEvent.price === 'Grátis' || selectedEvent.price === 'Gratis' ? 'Finalizar inscrição' : 'Ir para pagamento'}
            </button>
          </form>
        )}

        {/* No extras case */}
        {(!selectedEvent.extra_items || selectedEvent.extra_items.length === 0) && (
          <form onSubmit={handleConfirm} className="space-y-6">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <p className="text-sm font-bold text-emerald-900">Nenhum adicional disponível para este evento.</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-4 sm:py-5 rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-xl shadow-red-500/20"
            >
              {selectedEvent.price === 'Grátis' || selectedEvent.price === 'Gratis' ? 'Finalizar inscrição' : 'Ir para pagamento'}
            </button>
          </form>
        )}
      </div>

      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        variant="success"
      />
    </div>
  );
}
