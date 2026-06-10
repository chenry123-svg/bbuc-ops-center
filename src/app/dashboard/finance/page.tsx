import { kpiMatrix, STRATEGIC_PILLARS, getStatusColor } from "@/lib/kpi-data";
import KPISummaryBanner from "@/components/kpi/KPISummaryBanner";
import KPICard from "@/components/kpi/KPICard";

const FINANCE_PILLARS = ["Financial Sustainability", "Institutional Compliance"];

const financeKPIs = kpiMatrix.filter((k) => FINANCE_PILLARS.includes(k.strategicPillar));

const CLEARANCE_KPIs = kpiMatrix.filter((k) =>
  ["fin-clearance", "fin-academic-clearance", "comp-exam-readiness"].includes(k.id)
);

const ENROLLMENT_FINANCE_KPIs = kpiMatrix.filter((k) =>
  ["enr-total", "enr-undergrad", "fin-withdrawal-rate"].includes(k.id)
);

export default function FinancePage() {
  const urgentCount = financeKPIs.filter((k) => k.status === "red").length;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Finance &amp; Clearance</h1>
          <p className="text-sm text-slate-500 mt-1">
            BBUC KPI Alignment Matrix 2026-2027 · Financial Sustainability &amp; Institutional Compliance
          </p>
        </div>
        {urgentCount > 0 && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-red-800">
              {urgentCount} urgent item{urgentCount > 1 ? "s" : ""} require action
            </span>
          </div>
        )}
      </div>

      {/* Status summary */}
      <KPISummaryBanner kpis={financeKPIs} />

      {/* Exam clearance — most urgent */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Exam Clearance
          </h2>
          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
            Finals Jun 22 — Urgent
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CLEARANCE_KPIs.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </section>

      {/* Financial Sustainability KPIs */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Financial Sustainability
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiMatrix
            .filter(
              (k) =>
                k.strategicPillar === "Financial Sustainability" &&
                !["fin-clearance", "fin-academic-clearance"].includes(k.id)
            )
            .map((kpi) => (
              <KPICard key={kpi.id} kpi={kpi} />
            ))}
        </div>
      </section>

      {/* Enrollment context */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Enrollment Context
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ENROLLMENT_FINANCE_KPIs.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </section>

      {/* 2026-2027 pending items */}
      <section>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          2026-2027 Targets — Pending Data
        </h2>
        <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
          {financeKPIs
            .filter((k) => k.status === "pending")
            .map((kpi) => {
              const colors = getStatusColor(kpi.status);
              return (
                <div key={kpi.id} className="flex items-center gap-4 px-4 py-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700">{kpi.label}</p>
                    {kpi.note && (
                      <p className="text-xs text-slate-400 mt-0.5">{kpi.note}</p>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">FY {kpi.fy}</span>
                </div>
              );
            })}
        </div>
      </section>

      {/* Data source note */}
      <p className="text-xs text-slate-400 border-t border-slate-200 pt-4">
        Source: BBUC Master Dashboard v20 · Populi LMS · Bursar records as of Jun 8–10, 2026.
        2026-2027 targets pending budget submission and programme mapping.
      </p>
    </div>
  );
}
