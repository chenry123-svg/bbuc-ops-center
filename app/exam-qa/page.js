'use client'
import { useState } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const EXAMS = [
  {
    id: 1,
    course: 'ACCT 295',
    title: 'Final Exam',
    faculty: 'Dr. Johnson',
    due: 'Jun 20',
    blueprint: 82,
    qaScore: 87,
    status: 'pending-hod',
    duration: 120,
    estimatedTime: 115,
    totalMarks: 100,
    readiness: {
      overall: 87,
      sopCompliance: 100,
      blueprintAlignment: 82,
      outcomeCoverage: 90,
      answerKey: 100,
      moderationEvidence: 60,
    },
    moderation: {
      facultySubmission: true,
      peerModeration: true,
      hodApproval: false,
      qaApproval: true,
      secureArchive: false,
    },
    sop: {
      coverPage: true,
      clearInstructions: true,
      markAllocation: true,
      answerKey: true,
      bloomsAlignment: true,
      blueprintSubmitted: true,
      facultySignature: false,
    },
    clos: [
      { id: 'CLO 1', questions: 8, marks: 24, bloom: 'Apply', coverage: 100 },
      { id: 'CLO 2', questions: 6, marks: 18, bloom: 'Understand', coverage: 90 },
      { id: 'CLO 3', questions: 4, marks: 12, bloom: 'Analyze', coverage: 75 },
      { id: 'CLO 4', questions: 2, marks: 6, bloom: 'Remember', coverage: 50 },
    ],
    blooms: { Remember: 20, Understand: 25, Apply: 30, Analyze: 15, Evaluate: 10, Create: 0 },
    risk: { Formatting: 'Low', 'Blueprint Alignment': 'Medium', 'Outcome Coverage': 'Low', 'Mark Allocation': 'Low' },
    questions: [
      { no: 1, text: 'Define the accounting equation and explain its components.', answer: 'Assets = Liabilities + Equity', marks: 5 },
      { no: 2, text: 'Calculate net income given revenue of $50,000 and expenses of $32,000.', answer: '$18,000', marks: 5 },
      { no: 3, text: 'Prepare a trial balance from the following ledger accounts.', answer: 'See marking rubric', marks: 15 },
    ],
  },
  {
    id: 2,
    course: 'CHEM 010',
    title: 'Final Exam',
    faculty: 'Prof. Williams',
    due: 'Jun 18',
    blueprint: 61,
    qaScore: 74,
    status: 'needs-revision',
    duration: 120,
    estimatedTime: 140,
    totalMarks: 100,
    readiness: {
      overall: 61,
      sopCompliance: 70,
      blueprintAlignment: 61,
      outcomeCoverage: 45,
      answerKey: 80,
      moderationEvidence: 40,
    },
    moderation: {
      facultySubmission: true,
      peerModeration: false,
      hodApproval: false,
      qaApproval: false,
      secureArchive: false,
    },
    sop: {
      coverPage: true,
      clearInstructions: false,
      markAllocation: true,
      answerKey: false,
      bloomsAlignment: false,
      blueprintSubmitted: true,
      facultySignature: true,
    },
    clos: [
      { id: 'CLO 1', questions: 10, marks: 30, bloom: 'Remember', coverage: 100 },
      { id: 'CLO 2', questions: 5, marks: 15, bloom: 'Understand', coverage: 60 },
      { id: 'CLO 3', questions: 2, marks: 6, bloom: 'Apply', coverage: 25 },
      { id: 'CLO 4', questions: 0, marks: 0, bloom: 'Analyze', coverage: 0 },
    ],
    blooms: { Remember: 45, Understand: 30, Apply: 15, Analyze: 10, Evaluate: 0, Create: 0 },
    risk: { Formatting: 'Low', 'Blueprint Alignment': 'High', 'Outcome Coverage': 'High', 'Mark Allocation': 'Medium' },
    questions: [
      { no: 1, text: 'State the periodic law.', answer: 'Properties of elements repeat periodically when arranged by atomic number.', marks: 3 },
      { no: 2, text: 'What is the atomic number of Carbon?', answer: '6', marks: 2 },
    ],
  },
  {
    id: 3,
    course: 'NURS 214',
    title: 'Midterm Exam',
    faculty: 'Dr. Thompson',
    due: 'Jun 22',
    blueprint: 88,
    qaScore: 78,
    status: 'under-review',
    duration: 90,
    estimatedTime: 95,
    totalMarks: 80,
    readiness: {
      overall: 78,
      sopCompliance: 90,
      blueprintAlignment: 88,
      outcomeCoverage: 80,
      answerKey: 100,
      moderationEvidence: 50,
    },
    moderation: {
      facultySubmission: true,
      peerModeration: true,
      hodApproval: false,
      qaApproval: false,
      secureArchive: false,
    },
    sop: {
      coverPage: true,
      clearInstructions: true,
      markAllocation: true,
      answerKey: true,
      bloomsAlignment: false,
      blueprintSubmitted: true,
      facultySignature: true,
    },
    clos: [
      { id: 'CLO 1', questions: 10, marks: 20, bloom: 'Apply', coverage: 95 },
      { id: 'CLO 2', questions: 8, marks: 16, bloom: 'Analyze', coverage: 85 },
      { id: 'CLO 3', questions: 6, marks: 12, bloom: 'Understand', coverage: 70 },
      { id: 'CLO 4', questions: 4, marks: 8, bloom: 'Evaluate', coverage: 60 },
    ],
    blooms: { Remember: 15, Understand: 20, Apply: 35, Analyze: 20, Evaluate: 10, Create: 0 },
    risk: { Formatting: 'Low', 'Blueprint Alignment': 'Low', 'Outcome Coverage': 'Medium', 'Mark Allocation': 'Low' },
    questions: [
      { no: 1, text: 'Describe the nursing process and its five phases.', answer: 'Assessment, Diagnosis, Planning, Implementation, Evaluation', marks: 10 },
      { no: 2, text: 'A patient presents with BP 180/110. What is your priority nursing action?', answer: 'See marking rubric', marks: 15 },
    ],
  },
]

