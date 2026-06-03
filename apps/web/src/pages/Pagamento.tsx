import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { getAuthUser } from '../lib/auth';
import { getJsonCookie, SelectedEvent } from '../lib/cookies';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

export default function Pagamento() {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
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

    // Call backend to create checkout session
    const createCheckoutSession = async () => {
      try {
        const response = await fetch('/api/payment/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: savedEvent.id,
            eventTitle: savedEvent.title,
            eventPrice: savedEvent.price,
            userEmail: user.email,
            userName: user.name,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const { clientSecret: secret } = await response.json();
        setClientSecret(secret);
      } catch (error) {
        console.error('Error creating checkout session:', error);
        // Fallback: show demo mode
        setClientSecret('test_mode_stripe_not_configured');
      }
    };

    createCheckoutSession();
  }, [user, navigate]);

  if (!user || !selectedEvent) {
    return null;
  }

  if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-[28px] p-8 mb-8">
            <h1 className="text-2xl font-black text-amber-900 mb-4">Modo Demonstração</h1>
            <p className="text-sm text-amber-800 mb-6">
              A chave pública do Stripe não está configurada. Para ativar pagamentos reais:
            </p>
            <div className="bg-white rounded-xl p-4 text-left mb-6 font-mono text-xs">
              <p className="text-slate-600">VITE_STRIPE_PUBLIC_KEY=pk_test_...</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-xl p-5 border-2 border-emerald-200">
                <p className="font-bold text-slate-900 mb-2">Evento: {selectedEvent.title}</p>
                <p className="text-sm text-slate-600 mb-2">Valor: {selectedEvent.price}</p>
                <p className="text-sm text-slate-600">Atleta: {user.name}</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/painel')}
              className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg"
            >
              Ir para o Painel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] px-4 sm:px-6 py-10 sm:py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Finalizar Pagamento</h1>
          <p className="text-sm sm:text-base text-slate-600">Complete seu pagamento para confirmar a inscrição</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-lg">
              {clientSecret && clientSecret !== 'test_mode_stripe_not_configured' ? (
                <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600 mb-4">Sistema de pagamento em modo demonstração</p>
                  <button
                    onClick={() => navigate('/painel')}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-black hover:bg-red-700 transition-all"
                  >
                    Continuar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Event Summary */}
          <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-6 sm:p-8 h-fit">
            <h3 className="text-lg font-black text-emerald-900 mb-4">Resumo da Inscrição</h3>
            
            <div className="space-y-4 mb-6 pb-6 border-b border-emerald-200">
              <div>
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">Evento</p>
                <p className="font-bold text-emerald-900">{selectedEvent.title}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">Atleta</p>
                <p className="font-bold text-emerald-900">{user.name}</p>
                <p className="text-sm text-emerald-700">{user.email}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">Data</p>
                <p className="font-bold text-emerald-900">{selectedEvent.date}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">Local</p>
                <p className="font-bold text-emerald-900 text-sm">{selectedEvent.location}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-2">Valor Total</p>
              <p className="text-3xl font-black text-emerald-900">{selectedEvent.price}</p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
          🔒 Pagamento seguro com Stripe
        </div>
      </div>
    </div>
  );
}
