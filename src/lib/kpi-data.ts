export type KPIStatus = "green" | "amber" | "red" | "pending";

export interface KPI {
  id: string;
  label: string;
  value: string | number | null;
  target: string | number | null;
  unit?: string;
  status: KPIStatus;
  trend?: "up" | "down" | "flat";
  note?: string;
  strategicPillar: string;
  fy?: "2025-2026" | "2026-2027";
}

export const STRATEGIC_PILLARS = [
  "Enrollment & Access",
  "Academic Excellence",
  "Financial Sustainability",
  "Faculty & Operations",
  "Student Success",
  "Institutional Compliance",
];

export const kpiMatrix: KPI[] = [
  // ── Enrollment & Access ──────────────────────────────────────────────────
  {
    id: "enr-total",
    label: "Total Active Enrollment",
    value: 121,
    target: 130,
    unit: "students",
    status: "amber",
    trend: "up",
    note: "9 below target; UG segment most at risk",
    strategicPillar: "Enrollment & Access",
    fy: "2025-2026",
  },
  {
    id: "enr-undergrad",
    label: "Undergraduate Enrollment",
    value: 25,
    target: 35,
    unit: "students",
    status: "red",
    trend: "down",
    note: "29% below target",
    strategicPillar: "Enrollment & Access",
    fy: "2025-2026",
  },
  {
    id: "enr-collegeprep",
    label: "College Prep Enrollment",
    value: 94,
    target: 95,
    unit: "students",
    status: "green",
    trend: "flat",
    strategicPillar: "Enrollment & Access",
    fy: "2025-2026",
  },
  {
    id: "enr-fall2026",
    label: "Fall 2026 Enrollment Target",
    value: null,
    target: 130,
    unit: "students",
    status: "pending",
    note: "Pipeline: 253 enquiries, 303 applications",
    strategicPillar: "Enrollment & Access",
    fy: "2026-2027",
  },
  // ── Financial Sustainability ─────────────────────────────────────────────
  {
    id: "fin-clearance",
    label: "Exam Financial Clearance",
    value: 0,
    target: 75,
    unit: "students cleared",
    status: "red",
    trend: "flat",
    note: "0/75 cleared — Bursar update required before Jun 22",
    strategicPillar: "Financial Sustainability",
    fy: "2025-2026",
  },
  {
    id: "fin-academic-clearance",
    label: "Exam Academic Clearance",
    value: 0,
    target: 75,
    unit: "students cleared",
    status: "red",
    trend: "flat",
    note: "Registrar confirmation pending",
    strategicPillar: "Financial Sustainability",
    fy: "2025-2026",
  },
  {
    id: "fin-withdrawal-rate",
    label: "Institutional Withdrawal Rate",
    value: 5.8,
    target: 10,
    unit: "%",
    status: "green",
    trend: "flat",
    note: "Social Sciences at 11.1% — above threshold",
    strategicPillar: "Financial Sustainability",
    fy: "2025-2026",
  },
  {
    id: "fin-revenue-target",
    label: "Tuition Revenue vs Target",
    value: null,
    target: null,
    unit: "BSD",
    status: "pending",
    note: "2026-2027 budget not yet submitted",
    strategicPillar: "Financial Sustainability",
    fy: "2026-2027",
  },
  {
    id: "fin-scholarship",
    label: "Scholarship Disbursement Rate",
    value: null,
    target: null,
    unit: "%",
    status: "pending",
    note: "Data pending from Bursar",
    strategicPillar: "Financial Sustainability",
    fy: "2026-2027",
  },
  // ── Academic Excellence ──────────────────────────────────────────────────
  {
    id: "acad-atrisk",
    label: "At-Risk Students",
    value: 21,
    target: 0,
    unit: "students",
    status: "red",
    trend: "up",
    note: "13 currently failing ≥1 course",
    strategicPillar: "Academic Excellence",
    fy: "2025-2026",
  },
  {
    id: "acad-honour-roll",
    label: "Honour Roll (GPA ≥ 3.5)",
    value: 8,
    target: 20,
    unit: "students",
    status: "red",
    trend: "down",
    note: "40% of target",
    strategicPillar: "Academic Excellence",
    fy: "2025-2026",
  },
  {
    id: "acad-grade-posting",
    label: "Grade Posting Compliance",
    value: 18,
    target: 18,
    unit: "sections awaiting",
    status: "amber",
    trend: "flat",
    note: "Finals Jun 22-26; 48-hr deadline Jun 24-28",
    strategicPillar: "Academic Excellence",
    fy: "2025-2026",
  },
  {
    id: "acad-retention",
    label: "Student Retention Rate",
    value: null,
    target: 85,
    unit: "%",
    status: "pending",
    note: "2026-2027 target set; baseline being established",
    strategicPillar: "Academic Excellence",
    fy: "2026-2027",
  },
  // ── Faculty & Operations ─────────────────────────────────────────────────
  {
    id: "fac-sections",
    label: "Active Course Sections",
    value: 18,
    target: 18,
    unit: "sections",
    status: "green",
    trend: "flat",
    strategicPillar: "Faculty & Operations",
    fy: "2025-2026",
  },
  {
    id: "fac-compliance",
    label: "Faculty Fully Compliant",
    value: 0,
    target: 11,
    unit: "faculty",
    status: "red",
    trend: "flat",
    note: "QA orientation & ack. forms still pending",
    strategicPillar: "Faculty & Operations",
    fy: "2025-2026",
  },
  {
    id: "fac-overload",
    label: "Overloaded Faculty",
    value: 3,
    target: 0,
    unit: "instructors",
    status: "amber",
    trend: "flat",
    note: "Wilmore, Thompson, Gilbert flagged",
    strategicPillar: "Faculty & Operations",
    fy: "2025-2026",
  },
  // ── Student Success ───────────────────────────────────────────────────────
  {
    id: "stu-bpharm",
    label: "Pre-Pharmacy Pipeline",
    value: 3,
    target: 10,
    unit: "students",
    status: "red",
    trend: "down",
    note: "Materially below target",
    strategicPillar: "Student Success",
    fy: "2025-2026",
  },
  {
    id: "stu-intervention",
    label: "At-Risk Interventions Logged",
    value: 0,
    target: 23,
    unit: "students",
    status: "red",
    trend: "flat",
    note: "Intervention columns blank",
    strategicPillar: "Student Success",
    fy: "2025-2026",
  },
  {
    id: "stu-graduation-2027",
    label: "Projected Graduates 2026-2027",
    value: null,
    target: null,
    unit: "students",
    status: "pending",
    note: "Pending programme mapping completion",
    strategicPillar: "Student Success",
    fy: "2026-2027",
  },
  // ── Institutional Compliance ──────────────────────────────────────────────
  {
    id: "comp-exam-readiness",
    label: "Exam Clearance Readiness",
    value: 0,
    target: 75,
    unit: "eligible students",
    status: "red",
    trend: "flat",
    note: "Finals Jun 22 — urgent",
    strategicPillar: "Institutional Compliance",
    fy: "2025-2026",
  },
  {
    id: "comp-accreditation",
    label: "Accreditation Readiness",
    value: null,
    target: null,
    unit: "score",
    status: "pending",
    note: "Self-study scheduled 2026-2027",
    strategicPillar: "Institutional Compliance",
    fy: "2026-2027",
  },
];

export const financeKPIs = kpiMatrix.filter(
  (k) =>
    k.strategicPillar === "Financial Sustainability" ||
    k.id === "fin-clearance" ||
    k.id === "comp-exam-readiness" ||
    k.id === "enr-total"
);

export function getStatusColor(status: KPIStatus) {
  switch (status) {
    case "green":
      return {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        badge: "bg-emerald-100 text-emerald-800",
        dot: "bg-emerald-500",
        label: "On Track",
      };
    case "amber":
      return {
        bg: "bg-amber-50",
        border: "border-amber-200",
        badge: "bg-amber-100 text-amber-800",
        dot: "bg-amber-500",
        label: "Attention",
      };
    case "red":
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        badge: "bg-red-100 text-red-800",
        dot: "bg-red-500",
        label: "Urgent",
      };
    case "pending":
      return {
        bg: "bg-slate-50",
        border: "border-slate-200",
        badge: "bg-slate-100 text-slate-600",
        dot: "bg-slate-400",
        label: "Pending",
      };
  }
}
