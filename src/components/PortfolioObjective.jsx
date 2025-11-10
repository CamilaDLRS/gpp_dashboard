import React, { useState } from 'react';

/*
  Bloco de Objetivo Estratégico do Portfólio
  - Texto fornecido pelo usuário
  - Estilos minimalistas usando Tailwind
  - Pode ser reutilizado futuramente recebendo o texto via props
*/
export default function PortfolioObjective({ title = 'Objetivo Estratégico', objective }) {
  const [open, setOpen] = useState(false);
  const text = objective || 'Expandir e inovar a atuação da GPP na área de Engenharia de Software, por meio do desenvolvimento de soluções próprias, fortalecimento da base técnica e otimização dos processos internos, visando aumentar competitividade, reduzir dependências externas e ampliar a receita da empresa.';
  return (
    <div className={'bg-white rounded-2xl shadow p-4 border border-gray-100 w-full'}>
      <div className={''}>
        <button
          className="flex items-center gap-2 w-full text-left focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="portfolio-objective-text"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-lg font-semibold text-gray-800 flex-1">{title}</span>
          <span
            className={`transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M7 8l3 3 3-3" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
        {open && (
          <div id="portfolio-objective-text" className="mt-3">
            <p className="text-sm text-gray-700 leading-relaxed">
              {text}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-wide text-gray-500">
              <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full font-medium">Inovação</span>
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">Engenharia de Software</span>
              <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-full font-medium">Eficiência Interna</span>
              <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full font-medium">Receita</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
