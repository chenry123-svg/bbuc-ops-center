"use client";

import { KPI, KPIStatus } from "@/lib/kpi-data";

interface Props {
  kpis: KPI[];
}

export default function KPISummaryBanner({ kpis }: Props) {
  const counts: Record<KPIStatus, number> = { green: 0, amber: 0, red: 0, pending: 0 };
  kpis.forEach((k) => counts[k.status]++);

  const summary = [
    { label: "On Track", count: counts.green, bg: "bg-emerald-500", light: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    { label: "Attention", count: counts.amber, bg: "bg-amber-500", light: "bg-amber-50 text-amber-800 border-amber-200" },
    { label: "Urgent", count: counts.red, bg: "bg-red-500", light: "bg-red-50 text-red-800 border-red-200" },
    { label: "Pending Data", count: counts.pending, bg: "bg-slate-400", light: "bg-slate-50 text-slate-600 border-slate-200" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {summary.map((s) => (
        <div key={s.label} className={`rounded-xl border px-4 py-3 ${s.light} flex items-center gap-3`}>
          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.bg}`} />
          <div>
            <p className="text-2xl font-bold leading-none">{s.count}</p>
            <p className="text-xs mt-0.5 opacity-75">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
