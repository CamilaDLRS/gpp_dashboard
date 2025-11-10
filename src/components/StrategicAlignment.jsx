import React, { useState } from 'react';

const PROJECTS = [
  {
    name: 'GPP Tools – Suite Integrada',
    perspective: 'Financeira / Processos Internos',
    description: 'Geração de novas receitas com um produto SaaS proprietário; padroniza e automatiza processos de engenharia de software.'
  },
  {
    name: 'Plataforma de Relacionamento e Suporte ao Cliente',
    perspective: 'Clientes / Processos Internos',
    description: 'Melhora o atendimento, reduz retrabalho e aumenta fidelização dos clientes com suporte 24/7 e IA.'
  },
  {
    name: 'Sistema de Pesquisa de Satisfação e Mercado',
    perspective: 'Clientes / Financeira',
    description: 'Fornece insights e relatórios de mercado, apoiando decisões estratégicas e identificação de novas oportunidades.'
  }
];

export default function StrategicAlignment({ title = 'Alinhamento Estratégico dos Projetos' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={'bg-white rounded-2xl shadow p-4 border border-gray-100 w-full'}>
      <div className={''}>
        <button
          className="flex items-center gap-2 w-full text-left focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="strategic-alignment-table"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
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
          <div id="strategic-alignment-table" className="mt-3">
            <table className="w-full text-sm">
              <thead className="text-gray-500 text-xs">
                <tr>
                  <th className="py-1">Projeto</th>
                  <th>Perspectiva Estratégica</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {PROJECTS.map((p) => (
                  <tr key={p.name} className="border-b">
                    <td className="py-2 font-medium text-gray-800">{p.name}</td>
                    <td className="py-2 text-blue-600">{p.perspective}</td>
                    <td className="py-2 text-gray-700">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
