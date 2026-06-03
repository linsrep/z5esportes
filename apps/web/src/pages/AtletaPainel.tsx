import { Link } from 'react-router-dom';
import { getAuthUser } from '../lib/auth';
import { getJsonCookie, SelectedEvent } from '../lib/cookies';

interface SelectedExtra {
  name?: string;
  price?: string;
  size?: string;
}

export default function AtletaPainel() {
  const user = getAuthUser();
  const selectedEvent = getJsonCookie<SelectedEvent>('z5_selected_event');
  const selectedExtras = getJsonCookie<SelectedExtra[]>('z5_selected_event_extras');

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 sm:px-6 sm:py-20">
      <div className="max-w-4xl w-full bg-white p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">Painel do Atleta</h1>
          <p className="text-sm text-slate-500">Aqui estão os dados da sua conta e sua inscrição.</p>
        </div>

        {!user && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            <p className="font-bold mb-2">Você ainda não está logado.</p>
            <p className="text-sm">Faça login para ver seu painel completo.</p>
          </div>
        )}

        {user && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-black text-slate-900 mb-4">Seus dados</h2>
                <div className="space-y-3 text-sm text-slate-700">
                  <p><span className="font-bold">Nome:</span> {user.name}</p>
                  <p><span className="font-bold">E-mail:</span> {user.email}</p>
                  <p><span className="font-bold">CPF:</span> Armazenado na inscrição</p>
                </div>
              </div>

              {selectedEvent ? (
                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <h2 className="text-xl font-black text-slate-900 mb-4">Sua inscrição</h2>
                  <p className="font-bold text-lg text-slate-900">{selectedEvent.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{selectedEvent.date}</p>
                  <p className="text-sm text-slate-600">{selectedEvent.location}</p>
                  <p className="mt-3 text-sm font-black text-primary">{selectedEvent.price}</p>

                  {selectedExtras && selectedExtras.length > 0 ? (
                    <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="font-black text-slate-900 mb-3">Adicionais escolhidos</p>
                      <ul className="space-y-3 text-sm text-slate-700">
                        {selectedExtras.map((item, index) => (
                          <li key={index} className="rounded-2xl border border-slate-200 bg-white p-3">
                            <div className="flex justify-between items-center gap-4">
                              <span className="font-semibold">{item.name ?? 'Item'}</span>
                              <span className="text-slate-500 text-xs">{item.price ?? ''}</span>
                            </div>
                            {item.size && <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">Tamanho: {item.size}</p>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      Nenhum adicional selecionado para esta inscrição.
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-slate-700">
                  <p className="font-bold text-slate-900">Nenhum evento registrado ainda.</p>
                  <p className="mt-2 text-sm">Explore eventos e faça sua inscrição.</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-black text-slate-900 mb-4">Dicas rápidas</h2>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li>- Verifique seu e-mail para confirmação de inscrição.</li>
                  <li>- Selecione o tamanho antes de finalizar eventos com camiseta.</li>
                  <li>- Volte a explorar eventos na página inicial.</li>
                </ul>
              </div>
              <Link
                to="/explorar"
                className="inline-flex items-center justify-center w-full rounded-2xl bg-primary py-4 text-sm font-black uppercase text-white hover:bg-red-700 transition-all"
              >
                Explorar novos eventos
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
