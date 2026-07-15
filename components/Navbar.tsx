'use client'; // Necessário para o estado do menu mobile

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Aqui adicionamos o botão "Início" explicitamente
  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Ao Vivo', href: '/ao-vivo' },
    { name: 'Cronograma', href: '/cronograma' },
    { name: 'Ranking', href: '/ranking' },
    { name: 'Chaveamento', href: '/chaveamento' },
  ];

  return (
    <nav className="bg-[#0f172a] border-b-4 border-amber-400 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo da Atlética e Título do Sistema */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center border-2 border-amber-400 group-hover:scale-110 transition-transform">
                <Image 
                  src="/logos/aaaita.png" 
                  alt="Logo AAAITA" 
                  width={48} 
                  height={48} 
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-xs font-black text-[#0f172a]">AAAITA</span>';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tighter leading-none">Olimpiada Interna</span>
                <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">AAAITA System</span>
              </div>
            </Link>
          </div>

          {/* Links de Navegação - Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-200 hover:bg-amber-400 hover:text-[#0f172a] px-4 py-2 rounded-md text-sm font-black uppercase tracking-wider transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Botão Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Aberto */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#111827] border-t border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:bg-amber-400 hover:text-[#0f172a] block px-3 py-2 rounded-md text-base font-bold uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)} 
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}