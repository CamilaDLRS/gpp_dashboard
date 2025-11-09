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
} from "recharts";
import dayjs from "dayjs";

// Mock data
const SUMMARY = {
  spiAvg: 0.9,
  cpiAvg: 0.79,
  criticalCount: 2,
  eacTotal: 6320000,
  period: "Nov 2025",
  manager: "Dimitri Delinski",
  director: "Camila Delarosa"
};

const PROJECTS = [
  {
    id: "GPP Tools",
    SPI: 0.85,
    CPI: 0.77,
    plannedTeam: 8,
    actualTeam: 6,
    plannedEnd: "2025-09-30",
    estEnd: "2026-04-10",
    PV: 833333,
    EV: 708333,
    AC: 916667,
    alignment: ["Processos Internos", "Financeiro"],
  },
  {
    id: "Plataforma",
    SPI: 0.8,
    CPI: 0.7,
    plannedTeam: 7,
    actualTeam: 4,
    plannedEnd: "2025-08-31",
    estEnd: "2026-01-15",
    PV: 500000,
    EV: 400000,
    AC: 575000,
    alignment: ["Clientes", "Processos Internos"],
  },
  {
    id: "Pesquisa",
    SPI: 1.05,
    CPI: 0.91,
    plannedTeam: 6,
    actualTeam: 6,
    plannedEnd: "2025-12-01",
    estEnd: "2025-10-20",
    PV: 375000,
    EV: 393750,
    AC: 431250,
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

export default function App() {
  const scatterData = PROJECTS.map((p) => ({ x: p.SPI, y: p.CPI, name: p.id }));
  const barData = PROJECTS.map((p) => ({ name: p.id, SPI: p.SPI, CPI: p.CPI }));
  const capacityData = PROJECTS.map((p) => ({
    name: p.id,
    planned: p.plannedTeam,
    actual: p.actualTeam,
  }));
  const trend = [
    { month: "Aug", SPI: 0.95, CPI: 0.98 },
    { month: "Sep", SPI: 0.92, CPI: 0.94 },
    { month: "Oct", SPI: 0.91, CPI: 0.88 },
    { month: "Nov", SPI: SUMMARY.spiAvg, CPI: SUMMARY.cpiAvg },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Status Report — Portfólio GPP 2025
        </h1>
        <p className="text-sm text-gray-600">
          Período: {SUMMARY.period} • Gerente: {SUMMARY.manager} • Diretora Executiva: {SUMMARY.director}
        </p>
      </header>

      {/* Objetivo do Portfólio e Alinhamento Estratégico em linha */}
      <div className="flex gap-4 mb-6">
        <PortfolioObjective inline />
        <StrategicAlignment inline />
      </div>

      {/* Top KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-sm text-gray-500">SPI Médio do Portfólio</div>
          <div className="text-3xl font-bold text-spi">
            {SUMMARY.spiAvg.toFixed(2)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-sm text-gray-500">CPI Médio do Portfólio</div>
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
          <div className="text-sm text-gray-500">EAC Total Projetado</div>
          <div className="text-3xl font-bold text-emerald-600">
            R$ {Number(SUMMARY.eacTotal).toLocaleString()}
          </div>
        </div>
      </section>

      {/* status with readable schedule and cost */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Status & Cronograma (legível)</h3>
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
          <h3 className="font-semibold mb-2">Status & Custo (legível)</h3>
          <table className="w-full text-sm">
            <thead className="text-gray-500 text-xs">
              <tr>
                <th className="py-1">Projeto</th>
                <th>PV (R$)</th>
                <th>AC (R$)</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="py-2">{p.id}</td>
                  <td className="py-2">R$ {Number(p.PV).toLocaleString()}</td>
                  <td className="py-2">R$ {Number(p.AC).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* trend and capacity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">
            Análise de Tendência (SPI / CPI)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0.6, 1.05]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="SPI"
                stroke="#3498db"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="CPI"
                stroke="#f39c12"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Capacidade e Recursos</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={capacityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="planned" name="Planejado" fill="#7aa2ff" />
              <Bar dataKey="actual" name="Atual" fill="#2d6cdf" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* tables: risks, milestones, next steps */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Riscos</h3>
          <table className="w-full text-sm">
            <thead className="text-gray-500 text-xs">
              <tr>
                <th className="py-1">ID</th>
                <th>Projeto</th>
                <th>Risco</th>
                <th>Prob.</th>
                <th>Impacto</th>
              </tr>
            </thead>
            <tbody>
              {RISKS.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-1">{r.id}</td>
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
                  <td className="py-1">{m.date}</td>
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
                  <td className="py-1">{n.due}</td>
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
