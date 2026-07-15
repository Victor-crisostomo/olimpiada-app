import { supabase } from '../../lib/supabase';
import { Jogo } from '../../types/database';
import ListaDeJogos from '../../components/ListaDeJogos';

export const revalidate = 0;

async function buscarJogos(): Promise<Jogo[]> {
  const { data, error } = await supabase
    .from('jogos')
    .select('*')
    .order('id_jogo', { ascending: false });

  if (error) {
    console.error('Erro ao buscar jogos do Supabase:', error);
    return [];
  }
  
  return data || [];
}

export default async function Home() {
  const jogos = await buscarJogos();

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Placar ao Vivo
            </h1>
            <p className="text-slate-500 mt-1">
              Acompanhe os resultados da Olimpíada Interna em tempo real.
            </p>
          </div>
          
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-600">
              Sistema Online
            </span>
          </div>
        </header>

        <ListaDeJogos jogosIniciais={jogos} />

      </div>
    </main>
  );
}