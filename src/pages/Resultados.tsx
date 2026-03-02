export default function Resultados() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <h1 className="text-3xl font-bold mb-6">Resultados e Performance</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-lg mb-2">Busca por Atleta</h3>
          <input type="text" placeholder="Nome ou CPF..." className="w-full rounded-lg border-slate-200 text-sm" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm md:col-span-2">
          <h3 className="font-bold text-lg mb-4">Últimos Resultados</h3>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm">
                <span className="font-medium">Maratona de São Paulo</span>
                <span className="text-slate-500">12/06/2024</span>
                <button className="text-primary font-bold">Ver Ranking</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
