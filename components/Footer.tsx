export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] border-t-2 border-slate-800 mt-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {/* Coluna 1: Identidade */}
          <div className="flex flex-col gap-2 items-center md:items-start">
            <span className="text-xl font-black text-white tracking-tighter">Olimpiada Interna</span>
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">AAAITA - System v1.0</span>
          </div>

          {/* Coluna 2: Creditos */}
          <div className="text-sm font-medium">
            <p>&copy; {currentYear} Associação Atlética Acadêmica. All rights reserved.</p>
            <p className="mt-1">Desenvolvido com tecnologia de ponta para a melhor torcida.</p>
          </div>

          {/* Coluna 3: Status/Aviso */}
          <div className="flex justify-center md:justify-end items-center gap-3">
            <div className="text-xs text-right hidden md:block">
              <p>Plataforma Oficial</p>
              <p className="font-bold text-emerald-400">Dados Sincronizados</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 flex items-center justify-center p-2 bg-emerald-950">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04a12.02 12.02 0 003 9c2.397 1.86 4.674 3.118 7.618 3.118 2.944 0 5.221-1.258 7.618-3.118 2.397-1.86 3-9 3-9z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}