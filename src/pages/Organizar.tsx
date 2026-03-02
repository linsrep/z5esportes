export default function Organizar() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <h1 className="text-3xl font-bold mb-6">Organize seu Evento</h1>
      <div className="bg-slate-900 text-white p-12 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">Tecnologia Z5 para Organizadores</h2>
          <p className="text-slate-300 mb-8">Oferecemos a solução completa: gestão de inscrições, pagamentos, cronometragem em tempo real e entrega de kits.</p>
          <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all">Começar Agora</button>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent"></div>
      </div>
    </div>
  );
}
