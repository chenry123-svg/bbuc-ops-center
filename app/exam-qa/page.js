'use client'

import { useState } from 'react'

const exams = [
  {
    id: 'acct295',
    course: 'ACCT 295 Final',
    faculty: 'Dr. Johnson',
    dueDate: 'Jun 20',
    blueprint: 82,
    qaScore: 87,
    status: 'Pending HOD',
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: 'chem010',
    course: 'CHEM 010 Final',
    faculty: 'Prof. Williams',
    dueDate: 'Jun 18',
    blueprint: 61,
    qaScore: 74,
    status: 'Needs Revision',
    statusColor: 'bg-red-100 text-red-800',
  },
  {
    id: 'nurs214',
    course: 'NURS 214 Midterm',
    faculty: 'Dr. Thompson',
    dueDate: 'Jun 22',
    blueprint: 88,
    qaScore: 78,
    status: 'Under Review',
    statusColor: 'bg-blue-100 text-blue-800',
  },
]

const governanceMetrics = [
  { metric: 'Exams Submitted', rate: 92, status: 'green' },
  { metric: 'Exams Moderated', rate: 84, status: 'green' },
  { metric: 'Exams Approved', rate: 78, status: 'yellow' },
  { metric: 'Blueprint Compliant', rate: 73, status: 'yellow' },
  { metric: 'Answer Keys Attached', rate: 100, status: 'green' },
  { metric: 'Ready for Printing', rate: 68, status: 'red' },
]

const questionBanks = [
  {
    course: 'ACCT 295 - Financial Accounting',
    total: 145,
    approved: 128,
    review: 17,
    difficulty: '0.62',
    discrimination: '0.41',
    lastReviewed: 'May 2025',
  },
  {
    course: 'CHEM 010 - General Chemistry',
    total: 203,
    approved: 187,
    review: 16,
    difficulty: '0.58',
    discrimination: '0.38',
    lastReviewed: 'Apr 2025',
  },
  {
    course: 'NURS 214 - Patient Care',
    total: 178,
    approved: 165,
    review: 13,
    difficulty: '0.71',
    discrimination: '0.45',
    lastReviewed: 'May 2025',
  },
]

