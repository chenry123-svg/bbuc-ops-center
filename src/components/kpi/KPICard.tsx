"use client";

import { KPI, getStatusColor } from "@/lib/kpi-data";

interface Props {
  kpi: KPI;
}

export default function KPICard({ kpi }: Props) {
  const colors = getStatusColor(kpi.status);

  const progress =
    kpi.value !== null && kpi.target !== null && kpi.target !== 0
      ? Math.min(100, Math.round((Number(kpi.value) / Number(kpi.target)) * 100))
      : null;

  const isInverse = ["fin-withdrawal-rate", "acad-atrisk", "fac-overload", "stu-intervention", "comp-exam-readiness"].includes(kpi.id) && kpi.status !== "pending";

  return (
    <div className={`rounded-xl border ${colors.border} ${colors.bg} p-4 flex flex-col gap-3`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-slate-700 leading-tight">{kpi.label}</p>
        <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>
          {colors.label}
        </span>
      </div>

      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-slate-900">
          {kpi.value !== null ? `${kpi.value}${kpi.unit === "%" ? "%" : ""}` : "—"}
        </span>
        {kpi.target !== null && (
          <span className="text-sm text-slate-500 mb-0.5">
            / {kpi.target}{kpi.unit === "%" ? "%" : ""} target
          </span>
        )}
        {kpi.unit && kpi.unit !== "%" && (
          <span className="text-xs text-slate-400 mb-0.5">{kpi.unit}</span>
        )}
      </div>

      {progress !== null && (
        <div>
          <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                kpi.status === "green"
                  ? "bg-emerald-500"
                  : kpi.status === "amber"
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${isInverse ? 100 - progress : progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">{progress}% of target</p>
        </div>
      )}

      {kpi.value === null && (
        <div className="h-1.5 rounded-full bg-slate-200">
          <div className="h-full w-0" />
        </div>
      )}

      {kpi.note && (
        <p className="text-xs text-slate-500 leading-snug border-t border-slate-200 pt-2">
          {kpi.note}
        </p>
      )}

      <div className="flex items-center gap-1.5 mt-auto">
        <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
        <span className="text-xs text-slate-400">{kpi.strategicPillar}</span>
        {kpi.fy && (
          <span className="ml-auto text-xs text-slate-400">FY {kpi.fy}</span>
        )}
      </div>
    </div>
  );
}
