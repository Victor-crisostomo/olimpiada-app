import { supabase } from '../../lib/supabase';
import { Jogo } from '../../types/database';
import CardJogo from '../../components/CardJogo';

export const revalidate = 0;

async function buscarJogosMataMata(): Promise<Jogo[]> {
  const { data, error } = await supabase
    .from('jogos')
    .select('*')
    // Traz os jogos em ordem de criação para manter a consistência
    .order('id_jogo', { ascending: true });

  if (error) {
    console.error('Erro ao buscar jogos para o chaveamento:', error);
    return [];
  }
  
  return data || [];
}

export default async function Chaveamento() {
  const jogos = await buscarJogosMataMata();

  // Ordem oficial das fases do mata-mata
  const ordemFases = [
    'Oitavas de Final', 
    'Quartas de Final', 
    'Semifinal', 
    'Terceiro Lugar', 
    'Final'
  ];

  // 1. Agrupar jogos por Modalidade e depois por Fase
  const modalidadesAgrupadas = jogos.reduce((acumulador, jogo) => {
    // Ignora a fase de grupos para manter apenas a árvore de mata-mata
    if (jogo.fase.toLowerCase().includes('grupo')) return acumulador;

    const mod = jogo.modalidade || 'Outros';
    const fase = jogo.fase || 'Fase Indefinida';

    if (!acumulador[mod]) {
      acumulador[mod] = {};
    }
    if (!acumulador[mod][fase]) {
      acumulador[mod][fase] = [];
    }
    
    acumulador[mod][fase].push(jogo);
    return acumulador;
  }, {} as Record<string, Record<string, Jogo[]>>);

  // 2. Extrair a lista de modalidades para renderização
  const modalidadesLista = Object.keys(modalidadesAgrupadas).sort();

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Cabeçalho da Página */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Chaveamentos
            </h1>
            <p className="text-slate-500 mt-1">
              Acompanhe o caminho até o título em cada modalidade.
            </p>
          </div>
          
          <div className="bg-[#0f172a] px-5 py-2.5 rounded-lg shadow-sm text-white font-bold text-sm tracking-wider uppercase">
            Mata-Mata
          </div>
        </header>

        {/* Verificação de Dados */}
        {modalidadesLista.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center shadow-sm">
            <p className="text-slate-500 text-lg font-medium">Os chaveamentos serão formados após a fase de grupos.</p>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* Renderizar cada Modalidade como um Bloco */}
            {modalidadesLista.map((modalidade) => {
              const fasesDaModalidade = modalidadesAgrupadas[modalidade];
              
              // Ordenar as fases encontradas de acordo com a ordem oficial
              const fasesOrdenadas = Object.keys(fasesDaModalidade).sort((a, b) => {
                const indexA = ordemFases.indexOf(a);
                const indexB = ordemFases.indexOf(b);
                // Se a fase não estiver na lista, joga pro final
                return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
              });

              return (
                <section key={modalidade} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  
                  {/* Título da Modalidade */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-amber-400 w-3 h-10 rounded-full"></div>
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                      {modalidade}
                    </h2>
                  </div>

                  {/* Contêiner de Rolagem Horizontal das Colunas */}
                  <div className="flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                    
                    {fasesOrdenadas.map((fase) => (
                      <div key={fase} className="flex-none w-[320px] md:w-[360px] snap-center flex flex-col gap-6">
                        
                        {/* Etiqueta da Fase */}
                        <div className="bg-slate-100 text-slate-500 text-center py-2 rounded-lg font-bold text-sm uppercase tracking-widest border border-slate-200">
                          {fase}
                        </div>

                        {/* Lista de Jogos da Fase */}
                        <div className="flex flex-col gap-6">
                          {fasesDaModalidade[fase].map((jogo) => (
                            <CardJogo key={jogo.id_jogo} jogo={jogo} />
                          ))}
                        </div>

                      </div>
                    ))}

                  </div>
                </section>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}