function ProgressBar({ value, color }) {
  const colorClass =
    color === 'green'
      ? 'bg-green-500'
      : color === 'yellow'
      ? 'bg-yellow-400'
      : color === 'red'
      ? 'bg-red-500'
      : 'bg-blue-500'
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${colorClass}`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

function ScoreBadge({ score, thresholds }) {
  const color =
    score >= (thresholds?.green ?? 85)
      ? 'text-green-700 bg-green-100'
      : score >= (thresholds?.yellow ?? 75)
      ? 'text-yellow-700 bg-yellow-100'
      : 'text-red-700 bg-red-100'
  return (
    <span className={`px-2 py-1 rounded text-sm font-semibold ${color}`}>
      {score}%
    </span>
  )
}

export default function ExamQAPage() {
  const [selectedExam, setSelectedExam] = useState('acct295')
  const [activeTab, setActiveTab] = useState('paper')
  const [governanceExpanded, setGovernanceExpanded] = useState(false)
  const [reviewComment, setReviewComment] = useState('')

  const tabs = [
    { id: 'paper', label: 'Exam Paper' },
    { id: 'answerkey', label: 'Answer Key' },
    { id: 'blueprint', label: 'Blueprint' },
    { id: 'checklist', label: 'QA Checklist' },
    { id: 'reviewer', label: 'Reviewer / Approval' },
  ]

  const cloData = [
    { clo: 'CLO1', desc: 'Financial Statements', questions: '1,2', marks: 25, blooms: 'Apply', coverage: 90 },
    { clo: 'CLO2', desc: 'Accounting Principles', questions: '1', marks: 5, blooms: 'Remember', coverage: 45 },
    { clo: 'CLO3', desc: 'Transaction Analysis', questions: '3', marks: 15, blooms: 'Analyze', coverage: 88 },
    { clo: 'CLO4', desc: 'Asset Management', questions: '4', marks: 10, blooms: 'Apply', coverage: 75 },
    { clo: 'CLO5', desc: 'Financial Evaluation', questions: '5', marks: 25, blooms: 'Evaluate', coverage: 90 },
  ]

  const bloomsData = [
    { level: 'Remember', pct: 20 },
    { level: 'Understand', pct: 25 },
    { level: 'Apply', pct: 30 },
    { level: 'Analyze', pct: 15 },
    { level: 'Evaluate', pct: 10 },
    { level: 'Create', pct: 0 },
  ]

  const checklistItems = [
    { label: 'Cover page present', pass: true },
    { label: 'Clear instructions provided', pass: true },
    { label: 'Mark allocation shown for each question', pass: true },
    { label: 'Answer key attached', pass: true },
    { label: "Bloom's taxonomy alignment verified", pass: true },
    { label: 'Blueprint submitted', pass: true },
    { label: 'Faculty signature missing', pass: false },
  ]

  const moderationSteps = [
    { label: 'Faculty Submission', status: 'done' },
    { label: 'Peer Moderation', status: 'done' },
    { label: 'HOD Approval', status: 'pending' },
    { label: 'QA Approval', status: 'done' },
    { label: 'Secure Archive', status: 'notyet' },
  ]

  const riskItems = [
    { area: 'Formatting', level: 'Low', color: 'green' },
    { area: 'Blueprint Alignment', level: 'Medium', color: 'yellow' },
    { area: 'Outcome Coverage', level: 'High', color: 'red' },
    { area: 'Mark Allocation', level: 'Low', color: 'green' },
  ]

  const coverageColor = (pct) =>
    pct >= 80 ? 'text-green-700 bg-green-100' : pct >= 60 ? 'text-yellow-700 bg-yellow-100' : 'text-red-700 bg-red-100'

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-900 font-bold text-lg">BB</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Examination Quality Assurance System</h1>
              <p className="text-blue-200 text-sm">Bahamas Baptist University College</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* Section 1: Executive Dashboard */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Executive Dashboard</h2>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {[
              { label: 'Exams Submitted', value: '3', color: 'text-blue-700' },
              { label: 'Approved', value: '1', color: 'text-green-700' },
              { label: 'Returned', value: '1', color: 'text-red-700' },
              { label: 'Pending', value: '1', color: 'text-yellow-700' },
              { label: 'Avg Blueprint', value: '79%', color: 'text-yellow-700' },
              { label: 'Avg QA Score', value: '82%', color: 'text-green-700' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-lg shadow p-4 text-center">
                <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Exam Readiness Score */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Exam Readiness Score</h3>
                <span className="text-sm text-gray-500">ACCT 295 Final</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl font-bold text-blue-700">87%</div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Ready Pending HOD Approval
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'SOP Compliance', value: 100, color: 'green' },
                  { label: 'Blueprint Alignment', value: 82, color: 'yellow' },
                  { label: 'Outcome Coverage', value: 90, color: 'green' },
                  { label: 'Answer Key', value: 100, color: 'green' },
                  { label: 'Moderation Evidence', value: 60, color: 'red' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <ProgressBar value={item.value} color={item.color} />
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Alerts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Critical Alerts</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r">
                  <p className="font-semibold text-red-800 text-sm">CHEM 010 Final Exam</p>
                  <p className="text-red-700 text-sm mt-1">Blueprint Score 61%, Missing outcome mapping</p>
                </div>
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r">
                  <p className="font-semibold text-yellow-800 text-sm">NURS 214 Midterm</p>
                  <p className="text-yellow-700 text-sm mt-1">QA Score below 80%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Review Queue */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Review Queue</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {['Course', 'Faculty', 'Due Date', 'Blueprint %', 'QA Score', 'Status'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr
                    key={exam.id}
                    onClick={() => setSelectedExam(exam.id)}
                    className={`border-b cursor-pointer transition-colors ${
                      selectedExam === exam.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-blue-700">{exam.course}</td>
                    <td className="px-4 py-3 text-gray-600">{exam.faculty}</td>
                    <td className="px-4 py-3 text-gray-600">{exam.dueDate}</td>
                    <td className="px-4 py-3">
                      <ScoreBadge score={exam.blueprint} thresholds={{ green: 80, yellow: 65 }} />
                    </td>
                    <td className="px-4 py-3">
                      <ScoreBadge score={exam.qaScore} thresholds={{ green: 85, yellow: 75 }} />
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${exam.statusColor}`}>
                        {exam.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Review Workspace */}
        {selectedExam && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Review Workspace</h2>
            <div className="bg-white rounded-lg shadow">
              {/* Tabs */}
              <div className="border-b flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Tab 1: Exam Paper */}
                {activeTab === 'paper' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Course', value: 'ACCT 295 - Financial Accounting' },
                        { label: 'Faculty', value: 'Dr. Johnson' },
                        { label: 'Date', value: 'June 20, 2025' },
                        { label: 'Duration', value: '120 minutes' },
                        { label: 'Total Marks', value: '100' },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 rounded p-3">
                          <p className="text-xs text-gray-500">{item.label}</p>
                          <p className="font-semibold text-gray-800 text-sm mt-1">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Time-to-Complete Analysis</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm mb-2">
                        <div>
                          <span className="text-gray-600">Estimated Completion: </span>
                          <span className="font-semibold">135 min</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Exam Duration: </span>
                          <span className="font-semibold">120 min</span>
                        </div>
                      </div>
                      <p className="text-yellow-700 text-sm font-medium">
                        Warning: Estimated completion time exceeds exam duration by 15 minutes
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Sample Questions</h4>
                      <div className="space-y-3">
                        {[
                          { q: 1, text: 'Define the accounting equation and explain its components.', marks: 5, bloom: 'Remember' },
                          { q: 2, text: 'Prepare a balance sheet from the following trial balance...', marks: 20, bloom: 'Apply' },
                          { q: 3, text: 'Analyze the impact of the following transactions...', marks: 15, bloom: 'Analyze' },
                          { q: 4, text: 'Calculate the depreciation using straight-line method...', marks: 10, bloom: 'Apply' },
                          { q: 5, text: 'Evaluate the financial health of the company...', marks: 25, bloom: 'Evaluate' },
                        ].map((q) => (
                          <div key={q.q} className="flex gap-3 p-3 border rounded-lg">
                            <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                              {q.q}
                            </span>
                            <div className="flex-1">
                              <p className="text-sm text-gray-700">{q.text}</p>
                              <div className="flex gap-3 mt-1">
                                <span className="text-xs text-gray-500">{q.marks} marks</span>
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 rounded">{q.bloom}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Answer Key */}
                {activeTab === 'answerkey' && (
                  <div className="space-y-4">
                    <div className="bg-red-100 border border-red-400 text-red-800 text-center font-bold py-3 rounded-lg text-lg tracking-widest">
                      RESTRICTED — CONFIDENTIAL DOCUMENT
                    </div>
                    <div className="space-y-3">
                      {[
                        { q: 1, answer: 'Assets = Liabilities + Equity. Components: current/non-current assets, short/long-term liabilities, shareholders equity.' },
                        { q: 2, answer: 'Balance sheet showing total assets of $450,000 balanced against liabilities of $180,000 and equity of $270,000.' },
                        { q: 3, answer: 'Debit/credit impact analysis for 5 transactions; affects at least 3 financial statement line items.' },
                        { q: 4, answer: '(Cost - Salvage Value) / Useful Life = ($50,000 - $5,000) / 10 = $4,500 per year.' },
                        { q: 5, answer: 'Ratio analysis including liquidity, solvency, and profitability ratios with narrative interpretation.' },
                      ].map((item) => (
                        <div key={item.q} className="p-4 border rounded-lg bg-gray-50">
                          <p className="font-semibold text-gray-700 text-sm mb-1">Question {item.q} — Model Answer</p>
                          <p className="text-sm text-gray-600">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Blueprint */}
                {activeTab === 'blueprint' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Outcome Coverage Heat Map</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              {['CLO', 'Description', 'Questions', 'Marks', "Bloom's", 'Coverage %'].map((h) => (
                                <th key={h} className="border px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {cloData.map((row) => (
                              <tr key={row.clo} className="border-b">
                                <td className="border px-3 py-2 font-medium">{row.clo}</td>
                                <td className="border px-3 py-2">{row.desc}</td>
                                <td className="border px-3 py-2">{row.questions}</td>
                                <td className="border px-3 py-2">{row.marks}</td>
                                <td className="border px-3 py-2">{row.blooms}</td>
                                <td className="border px-3 py-2">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${coverageColor(row.coverage)}`}>
                                    {row.coverage}%
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Bloom's Taxonomy Distribution</h4>
                      <div className="space-y-2">
                        {bloomsData.map((b) => (
                          <div key={b.level} className="flex items-center gap-3">
                            <span className="w-24 text-sm text-gray-600 text-right">{b.level}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-5 relative">
                              <div
                                className="h-5 rounded-full bg-blue-500 flex items-center justify-end pr-2"
                                style={{ width: `${b.pct}%` }}
                              >
                                {b.pct > 0 && <span className="text-white text-xs font-semibold">{b.pct}%</span>}
                              </div>
                              {b.pct === 0 && <span className="absolute left-2 top-0 h-5 flex items-center text-gray-400 text-xs">0%</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                        <p className="text-yellow-800 text-sm">
                          Warning: Higher-order thinking questions (Analyze + Evaluate + Create) = 25%. Recommended minimum is 30%.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: QA Checklist */}
                {activeTab === 'checklist' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {checklistItems.map((item) => (
                        <div key={item.label} className={`flex items-center gap-3 p-3 rounded-lg border ${item.pass ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                          <span className={`text-xl ${item.pass ? 'text-green-600' : 'text-red-600'}`}>
                            {item.pass ? '✓' : '✗'}
                          </span>
                          <span className={`text-sm ${item.pass ? 'text-green-800' : 'text-red-800'}`}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <p className="text-blue-800 font-semibold text-lg">QA Score: 86%</p>
                      <p className="text-blue-600 text-sm">6/7 items passed</p>
                    </div>
                  </div>
                )}

                {/* Tab 5: Reviewer / Approval */}
                {activeTab === 'reviewer' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Moderation Evidence Tracker</h4>
                      <div className="flex flex-wrap gap-3">
                        {moderationSteps.map((step) => (
                          <div
                            key={step.label}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                              step.status === 'done'
                                ? 'bg-green-100 text-green-800'
                                : step.status === 'pending'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            <span>
                              {step.status === 'done' ? '✓' : step.status === 'pending' ? '!' : '○'}
                            </span>
                            {step.label}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Risk Scoring</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        {riskItems.map((r) => (
                          <div key={r.area} className="text-center p-3 border rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">{r.area}</p>
                            <span
                              className={`text-sm font-semibold px-2 py-1 rounded ${
                                r.color === 'green'
                                  ? 'bg-green-100 text-green-800'
                                  : r.color === 'yellow'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {r.level}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-center">
                        <span className="text-yellow-800 font-semibold">Overall Risk: Moderate Risk</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Review Comments</h4>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows={4}
                        placeholder="Enter review comments..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Approve
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Return for Revision
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Request HOD Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Question Bank */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Question Bank</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {questionBanks.map((bank) => (
              <div key={bank.course} className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-gray-800 mb-4 text-sm">{bank.course}</h3>
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-2xl font-bold text-gray-800">{bank.total}</p>
                    <p className="text-xs text-gray-500">Total Items</p>
                  </div>
                  <div className="bg-green-50 rounded p-2">
                    <p className="text-2xl font-bold text-green-700">{bank.approved}</p>
                    <p className="text-xs text-gray-500">Approved</p>
                  </div>
                  <div className="bg-yellow-50 rounded p-2">
                    <p className="text-2xl font-bold text-yellow-700">{bank.review}</p>
                    <p className="text-xs text-gray-500">Needs Review</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Avg Difficulty:</span>
                    <span className="font-medium">{bank.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Discrimination:</span>
                    <span className="font-medium">{bank.discrimination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Reviewed:</span>
                    <span className="font-medium">{bank.lastReviewed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Governance Dashboard */}
        <section>
          <div className="bg-white rounded-lg shadow">
            <button
              onClick={() => setGovernanceExpanded(!governanceExpanded)}
              className="w-full flex justify-between items-center px-6 py-4 font-bold text-gray-800 text-left"
            >
              <span>Governance Dashboard</span>
              <span className="text-gray-400 text-xl">{governanceExpanded ? '▲' : '▼'}</span>
            </button>

            {governanceExpanded && (
              <div className="px-6 pb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-semibold text-gray-600">Metric</th>
                      <th className="py-2 text-left font-semibold text-gray-600">Rate</th>
                      <th className="py-2 text-left font-semibold text-gray-600 w-48">Progress</th>
                      <th className="py-2 text-left font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {governanceMetrics.map((row) => (
                      <tr key={row.metric} className="border-b">
                        <td className="py-3 text-gray-700">{row.metric}</td>
                        <td className="py-3 font-semibold">{row.rate}%</td>
                        <td className="py-3 pr-4">
                          <ProgressBar value={row.rate} color={row.status} />
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              row.status === 'green'
                                ? 'bg-green-100 text-green-800'
                                : row.status === 'yellow'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {row.status === 'green' ? 'On Track' : row.status === 'yellow' ? 'Attention' : 'Critical'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
