"use client";

import { useState } from 'react';
import { Jogo } from '../types/database';
import CardJogo from './CardJogo';

interface ListaDeJogosProps {
  jogosIniciais: Jogo[];
}

export default function ListaDeJogos({ jogosIniciais }: ListaDeJogosProps) {
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');

  // Função auxiliar para lidar com a nova arquitetura (objeto vs string)
  const getNomeModalidade = (modalidade: any) => {
    return typeof modalidade === 'object' && modalidade !== null ? modalidade.nome : modalidade;
  };

  // Cria categorias base e adiciona dinamicamente as modalidades extraindo o nome corretamente
  const modalidadesUnicas = Array.from(
    new Set(jogosIniciais.map(j => getNomeModalidade(j.modalidade)))
  );
  
  const categorias = ['Todos', 'Ao Vivo', 'Finalizados', ...modalidadesUnicas];

  // Lógica de Filtragem
  const jogosFiltrados = jogosIniciais.filter(jogo => {
    if (filtroAtivo === 'Todos') return true;
    
    if (filtroAtivo === 'Ao Vivo') {
      return jogo.status !== 'Pendente' && jogo.status !== 'Finalizado';
    }
    
    if (filtroAtivo === 'Finalizados') {
      return jogo.status === 'Finalizado';
    }

    // Se não for nenhum dos status acima, filtra comparando o nome extraído
    return getNomeModalidade(jogo.modalidade) === filtroAtivo;
  });

  return (
    <div className="space-y-6">
      
      {/* Barra de Filtros (Pills) */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categorias.map(categoria => (
          <button
            key={categoria}
            onClick={() => setFiltroAtivo(categoria)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              filtroAtivo === categoria
                ? 'bg-[#0f172a] text-amber-400 shadow-md'
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* Grid de Cards Filtrados */}
      {jogosFiltrados.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center shadow-sm mt-4">
          <p className="text-slate-500 text-lg font-medium">Nenhuma partida encontrada para este filtro.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jogosFiltrados.map((jogo) => (
            <CardJogo key={jogo.id_jogo} jogo={jogo} />
          ))}
        </div>
      )}

    </div>
  );
}