export default function Organizar() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6">Organize seu Evento</h1>
      <div className="bg-slate-900 text-white p-6 sm:p-12 rounded-[28px] sm:rounded-3xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tecnologia Z5 para Organizadores</h2>
          <p className="text-sm sm:text-base text-slate-300 mb-6 sm:mb-8">Oferecemos a solução completa: gestão de inscrições, pagamentos, cronometragem em tempo real e entrega de kits.</p>
          <button className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-red-700 transition-all">Começar Agora</button>
        </div>
        <div className="absolute top-0 right-0 w-1/2 sm:w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent"></div>
      </div>
    </div>
  );
}
