import Link from 'next/link';

export default function Apoie() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Cabeçalho */}
        <header className="space-y-4">
          <Link href="/" className="inline-flex items-center text-slate-500 hover:text-amber-500 font-bold text-sm uppercase tracking-widest transition-colors">
            ← Voltar para o Início
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tighter">
            A Realidade do Nosso Esporte
          </h1>
        </header>

        {/* Corpo do Texto */}
        <article className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-8 text-lg text-slate-700 leading-relaxed">
          
          <p>
            A Associação Atlética é o coração do esporte universitário, mas a paixão e a dedicação dos nossos alunos, sozinhas, não pagam as contas estruturais que mantêm tudo funcionando.
          </p>

          <p>
            **Enfrentamos desafios reais todos os dias:**
          </p>

          <ul className="list-disc list-inside space-y-3 ml-4 text-slate-600">
            <li>Renovação constante de materiais esportivos (bolas, redes, coletes).</li>
            <li>Custos logísticos com transporte e alimentação em competições externas.</li>
            <li>Manutenção de equipamentos e pagamento de taxas de arbitragem.</li>
          </ul>

          <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-amber-400 italic text-slate-600">
            "Recentemente, a força da nossa comunidade provou ser capaz de arrecadar milhares de reais e impactar a vida de diversas crianças em ações sociais. Agora, precisamos dessa mesma união para garantir a sobrevivência da nossa própria estrutura esportiva."
          </div>

          <p>
            Qualquer valor faz a diferença e vai diretamente para o fundo de manutenção dos treinos e campeonatos.
          </p>

        </article>

        {/* Grid de Apoio: Pessoa Física e Jurídica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Área de Doação - PIX */}
          <div className="bg-[#0f172a] rounded-3xl p-8 text-center space-y-6 text-white shadow-xl flex flex-col justify-center">
            <div>
              <h3 className="text-2xl font-black tracking-tight text-amber-400">Torcedor / Aluno</h3>
              <p className="text-slate-300 mt-2 text-sm">Apoie com qualquer valor pelo PIX:</p>
            </div>
            
            <div className="bg-white/10 p-4 rounded-xl border border-white/20 inline-block mx-auto">
              <span className="font-mono text-xl font-bold tracking-wider select-all">
                54612095000123
              </span>
            </div>
            
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-4">
              Associação Atlética Acadêmica
            </p>
          </div>

          {/* Área de Patrocínio - Empresas */}
          <div className="bg-amber-400 rounded-3xl p-8 space-y-6 text-[#0f172a] shadow-xl flex flex-col justify-center">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black tracking-tight">Seja um Patrocinador</h3>
              <p className="text-[#0f172a]/80 mt-2 text-sm font-medium">
                Associe sua marca ao maior evento esportivo do instituto. Fale diretamente com a nossa diretoria:
              </p>
            </div>

            <ul className="space-y-4 bg-white/40 p-5 rounded-2xl border border-[#0f172a]/10">
              <li className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0f172a]/60">E-mail Oficial</span>
                <span className="font-bold text-lg">diretoriaaaita@gmail.com</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0f172a]/60">Ana Julia (Presidente)</span>
                <span className="font-bold text-lg">(12) 99999-9999</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0f172a]/60">Matheus Schavion (Vice-Presidente)</span>
                <span className="font-bold text-lg">(12) 9999-9999</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </main>
  );
}