export default function Privacidade() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 sm:mb-8 tracking-tight">Política de Privacidade</h1>
      <div className="prose prose-slate max-w-none text-slate-600 space-y-5 sm:space-y-6">
        <p className="font-medium text-sm sm:text-base">Sua privacidade é nossa prioridade. Esta política descreve como coletamos e usamos seus dados.</p>
        
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">1. Coleta de Dados</h2>
          <p>Coletamos informações necessárias para sua inscrição em eventos, como nome, CPF, data de nascimento e dados de contato.</p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">2. Uso das Informações</h2>
          <p>Seus dados são compartilhados com os organizadores dos eventos nos quais você se inscreve para fins de logística e seguro.</p>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">3. Segurança</h2>
          <p>Utilizamos criptografia de ponta a ponta para proteger suas informações financeiras e pessoais.</p>
        </section>

        <p className="text-sm text-slate-400 mt-12">Sua confiança é fundamental para nós. Z5 Esportes.</p>
      </div>
    </div>
  );
}
