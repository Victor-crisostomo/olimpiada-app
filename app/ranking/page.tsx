import { supabase } from '../../lib/supabase';
import { RankingItem } from '../../types/database';

export const revalidate = 0;

async function buscarRanking(): Promise<RankingItem[]> {
  const { data, error } = await supabase
    .from('ranking')
    .select('*')
    // Ordenação Olímpica: Pontos > Ouros > Pratas > Bronzes
    .order('pontos', { ascending: false })
    .order('ouros', { ascending: false })
    .order('pratas', { ascending: false })
    .order('bronzes', { ascending: false });

  if (error) {
    console.error('Erro ao buscar ranking do Supabase:', error);
    return [];
  }
  
  return data || [];
}

// Dicionário Inteligente de Logos
const getLogoPath = (equipe: string) => {
  if (!equipe || equipe === '-') {
    return 'https://ui-avatars.com/api/?name=OO&background=cbd5e1&color=ffffff&size=128';
  }

  const equipeNormalizada = equipe.toLowerCase().trim();
  const turmasComLogo = ['t26', 't27', 't28', 't29', 't30', 'pos', 'pea'];

  if (turmasComLogo.includes(equipeNormalizada)) {
    return `/logos/${equipeNormalizada}.png`;
  }

  return `https://ui-avatars.com/api/?name=${equipe}&background=1e293b&color=f8fafc&bold=true&size=128`;
};

export default async function Ranking() {
  const classificacao = await buscarRanking();

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Cabeçalho da Página */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Quadro de Medalhas
            </h1>
            <p className="text-slate-500 mt-1">
              Classificação geral oficial da Olimpíada Interna.
            </p>
          </div>
          
          <div className="bg-amber-400 px-5 py-2.5 rounded-lg shadow-sm text-[#0f172a] font-black text-sm tracking-widest uppercase">
            Ranking Geral
          </div>
        </header>

        {/* Lista de Classificação */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Cabeçalho da Lista */}
          <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center text-xs font-bold uppercase tracking-widest">
            <div className="w-12 text-center">Pos</div>
            <div className="flex-1">Turma</div>
            <div className="w-16 text-center text-amber-400" title="Pontos Totais">Pts</div>
            <div className="w-12 text-center text-yellow-400" title="Ouro">🥇</div>
            <div className="w-12 text-center text-slate-300" title="Prata">🥈</div>
            <div className="w-12 text-center text-amber-600" title="Bronze">🥉</div>
          </div>

          {/* Itens do Ranking */}
          <div className="divide-y divide-slate-100">
            {classificacao.map((item, index) => (
              <div key={item.id} className="flex items-center px-6 py-4 hover:bg-slate-50 transition-colors">
                
                {/* Posição */}
                <div className="w-12 flex justify-center">
                  <span className={`text-sm font-black w-8 h-8 flex items-center justify-center rounded-full ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                    index === 1 ? 'bg-slate-100 text-slate-600' : 
                    index === 2 ? 'bg-orange-100 text-orange-800' : 
                    'text-slate-400'
                  }`}>
                    {index + 1}º
                  </span>
                </div>

                {/* Turma com Brasão Dinâmico */}
                <div className="flex-1 flex items-center gap-4">
                  <img 
                    src={getLogoPath(item.turma)} 
                    alt={`Escudo ${item.turma}`} 
                    className="w-10 h-10 rounded-full shadow-sm object-cover border-2 border-white"
                  />
                  <span className="font-black text-lg text-slate-800 tracking-tight">
                    {item.turma}
                  </span>
                </div>

                {/* Pontuação e Medalhas */}
                <div className="w-16 text-center font-black text-xl text-[#0f172a]">
                  {item.pontos}
                </div>
                <div className="w-12 text-center font-bold text-slate-600">{item.ouros}</div>
                <div className="w-12 text-center font-bold text-slate-600">{item.pratas}</div>
                <div className="w-12 text-center font-bold text-slate-600">{item.bronzes}</div>
                
              </div>
            ))}
            
            {classificacao.length === 0 && (
              <div className="p-8 text-center text-slate-500 font-medium">
                O quadro de medalhas será atualizado após os primeiros resultados.
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}