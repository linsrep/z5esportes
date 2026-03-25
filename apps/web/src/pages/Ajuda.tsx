export default function Ajuda() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <h1 className="text-3xl font-bold mb-6">Central de Ajuda</h1>
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-slate-600 mb-8">Como podemos ajudar você hoje?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Inscrições', 'Pagamentos', 'Para Organizadores'].map(topic => (
            <div key={topic} className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary/30 transition-all cursor-pointer">
              <h3 className="font-bold mb-2">{topic}</h3>
              <p className="text-xs text-slate-500">Dúvidas frequentes e tutoriais sobre {topic.toLowerCase()}.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
