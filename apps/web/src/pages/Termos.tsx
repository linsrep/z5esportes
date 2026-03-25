export default function Termos() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Termos e Condições</h1>
      <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
        <p className="font-medium">Bem-vindo à Z5 Esportes. Ao acessar nossa plataforma, você concorda com os seguintes termos:</p>
        
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">1. Uso da Plataforma</h2>
          <p>A Z5 Esportes é uma plataforma intermediadora de inscrições para eventos esportivos. Não somos os organizadores diretos dos eventos, exceto quando explicitamente indicado.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">2. Inscrições e Pagamentos</h2>
          <p>As inscrições são pessoais e intransferíveis, salvo autorização do organizador. O processamento de pagamentos é realizado por parceiros seguros.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-2">3. Cancelamentos</h2>
          <p>Políticas de reembolso seguem o Código de Defesa do Consumidor e as regras específicas de cada organizador de evento.</p>
        </section>

        <p className="text-sm text-slate-400 mt-12">Última atualização: 26 de Fevereiro de 2024.</p>
      </div>
    </div>
  );
}