const QUESTION_BANK = [
  { course: 'CHEM 010', total: 70, approved: 62, needsReview: 8, avgDifficulty: 0.64, avgDiscrimination: 0.42, lastReviewed: 'Jun 2026' },
  { course: 'ACCT 295', total: 95, approved: 90, needsReview: 5, avgDifficulty: 0.58, avgDiscrimination: 0.51, lastReviewed: 'May 2026' },
  { course: 'NURS 214', total: 120, approved: 108, needsReview: 12, avgDifficulty: 0.71, avgDiscrimination: 0.38, lastReviewed: 'Jun 2026' },
]

const GOVERNANCE = [
  { label: 'Exams Submitted', value: 92 },
  { label: 'Exams Moderated', value: 84 },
  { label: 'Exams Approved', value: 78 },
  { label: 'Blueprint Compliant', value: 73 },
  { label: 'Answer Keys Attached', value: 100 },
  { label: 'Ready for Printing', value: 68 },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function statusBadge(status) {
  const map = {
    'pending-hod': { label: '🟡 Pending HOD', cls: 'bg-yellow-100 text-yellow-800' },
    'needs-revision': { label: '🔴 Needs Revision', cls: 'bg-red-100 text-red-800' },
    'under-review': { label: '🟡 Under Review', cls: 'bg-yellow-100 text-yellow-800' },
    approved: { label: '🟢 Approved', cls: 'bg-green-100 text-green-800' },
  }
  const s = map[status] || { label: status, cls: 'bg-gray-100 text-gray-700' }
  return <span className={`px-2 py-0.5 rounded text-xs font-semibold ${s.cls}`}>{s.label}</span>
}

function scoreColor(v) {
  if (v >= 85) return 'text-green-600'
  if (v >= 75) return 'text-yellow-600'
  return 'text-red-600'
}

function coverageColor(v) {
  if (v >= 80) return 'bg-green-100 text-green-800'
  if (v >= 50) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

function riskColor(r) {
  if (r === 'Low') return 'bg-green-100 text-green-700'
  if (r === 'Medium') return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-800'
}

function overallRisk(exam) {
  const vals = Object.values(exam.risk)
  if (vals.includes('High')) return { label: '🔴 High Risk', cls: 'bg-red-50 border-red-300 text-red-700' }
  if (vals.includes('Medium')) return { label: '🟡 Moderate Risk', cls: 'bg-yellow-50 border-yellow-300 text-yellow-700' }
  return { label: '🟢 Low Risk', cls: 'bg-green-50 border-green-300 text-green-700' }
}

function ProgressBar({ value, colorClass }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className={`h-2 rounded-full ${colorClass}`} style={{ width: `${value}%` }} />
    </div>
  )
}

function SopRow({ label, ok }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-700">{label}</span>
      {ok
        ? <span className="text-green-600 font-bold text-lg">✓</span>
        : <span className="text-red-500 font-bold text-lg">✗</span>}
    </div>
  )
}

