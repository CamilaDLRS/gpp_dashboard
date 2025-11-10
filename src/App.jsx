import React from "react";
import PortfolioObjective from "./components/PortfolioObjective";
import StrategicAlignment from "./components/StrategicAlignment";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
  CartesianAxis,
  ReferenceLine,
  Label,
} from "recharts";
import dayjs from "dayjs";

// Mock data
const SUMMARY = {
  spiAvg: 0.9,
  cpiAvg: 0.79,
  criticalCount: 2,
  // O EAC Total é a soma dos EACs individuais
  eacTotal: 3235294 + 1437500 + 1642857, // 6315651
  period: "Nov 2025",
  manager: "Dimitri Delinski",
  director: "Camila Delarosa",
};

// Dados dos projetos enriquecidos com BAC, EAC, TCPI e Duração
const PROJECTS = [
  {
    id: "GPP Tools",
    SPI: 0.85,
    CPI: 0.7727,
    plannedTeam: 9,
    actualTeam: 9,
    plannedEnd: "2026-02-15",
    estEnd: "2026-03-25",
    PV: 833333,
    EV: 708333,
    AC: 916667,
    BAC: 2500000, // Custo Original (do CSV)
    EAC: 3235294, // EAC (do CSV)
    TCPI_BAC: 1.132, // (BAC - EV) / (BAC - AC)
    plannedDuration: 9, // Duração Original (do CSV)
    estDuration: 10.59, // Projeção de Prazo (do CSV)
    alignment: ["Processos Internos", "Financeiro"],
  },
  {
    id: "Plataforma",
    SPI: 0.8,
    CPI: 0.6956,
    plannedTeam: 7,
    actualTeam: 5,
    plannedEnd: "2026-03-12",
    estEnd: "2026-05-12",
    PV: 500000,
    EV: 400000,
    AC: 575000,
    BAC: 1000000, // Custo Original (do CSV)
    EAC: 1437500, // EAC (do CSV)
    TCPI_BAC: 1.412, // (BAC - EV) / (BAC - AC)
    plannedDuration: 8, // Duração Original (do CSV)
    estDuration: 10.0, // Projeção de Prazo (do CSV)
    alignment: ["Clientes", "Processos Internos"],
  },
  {
    id: "Pesquisa",
    SPI: 1.05,
    CPI: 0.913,
    plannedTeam: 8,
    actualTeam: 8,
    plannedEnd: "2026-05-09",
    estEnd: "2025-04-25",
    PV: 375000,
    EV: 393750,
    AC: 431250,
    BAC: 1500000, // Custo Original (do CSV)
    EAC: 1642857, // EAC (do CSV)
    TCPI_BAC: 1.035, // (BAC - EV) / (BAC - AC)
    plannedDuration: 8, // Duração Original (do CSV)
    estDuration: 7.62, // Projeção de Prazo (do CSV)
    alignment: ["Clientes", "Financeiro"],
  },
];

const RISKS = [
  {
    id: "R1",
    project: "GPP Tools",
    risk: "Mudança de requisitos",
    probability: "Alta",
    impact: "Alto",
    action: "Formalizar CR; priorizar MVP",
  },
  {
    id: "R2",
    project: "Plataforma",
    risk: "Perda de membros-chave",
    probability: "Alta",
    impact: "Alto",
    action: "Contratar substitutos; consultoria",
  },
  {
    id: "R3",
    project: "Pesquisa",
    risk: "Sobrecusto consultoria",
    probability: "Média",
    impact: "Médio",
    action: "Rever contratos",
  },
];

const MILESTONES = [
  {
    project: "GPP Tools",
    milestone: "Protótipo M1",
    status: "Em andamento",
    date: "2025-11-30",
  },
  {
    project: "Plataforma",
    milestone: "Chatbot v1",
    status: "Concluído",
    date: "2025-10-20",
  },
  {
    project: "Pesquisa",
    milestone: "Painel beta",
    status: "Em teste",
    date: "2025-11-15",
  },
];

const NEXT = [
  {
    project: "GPP Tools",
    action: "Formalizar CR e replanejar escopo",
    owner: "PMO",
    due: "2025-12-15",
  },
  {
    project: "Plataforma",
    action: "Onboarding substitutos",
    owner: "RH",
    due: "2025-11-30",
  },
  {
    project: "Pesquisa",
    action: "Revisar contratos",
    owner: "Financeiro",
    due: "2025-11-25",
  },
];

