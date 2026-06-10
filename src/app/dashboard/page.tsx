import { kpiMatrix, STRATEGIC_PILLARS } from "@/lib/kpi-data";
import KPISummaryBanner from "@/components/kpi/KPISummaryBanner";
import KPIPillarSection from "@/components/kpi/KPIPillarSection";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Executive KPI Summary</h1>
        <p className="text-sm text-slate-500 mt-1">
          BBUC KPI Alignment Matrix 2026-2027 · All institutional domains
        </p>
      </div>

      <KPISummaryBanner kpis={kpiMatrix} />

      <div className="space-y-8">
        {STRATEGIC_PILLARS.map((pillar) => (
          <KPIPillarSection
            key={pillar}
            pillar={pillar}
            kpis={kpiMatrix.filter((k) => k.strategicPillar === pillar)}
          />
        ))}
      </div>
    </div>
  );
}