function ModerationRow({ label, done }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${done ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
        {done ? '✓' : '✗'}
      </span>
      <span className={`text-sm ${done ? 'text-gray-800' : 'text-gray-400'}`}>{label}</span>
    </div>
  )
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

function TabExamPaper({ exam }) {
  const overtime = exam.estimatedTime > exam.duration
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['Course', exam.course],
          ['Faculty', exam.faculty],
          ['Total Marks', exam.totalMarks],
          ['Duration', `${exam.duration} min`],
        ].map(([k, v]) => (
          <div key={k} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{k}</p>
            <p className="font-semibold text-gray-800 mt-0.5">{v}</p>
          </div>
        ))}
      </div>

      <div className={`rounded-lg border p-4 ${overtime ? 'border-orange-300 bg-orange-50' : 'border-green-300 bg-green-50'}`}>
        <h3 className="font-semibold text-gray-800 mb-3">⏱ Time-to-Complete Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Estimated Completion</span>
            <p className={`font-bold text-lg ${overtime ? 'text-orange-600' : 'text-green-600'}`}>{exam.estimatedTime} min</p>
          </div>
          <div>
            <span className="text-gray-500">Exam Duration</span>
            <p className="font-bold text-lg text-gray-800">{exam.duration} min</p>
          </div>
        </div>
        {overtime && (
          <p className="mt-2 text-orange-700 text-sm font-medium">⚠️ Exam may be too long — estimated time exceeds allocated duration by {exam.estimatedTime - exam.duration} min.</p>
        )}
        {!overtime && (
          <p className="mt-2 text-green-700 text-sm">✓ Timing is within acceptable range.</p>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Questions Preview</h3>
        <div className="space-y-3">
          {exam.questions.map(q => (
            <div key={q.no} className="bg-gray-50 rounded-lg p-3 text-sm">
              <span className="font-semibold text-navy-800">Q{q.no}.</span>{' '}
              <span className="text-gray-800">{q.text}</span>
              <span className="ml-2 text-xs text-gray-500">({q.marks} marks)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabAnswerKey({ exam }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
        <span className="text-lg">🔒</span>
        <span>Answer key access is restricted. Only QA Officers and designated reviewers may view full answers.</span>
      </div>
      <div className="space-y-3">
        {exam.questions.map(q => (
          <div key={q.no} className="bg-white border border-gray-200 rounded-lg p-4 text-sm">
            <p className="font-semibold text-gray-700 mb-1">Q{q.no}. {q.text}</p>
            <p className="text-green-700"><span className="font-medium">Model Answer: </span>{q.answer}</p>
            <p className="text-gray-400 text-xs mt-1">{q.marks} marks</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabBlueprint({ exam }) {
  const higherOrder = (exam.blooms.Analyze || 0) + (exam.blooms.Evaluate || 0) + (exam.blooms.Create || 0)
  const bloomColors = {
    Remember: 'bg-blue-400', Understand: 'bg-blue-500', Apply: 'bg-green-500',
    Analyze: 'bg-purple-500', Evaluate: 'bg-orange-500', Create: 'bg-red-500',
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Outcome Coverage Heat Map</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {['Outcome', 'Questions', 'Marks', "Bloom's Level", 'Coverage'].map(h => (
                  <th key={h} className="text-left p-3 font-semibold text-gray-600 border-b">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exam.clos.map(c => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{c.id}</td>
                  <td className="p-3 text-gray-700">{c.questions}</td>
                  <td className="p-3 text-gray-700">{c.marks}</td>
                  <td className="p-3 text-gray-700">{c.bloom}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${coverageColor(c.coverage)}`}>{c.coverage}%</span>
                      <div className="flex-1 max-w-24">
                        <ProgressBar value={c.coverage} colorClass={c.coverage >= 80 ? 'bg-green-500' : c.coverage >= 50 ? 'bg-yellow-400' : 'bg-red-500'} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-1">Bloom's Taxonomy Distribution</h3>
        {higherOrder < 30 && (
          <p className="text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded p-2 mb-3">
            ⚠️ Final exams should contain at least 30% higher-order questions (Analyze + Evaluate + Create). Current: {higherOrder}%
          </p>
        )}
        <div className="space-y-2">
          {Object.entries(exam.blooms).map(([level, pct]) => (
            <div key={level} className="flex items-center gap-3 text-sm">
              <span className="w-24 text-gray-600 shrink-0">{level}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-5 relative">
                <div className={`h-5 rounded-full ${bloomColors[level]} transition-all`} style={{ width: `${pct}%` }} />
                {pct > 0 && <span className="absolute inset-0 flex items-center px-2 text-white text-xs font-bold">{pct}%</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabQAChecklist({ exam }) {
  const checks = [
    ['Cover page present', exam.sop.coverPage],
    ['Clear instructions provided', exam.sop.clearInstructions],
    ['Mark allocation shown per question', exam.sop.markAllocation],
    ['Answer key attached', exam.sop.answerKey],
    ["Bloom's taxonomy alignment verified", exam.sop.bloomsAlignment],
    ['Blueprint submitted with exam', exam.sop.blueprintSubmitted],
    ['Faculty signature / declaration', exam.sop.facultySignature],
  ]
  const passed = checks.filter(([, v]) => v).length
  const score = Math.round((passed / checks.length) * 100)
  return (
    <div className="space-y-4">
      <div className={`rounded-lg border p-4 ${score >= 85 ? 'border-green-300 bg-green-50' : score >= 70 ? 'border-yellow-300 bg-yellow-50' : 'border-red-300 bg-red-50'}`}>
        <p className="text-sm text-gray-600">SOP Compliance Score</p>
        <p className={`text-3xl font-bold ${scoreColor(score)}`}>{score}%</p>
        <p className="text-sm text-gray-500">{passed} of {checks.length} checks passed</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        {checks.map(([label, ok]) => <SopRow key={label} label={label} ok={ok} />)}
      </div>
    </div>
  )
}

function TabReviewer({ exam }) {
  const [comment, setComment] = useState('')
  const risk = overallRisk(exam)
  const modItems = [
    ['Faculty Submission', exam.moderation.facultySubmission],
    ['Peer Moderation', exam.moderation.peerModeration],
    ['HOD Approval', exam.moderation.hodApproval],
    ['QA Approval', exam.moderation.qaApproval],
    ['Secure Archive', exam.moderation.secureArchive],
  ]
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Moderation Evidence Tracker</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            {modItems.map(([label, done]) => <ModerationRow key={label} label={label} done={done} />)}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Risk Assessment</h3>
          <div className="space-y-2 mb-3">
            {Object.entries(exam.risk).map(([area, level]) => (
              <div key={area} className="flex items-center justify-between text-sm bg-white border border-gray-100 rounded p-2">
                <span className="text-gray-700">{area}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${riskColor(level)}`}>{level}</span>
              </div>
            ))}
          </div>
          <div className={`rounded-lg border p-3 font-semibold text-sm ${risk.cls}`}>{risk.label}</div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Reviewer Comments</h3>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={4}
          placeholder="Enter review comments, feedback, or conditions for approval..."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
          ✓ Approve Exam
        </button>
        <button className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
          ↩ Return for Revision
        </button>
        <button className="px-5 py-2 bg-yellow-500 text-white rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors">
          📋 Request HOD Review
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ExamQAPage() {
  const [selectedExam, setSelectedExam] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [govOpen, setGovOpen] = useState(false)

  const exam = selectedExam !== null ? EXAMS.find(e => e.id === selectedExam) : null

  const tabs = ['Exam Paper', 'Answer Key', 'Blueprint', 'QA Checklist', 'Reviewer / Approval']

  const alerts = EXAMS.filter(e => e.blueprint < 70 || e.qaScore < 80)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1a2e5a] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">BBUC Ops Center</h1>
            <p className="text-blue-200 text-xs mt-0.5">Examination Quality Assurance System</p>
          </div>
          <div className="text-right text-sm text-blue-200">
            <p>Bahamas Baptist University College</p>
            <p className="text-xs">Academic Year 2025–2026</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── Section 1: Executive Dashboard ── */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Executive Dashboard</h2>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            {[
              { label: 'Submitted', value: 3, color: 'text-blue-600' },
              { label: 'Approved', value: 1, color: 'text-green-600' },
              { label: 'Returned', value: 1, color: 'text-red-600' },
              { label: 'Pending', value: 1, color: 'text-yellow-600' },
              { label: 'Avg Blueprint', value: '79%', color: 'text-purple-600' },
              { label: 'Avg QA Score', value: '80%', color: 'text-indigo-600' },
            ].map(k => (
              <div key={k.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
                <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                <p className="text-xs text-gray-500 mt-1">{k.label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Exam Readiness */}
            {exam && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{exam.course} – {exam.title}</h3>
                    <p className="text-xs text-gray-500">Exam Readiness Score</p>
                  </div>
                  <span className={`text-3xl font-bold ${scoreColor(exam.readiness.overall)}`}>{exam.readiness.overall}%</span>
                </div>
                <div className="space-y-2">
                  {[
                    ['SOP Compliance', exam.readiness.sopCompliance],
                    ['Blueprint Alignment', exam.readiness.blueprintAlignment],
                    ['Outcome Coverage', exam.readiness.outcomeCoverage],
                    ['Answer Key', exam.readiness.answerKey],
                    ['Moderation Evidence', exam.readiness.moderationEvidence],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-center gap-2 text-sm">
                      <span className="w-40 text-gray-600 shrink-0">{label}</span>
                      <ProgressBar value={val} colorClass={val >= 80 ? 'bg-green-500' : val >= 60 ? 'bg-yellow-400' : 'bg-red-500'} />
                      <span className={`w-10 text-right font-semibold text-xs ${scoreColor(val)}`}>{val}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-sm font-medium text-yellow-700 bg-yellow-50 rounded p-2">
                  🟡 Ready Pending HOD Approval
                </div>
              </div>
            )}
            {!exam && (
              <div className="bg-white rounded-xl shadow-sm border border-dashed border-gray-300 p-5 flex items-center justify-center text-gray-400 text-sm">
                Select an exam from the Review Queue to see its Readiness Score
              </div>
            )}

            {/* Critical Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-3">Critical Alerts</h3>
              {alerts.length === 0 && <p className="text-sm text-green-600">✓ No critical alerts at this time.</p>}
              <div className="space-y-3">
                {EXAMS.filter(e => e.blueprint < 65).map(e => (
                  <div key={e.id} className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
                    <span className="text-lg shrink-0">🔴</span>
                    <div>
                      <p className="font-semibold text-red-800">{e.course} {e.title}</p>
                      <p className="text-red-700">Blueprint Score {e.blueprint}% · Missing outcome mapping</p>
                    </div>
                  </div>
                ))}
                {EXAMS.filter(e => e.qaScore < 80 && e.blueprint >= 65).map(e => (
                  <div key={e.id} className="flex gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                    <span className="text-lg shrink-0">🟡</span>
                    <div>
                      <p className="font-semibold text-yellow-800">{e.course} {e.title}</p>
                      <p className="text-yellow-700">QA Score {e.qaScore}% — below 80% threshold</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Review Queue ── */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Review Queue</h2>
            <span className="text-xs text-gray-500">Click a row to open the Review Workspace</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {['Course', 'Faculty', 'Due Date', 'Blueprint %', 'QA Score', 'Status', ''].map(h => (
                    <th key={h} className="px-4 py-3 font-semibold text-gray-600 border-b">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EXAMS.map(e => (
                  <tr
                    key={e.id}
                    onClick={() => { setSelectedExam(e.id); setActiveTab(0) }}
                    className={`border-b border-gray-50 cursor-pointer transition-colors ${selectedExam === e.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-800">{e.course}</p>
                      <p className="text-xs text-gray-500">{e.title}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{e.faculty}</td>
                    <td className="px-4 py-3 text-gray-700">{e.due}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${scoreColor(e.blueprint)}`}>{e.blueprint}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${scoreColor(e.qaScore)}`}>{e.qaScore}%</span>
                    </td>
                    <td className="px-4 py-3">{statusBadge(e.status)}</td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 text-xs font-medium hover:underline">Review →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 3: Review Workspace ── */}
        {exam && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-[#1a2e5a] text-white">
              <h2 className="text-lg font-semibold">Review Workspace — {exam.course}: {exam.title}</h2>
              <p className="text-blue-200 text-xs mt-0.5">{exam.faculty} · Due {exam.due}</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === i ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 0 && <TabExamPaper exam={exam} />}
              {activeTab === 1 && <TabAnswerKey exam={exam} />}
              {activeTab === 2 && <TabBlueprint exam={exam} />}
              {activeTab === 3 && <TabQAChecklist exam={exam} />}
              {activeTab === 4 && <TabReviewer exam={exam} />}
            </div>
          </section>
        )}

        {/* ── Section 4: Question Bank ── */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Question Bank</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {QUESTION_BANK.map(qb => (
              <div key={qb.course} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">{qb.course}</h3>
                  <span className="text-xs text-gray-500">Last reviewed {qb.lastReviewed}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-gray-500 text-xs">Total Items</p>
                    <p className="font-bold text-gray-800">{qb.total}</p>
                  </div>
                  <div className="bg-green-50 rounded p-2">
                    <p className="text-gray-500 text-xs">Approved</p>
                    <p className="font-bold text-green-700">{qb.approved}</p>
                  </div>
                  <div className="bg-yellow-50 rounded p-2">
                    <p className="text-gray-500 text-xs">Needs Review</p>
                    <p className="font-bold text-yellow-700">{qb.needsReview}</p>
                  </div>
                  <div className="bg-blue-50 rounded p-2">
                    <p className="text-gray-500 text-xs">Avg Difficulty</p>
                    <p className="font-bold text-blue-700">{qb.avgDifficulty}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>Avg Discrimination: <strong className="text-gray-700">{qb.avgDiscrimination}</strong></span>
                  <button className="text-blue-600 hover:underline">View Bank →</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5: Governance Dashboard ── */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setGovOpen(o => !o)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Examination Governance Dashboard</h2>
              <p className="text-xs text-gray-500 mt-0.5">Institution-wide oversight — for President &amp; Dean</p>
            </div>
            <span className="text-gray-400 text-xl">{govOpen ? '▲' : '▼'}</span>
          </button>

          {govOpen && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="mt-4 space-y-3">
                {GOVERNANCE.map(g => (
                  <div key={g.label} className="flex items-center gap-4 text-sm">
                    <span className="w-48 text-gray-700 shrink-0">{g.label}</span>
                    <div className="flex-1">
                      <ProgressBar value={g.value} colorClass={g.value >= 85 ? 'bg-green-500' : g.value >= 70 ? 'bg-yellow-400' : 'bg-red-500'} />
                    </div>
                    <span className={`w-10 text-right font-bold text-sm ${scoreColor(g.value)}`}>{g.value}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'Exams Ready for Printing', value: '68%', color: 'text-orange-600' },
                  { label: 'Pending HOD Sign-off', value: '3', color: 'text-yellow-600' },
                  { label: 'Overdue Submissions', value: '0', color: 'text-green-600' },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

      </main>

      <footer className="mt-8 py-4 text-center text-xs text-gray-400 border-t border-gray-200">
        BBUC Ops Center · Examination Quality Assurance · © 2026 Bahamas Baptist University College
      </footer>
    </div>
  )
}
