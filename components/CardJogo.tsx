import { Jogo } from '../types/database';

interface CardJogoProps {
  jogo: Jogo;
}

export default function CardJogo({ jogo }: CardJogoProps) {
  const isFinalizado = jogo.status === 'Finalizado';
  const isAoVivo = jogo.status !== 'Pendente' && jogo.status !== 'Finalizado'; 

  // TRATAMENTO NULL SAFETY APLICADO AQUI
  const nomeEquipeA = jogo.equipe_a ? jogo.equipe_a.trim() : 'A Definir';
  const nomeEquipeB = jogo.equipe_b ? jogo.equipe_b.trim() : 'A Definir';
  const isDefinirA = nomeEquipeA === 'A Definir';
  const isDefinirB = nomeEquipeB === 'A Definir';

  const getLogoPath = (equipe: string) => {
    if (!equipe || equipe === '-' || equipe === 'A Definir') {
      return 'https://ui-avatars.com/api/?name=%3F&background=cbd5e1&color=ffffff&size=128&font-size=0.6';
    }

    const equipeNormalizada = equipe.toLowerCase().trim();
    const turmasComLogo = ['t26', 't27', 't28', 't29', 't30', 'pos', 'pea'];

    if (turmasComLogo.includes(equipeNormalizada)) {
      return `/logos/${equipeNormalizada}.png`;
    }

    return `https://ui-avatars.com/api/?name=${equipe}&background=1e293b&color=f8fafc&bold=true&size=128`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1">
      
      <div className="bg-[#0f172a] px-5 py-3 flex justify-between items-center border-b-4 border-amber-400">
        <span className="text-xs font-black uppercase tracking-widest text-white">
          {jogo.modalidade}
        </span>
        <span className="text-[10px] font-bold text-[#0f172a] bg-white px-2 py-1 rounded-sm uppercase tracking-wider">
          {jogo.fase}
        </span>
      </div>

      {(jogo.data || jogo.hora || jogo.local) && (
        <div className="bg-slate-100 flex items-center justify-center gap-4 py-2 px-4 border-b border-slate-200 text-[11px] font-medium text-slate-500">
          {jogo.data && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              {jogo.data}
            </span>
          )}
          {jogo.hora && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {jogo.hora}
            </span>
          )}
          {jogo.local && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              {jogo.local}
            </span>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col gap-6 relative bg-slate-50">
        
        <div className="flex justify-between items-center w-full z-10">
          <div className="flex items-center gap-4">
            <img 
              src={getLogoPath(nomeEquipeA)} 
              alt={`Escudo ${nomeEquipeA}`} 
              className={`w-12 h-12 rounded-full shadow-md object-cover border-2 ${isFinalizado && jogo.vencedor === jogo.equipe_a ? 'border-amber-400' : 'border-white'} ${isDefinirA ? 'opacity-50' : 'opacity-100'}`} 
            />
            <span className={`font-black text-xl truncate max-w-[120px] tracking-tight ${isDefinirA ? 'text-slate-400 italic font-medium text-lg' : (isFinalizado && jogo.vencedor !== jogo.equipe_a && jogo.vencedor !== 'Empate' ? 'text-slate-400' : 'text-slate-800')}`}>
              {nomeEquipeA}
            </span>
          </div>
          {/* TRATAMENTO NULL SAFETY NO PLACAR */}
          <span className={`text-4xl font-black tabular-nums tracking-tighter ${isFinalizado && jogo.vencedor === jogo.equipe_a ? 'text-[#0f172a]' : 'text-slate-600'}`}>
            {isDefinirA ? '' : (jogo.placar_a !== null ? jogo.placar_a : '-')}
          </span>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-white rounded-full w-10 h-10 border-4 border-slate-50 shadow-sm z-20">
          <span className="text-xs font-black text-slate-300 italic">VS</span>
        </div>

        <hr className="border-slate-200 z-0 relative top-0" />

        <div className="flex justify-between items-center w-full z-10">
          <div className="flex items-center gap-4">
            <img 
              src={getLogoPath(nomeEquipeB)} 
              alt={`Escudo ${nomeEquipeB}`} 
              className={`w-12 h-12 rounded-full shadow-md object-cover border-2 ${isFinalizado && jogo.vencedor === jogo.equipe_b ? 'border-amber-400' : 'border-white'} ${isDefinirB ? 'opacity-50' : 'opacity-100'}`} 
            />
            <span className={`font-black text-xl truncate max-w-[120px] tracking-tight ${isDefinirB ? 'text-slate-400 italic font-medium text-lg' : (isFinalizado && jogo.vencedor !== jogo.equipe_b && jogo.vencedor !== 'Empate' ? 'text-slate-400' : 'text-slate-800')}`}>
              {nomeEquipeB}
            </span>
          </div>
          {/* TRATAMENTO NULL SAFETY NO PLACAR */}
          <span className={`text-4xl font-black tabular-nums tracking-tighter ${isFinalizado && jogo.vencedor === jogo.equipe_b ? 'text-[#0f172a]' : 'text-slate-600'}`}>
            {isDefinirB ? '' : (jogo.placar_b !== null ? jogo.placar_b : '-')}
          </span>
        </div>
      </div>

      <div className="px-5 py-3 bg-white border-t border-slate-100 flex justify-between items-center mt-auto">
        {isAoVivo ? (
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Ao Vivo</span>
          </div>
        ) : (
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-widest ${isFinalizado ? 'bg-slate-100 text-slate-500' : 'bg-blue-50 text-blue-600'}`}>
            {jogo.status}
          </span>
        )}
        
        {isFinalizado && jogo.vencedor && jogo.vencedor !== 'Empate' && (
          <span className="text-xs font-medium text-slate-400">
            Vitória: <strong className="text-slate-800 font-black">{jogo.vencedor}</strong>
          </span>
        )}
        {isFinalizado && jogo.vencedor === 'Empate' && (
          <span className="text-xs font-medium text-slate-400">
            Resultado: <strong className="text-slate-800 font-black">Empate</strong>
          </span>
        )}
      </div>
    </div>
  );
}