import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 md:p-12">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        
        {/* Cabeçalho de Boas-Vindas */}
        <div className="text-center space-y-6">
          <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-amber-400 mb-6">
            <span className="text-2xl font-black text-[#0f172a]">AAAITA</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter">
            Olimpíada Interna <span className="text-amber-500">2026</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Acompanhe os resultados, o cronograma e o quadro de medalhas em tempo real no sistema oficial da Associação Atlética Acadêmica.
          </p>
        </div>

        {/* Botões de Acesso Rápido ao Sistema */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <Link href="/ao-vivo" className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-4 rounded-xl text-center shadow-sm transition-all uppercase tracking-widest text-xs">
            Ao Vivo
          </Link>
          <Link href="/cronograma" className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-4 rounded-xl text-center shadow-sm transition-all uppercase tracking-widest text-xs">
            Cronograma
          </Link>
          <Link href="/ranking" className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-4 rounded-xl text-center shadow-sm transition-all uppercase tracking-widest text-xs">
            Ranking
          </Link>
          <Link href="/chaveamento" className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-4 rounded-xl text-center shadow-sm transition-all uppercase tracking-widest text-xs">
            Mata-Mata
          </Link>
        </div>

        {/* Banner de Apoio à Atlética (Destaque Principal) */}
        <div className="mt-16 bg-[#0f172a] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-800 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-amber-400 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="inline-block bg-amber-400 text-[#0f172a] font-black px-3 py-1 rounded-full text-xs uppercase tracking-widest">
                Chamado Urgente
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                O esporte precisa de você.
              </h2>
              <p className="text-slate-300 font-medium text-lg max-w-xl">
                Nossos atletas dão o sangue em quadra, mas a infraestrutura tem um custo. Descubra como a sua contribuição mantém viva a tradição esportiva e apoia as nossas equipes.
              </p>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-auto">
              <Link href="/apoie" className="block w-full text-center bg-amber-400 hover:bg-amber-300 text-[#0f172a] font-black text-lg px-8 py-5 rounded-xl shadow-lg transition-colors uppercase tracking-widest">
                Apoie a Atlética
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}