// Formatter para R$
const currencyFormatter = (value) =>
  `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

// Formatter para Meses
const monthsFormatter = (value) => `${Number(value).toFixed(1)}m`;


export default function App() {
  // Dados para os gráficos de tendência
  const trendData = PROJECTS.map((p) => ({
    name: p.id,
    "CPI Atual": p.CPI,
    "TCPI (Meta BAC)": p.TCPI_BAC,
  }));

  const costProjectionData = PROJECTS.map((p) => ({
    name: p.id,
    "Orçado (BAC)": p.BAC,
    "Projetado (EAC)": p.EAC,
  }));

  const scheduleProjectionData = PROJECTS.map((p) => ({
    name: p.id,
    "Planejado (Meses)": p.plannedDuration,
    "Projetado (Meses)": p.estDuration,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Status Report — Portfólio GPP 2025
        </h1>
        <p className="text-sm text-gray-600">
          Período: {SUMMARY.period} • Gerente: {SUMMARY.manager} • Diretora
          Executiva: {SUMMARY.director}
        </p>
      </header>

      {/* Objetivo do Portfólio e Alinhamento Estratégico em linha */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <PortfolioObjective />
        </div>
        <div className="flex-1">
          <StrategicAlignment />
        </div>
      </div>

      {/* Top KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-sm text-gray-500">SPI (Desempenho Prazo) Médio do Portfólio</div>
          <div className="text-3xl font-bold text-spi">
            {SUMMARY.spiAvg.toFixed(2)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-sm text-gray-500">CPI (Eficiência de Custo) Médio do Portfólio</div>
          <div className="text-3xl font-bold text-cpi">
            {SUMMARY.cpiAvg.toFixed(2)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Projetos Críticos</div>
          <div className="text-3xl font-bold text-red-600">
            {SUMMARY.criticalCount}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-sm text-gray-500">EAC (Custo Total) Projetado</div>
          <div className="text-3xl font-bold text-emerald-600">
            {currencyFormatter(SUMMARY.eacTotal)}
          </div>
        </div>
      </section>

      {/* status with readable schedule and cost */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Status & Cronograma</h3>
          <table className="w-full text-sm">
            <thead className="text-gray-500 text-xs">
              <tr>
                <th className="py-1">Projeto</th>
                <th>Prazo Planejado</th>
                <th>Estimativa Atual</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="py-2">{p.id}</td>
                  <td className="py-2">
                    {dayjs(p.plannedEnd).format("DD/MM/YYYY")}
                  </td>
                  <td className="py-2">
                    {dayjs(p.estEnd).format("DD/MM/YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Status & Custo</h3>
          <table className="w-full text-sm">
            <thead className="text-gray-500 text-xs">
              <tr>
                <th className="py-1">Projeto</th>
                <th>PV - Valor Planejado (R$)</th>
                <th>AC - Valor Gasto (R$)</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="py-2">{p.id}</td>
                  <td className="py-2">{currencyFormatter(p.PV)}</td>
                  <td className="py-2">{currencyFormatter(p.AC)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* NOVA SEÇÃO DE ANÁLISE DE TENDÊNCIA */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 mt-8">
        Análise de Tendência
      </h2>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        
        {/* Gráfico 1: Lacuna de Desempenho (CPI vs TCPI) */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-4 text-center">Lacuna de Desempenho (Custo)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trendData} margin={{ top: 5, right: 5, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis domain={[0, 1.5]} ticks={[0, 0.5, 1.0, 1.5]} />
              <Tooltip formatter={(value) => Number(value).toFixed(3)} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <ReferenceLine y={1.0} stroke="#b0a0a0" strokeDasharray="3 3">
                <Label value="Meta (1.0)" position="insideTopLeft" fontSize={10} fill="#b0a0a0" />
              </ReferenceLine>
              <Bar dataKey="CPI Atual" fill="#f87171" />
              <Bar dataKey="TCPI (Meta BAC)" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico 2: Projeção de Custo (Orçado vs. EAC) */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-4 text-center">Projeção de Custo (Orçado vs. Projetado)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={costProjectionData} margin={{ top: 5, right: 5, left: 60, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis tickFormatter={currencyFormatter} fontSize={12} />
              <Tooltip formatter={currencyFormatter} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="Orçado (BAC)" fill="#82ca9d" />
              <Bar dataKey="Projetado (EAC)" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico 3: Projeção de Prazo (Planejado vs. Projetado) */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-4 text-center">Projeção de Prazo (Planejado vs. Projetado)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={scheduleProjectionData} margin={{ top: 5, right: 5, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis label={{ value: 'Meses', angle: -90, position: 'insideLeft', fontSize: 12, offset: 0 }} fontSize={12} />
              <Tooltip formatter={(value) => `${Number(value).toFixed(1)} meses`} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="Planejado (Meses)" fill="#8884d8" />
              <Bar dataKey="Projetado (Meses)" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* tabelas: risks, milestones, next steps */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Riscos</h3>
          <table className="w-full text-sm">
            <thead className="text-gray-500 text-xs">
              <tr>
                <th>Projeto</th>
                <th>Risco</th>
                <th>Prob.</th>
                <th>Impacto</th>
              </tr>
            </thead>
            <tbody>
              {RISKS.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-1">{r.project}</td>
                  <td className="py-1">{r.risk}</td>
                  <td className="py-1">{r.probability}</td>
                  <td className="py-1">{r.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Marcos</h3>
          <table className="w-full text-sm">
            <thead className="text-gray-500 text-xs">
              <tr>
                <th className="py-1">Projeto</th>
                <th>Marco</th>
                <th>Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {MILESTONES.map((m) => (
                <tr key={m.project} className="border-b">
                  <td className="py-1">{m.project}</td>
                  <td className="py-1">{m.milestone}</td>
                  <td className="py-1">{m.status}</td>
                  <td className="py-1">{dayjs(m.date).format("DD/MM/YY")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Próximos Passos</h3>
          <table className="w-full text-sm">
            <thead className="text-gray-500 text-xs">
              <tr>
                <th className="py-1">Projeto</th>
                <th>Ação</th>
                <th>Responsável</th>
                <th>Prazo</th>
              </tr>
            </thead>
            <tbody>
              {NEXT.map((n) => (
                <tr key={n.project} className="border-b">
                  <td className="py-1">{n.project}</td>
                  <td className="py-1">{n.action}</td>
                  <td className="py-1">{n.owner}</td>
                  <td className="py-1">{dayjs(n.due).format("DD/MM/YY")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="text-xs text-gray-500 text-center mt-4">
        Todos direitos reservados © 2024 GPP Engenharia de Software
      </footer>
    </div>
  );
}