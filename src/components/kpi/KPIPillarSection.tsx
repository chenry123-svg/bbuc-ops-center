"use client";

import { KPI } from "@/lib/kpi-data";
import KPICard from "./KPICard";

interface Props {
  pillar: string;
  kpis: KPI[];
}

export default function KPIPillarSection({ pillar, kpis }: Props) {
  if (kpis.length === 0) return null;
  return (
    <section>
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
        {pillar}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </section>
  );
}
