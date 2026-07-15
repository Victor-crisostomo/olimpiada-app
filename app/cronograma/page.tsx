import { supabase } from '../../lib/supabase';
import { Jogo } from '../../types/database';
import CardJogo from '../../components/CardJogo';

// Garante que o servidor busque dados frescos a cada recarregamento
export const revalidate = 0;

async function buscarJogos(): Promise<Jogo[]> {
  const { data, error } = await supabase
    .from('jogos')
    .select('*');

  if (error) {
    console.error('Erro ao buscar jogos do Supabase:', error);
    return [];
  }
  
  return data || [];
}

export default async function Cronograma() {
  const jogos = await buscarJogos();

  // Função auxiliar para ordenar datas no formato brasileiro (DD/MM/AAAA)
  const parseData = (dataString: string) => {
    if (!dataString || dataString === 'Data a definir') return 0;
    const partes = dataString.split('/');
    if (partes.length !== 3) return 0;
    // Formato ISO: AAAA-MM-DD
    return new Date(`${partes[2]}-${partes[1]}-${partes[0]}`).getTime();
  };

  // Função auxiliar para ordenar horários (HH:MM)
  const parseHora = (horaString: string) => {
    if (!horaString) return 0;
    const partes = horaString.split(':');
    return parseInt(partes[0]) * 60 + parseInt(partes[1]);
  };

  // 1. Agrupar os jogos por data
  const jogosAgrupados = jogos.reduce((acumulador, jogo) => {
    const dataChave = jogo.data || 'Data a definir';
    if (!acumulador[dataChave]) {
      acumulador[dataChave] = [];
    }
    acumulador[dataChave].push(jogo);
    return acumulador;
  }, {} as Record<string, Jogo[]>);

  // 2. Ordenar as datas cronologicamente
  const datasOrdenadas = Object.keys(jogosAgrupados).sort((a, b) => parseData(a) - parseData(b));

  // 3. Ordenar os jogos dentro de cada dia pelo horário
  datasOrdenadas.forEach(data => {
    jogosAgrupados[data].sort((a, b) => parseHora(a.hora || '') - parseHora(b.hora || ''));
  });

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Cabeçalho da Página */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Cronograma Oficial
            </h1>
            <p className="text-slate-500 mt-1">
              Agenda completa de partidas e modalidades da Olimpíada.
            </p>
          </div>
          
          <div className="bg-[#0f172a] px-5 py-2.5 rounded-lg shadow-sm text-white font-bold text-sm tracking-wider uppercase">
            Calendário
          </div>
        </header>

        {/* Renderização Dinâmica dos Dias */}
        {datasOrdenadas.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center shadow-sm">
            <p className="text-slate-500 text-lg font-medium">Nenhum jogo agendado no momento.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {datasOrdenadas.map((data) => (
              <section key={data} className="space-y-6">
                
                {/* Divisor de Data com Estilo de Linha do Tempo */}
                <div className="flex items-center gap-4">
                  <div className="bg-amber-400 w-2 h-8 rounded-full"></div>
                  <h2 className="text-2xl font-black text-slate-800">
                    {data === 'Data a definir' ? 'A Definir' : data}
                  </h2>
                  <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                </div>

                {/* Grid de Jogos do Dia Específico */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jogosAgrupados[data].map((jogo) => (
                    <CardJogo key={jogo.id_jogo} jogo={jogo} />
                  ))}
                </div>
                
              </section>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}