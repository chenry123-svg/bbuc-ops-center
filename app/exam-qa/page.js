'use client'
import { useState } from 'react'

export default function ExamQAPage() {
  const [selectedExam, setSelectedExam] = useState('acct295')
  const [activeTab, setActiveTab] = useState('paper')
  const [governanceExpanded, setGovernanceExpanded] = useState(false)
  const [reviewComment, setReviewComment] = useState('')

  const exams = [
    { id: 'acct295', course: 'ACCT 295 Final', faculty: 'Dr. Johnson', due: 'Jun 20', blueprint: 82, qa: 87, status: 'Pending HOD', statusColor: 'bg-yellow-100 text-yellow-800' },
    { id: 'chem010', course: 'CHEM 010 Final', faculty: 'Prof. Williams', due: 'Jun 18', blueprint: 61, qa: 74, status: 'Needs Revision', statusColor: 'bg-red-100 text-red-800' },
    { id: 'nurs214', course: 'NURS 214 Midterm', faculty: 'Dr. Thompson', due: 'Jun 22', blueprint: 88, qa: 78, status: 'Under Review', statusColor: 'bg-blue-100 text-blue-800' },
  ]

  const kpis = [
    { label: 'Exams Submitted', value: '3', color: 'text-blue-700' },
    { label: 'Approved', value: '1', color: 'text-green-700' },
    { label: 'Returned', value: '1', color: 'text-red-700' },
    { label: 'Pending', value: '1', color: 'text-yellow-700' },
    { label: 'Avg Blueprint', value: '79%', color: 'text-yellow-700' },
    { label: 'Avg QA Score', value: '82%', color: 'text-green-700' },
  ]

  const readinessScores = [
    { label: 'SOP Compliance', value: 100, color: 'bg-green-500' },
    { label: 'Blueprint Alignment', value: 82, color: 'bg-yellow-500' },
    { label: 'Outcome Coverage', value: 90, color: 'bg-green-500' },
    { label: 'Answer Key', value: 100, color: 'bg-green-500' },
    { label: 'Moderation Evidence', value: 60, color: 'bg-red-500' },
  ]

  const qaChecklist = [
    { item: 'Cover page present', pass: true },
    { item: 'Clear instructions provided', pass: true },
    { item: 'Mark allocation shown for each question', pass: true },
    { item: 'Answer key attached', pass: true },
    { item: "Bloom's taxonomy alignment verified", pass: true },
    { item: 'Blueprint submitted', pass: true },
    { item: 'Faculty signature missing', pass: false },
  ]

  const moderationSteps = [
    { label: 'Faculty Submission', status: 'done' },
    { label: 'Peer Moderation', status: 'done' },
    { label: 'HOD Approval', status: 'pending' },
    { label: 'QA Approval', status: 'done' },
    { label: 'Secure Archive', status: 'not-yet' },
  ]

  const risks = [
    { area: 'Formatting', level: 'Low', color: 'text-green-700 bg-green-100' },
    { area: 'Blueprint Alignment', level: 'Medium', color: 'text-yellow-700 bg-yellow-100' },
    { area: 'Outcome Coverage', level: 'High', color: 'text-red-700 bg-red-100' },
    { area: 'Mark Allocation', level: 'Low', color: 'text-green-700 bg-green-100' },
  ]

  const clos = [
    { clo: 'CLO1', desc: 'Financial Statements', questions: '1,2', marks: 25, blooms: 'Apply', coverage: 90, color: 'bg-green-500' },
    { clo: 'CLO2', desc: 'Accounting Principles', questions: '1', marks: 5, blooms: 'Remember', coverage: 45, color: 'bg-red-500' },
    { clo: 'CLO3', desc: 'Transaction Analysis', questions: '3', marks: 15, blooms: 'Analyze', coverage: 88, color: 'bg-green-500' },
    { clo: 'CLO4', desc: 'Asset Management', questions: '4', marks: 10, blooms: 'Apply', coverage: 75, color: 'bg-yellow-500' },
    { clo: 'CLO5', desc: 'Financial Evaluation', questions: '5', marks: 25, blooms: 'Evaluate', coverage: 90, color: 'bg-green-500' },
  ]

  const bloomsData = [
    { level: 'Remember', pct: 20 },
    { level: 'Understand', pct: 25 },
    { level: 'Apply', pct: 30 },
    { level: 'Analyze', pct: 15 },
    { level: 'Evaluate', pct: 10 },
    { level: 'Create', pct: 0 },
  ]

  const questionBank = [
    { course: 'ACCT 295', name: 'Financial Accounting', total: 145, approved: 128, review: 17, difficulty: 0.62, discrimination: 0.41, lastReviewed: 'May 2025' },
    { course: 'CHEM 010', name: 'General Chemistry', total: 203, approved: 187, review: 16, difficulty: 0.58, discrimination: 0.38, lastReviewed: 'Apr 2025' },
    { course: 'NURS 214', name: 'Patient Care', total: 178, approved: 165, review: 13, difficulty: 0.71, discrimination: 0.45, lastReviewed: 'May 2025' },
  ]

  const govMetrics = [
    { metric: 'Exams Submitted', rate: 92, status: 'green' },
    { metric: 'Exams Moderated', rate: 84, status: 'green' },
    { metric: 'Exams Approved', rate: 78, status: 'yellow' },
    { metric: 'Blueprint Compliant', rate: 73, status: 'yellow' },
    { metric: 'Answer Keys Attached', rate: 100, status: 'green' },
    { metric: 'Ready for Printing', rate: 68, status: 'red' },
  ]

  const statusDotColor = (s) => s === 'done' ? 'bg-green-500' : s === 'pending' ? 'bg-red-500' : 'bg-gray-300'
  const statusText = (s) => s === 'done' ? 'Completed' : s === 'pending' ? 'Pending' : 'Not Yet'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-900 font-bold text-sm">BBUC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Examination Quality Assurance System</h1>
              <p className="text-blue-200 text-sm">Bahamas Baptist University College</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Section 1: Executive Dashboard */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Executive Dashboard</h2>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-lg shadow p-4 text-center">
                <div className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</div>
                <div className="text-gray-500 text-xs mt-1">{kpi.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Readiness Score */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Exam Readiness Score — ACCT 295 Final</h3>
                <span className="text-3xl font-bold text-blue-700">87%</span>
              </div>
              <div className="space-y-3">
                {readinessScores.map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{s.label}</span>
                      <span>{s.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${s.color} h-2 rounded-full`} style={{ width: `${s.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">Ready Pending HOD Approval</span>
              </div>
            </div>

            {/* Critical Alerts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Critical Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
                  <span className="text-red-500 text-lg">⚠</span>
                  <div>
                    <p className="font-medium text-red-800 text-sm">CHEM 010 Final Exam</p>
                    <p className="text-red-600 text-xs">Blueprint Score 61%, Missing outcome mapping</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <span className="text-orange-500 text-lg">⚠</span>
                  <div>
                    <p className="font-medium text-orange-800 text-sm">NURS 214 Midterm</p>
                    <p className="text-orange-600 text-xs">QA Score below 80%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Review Queue */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Review Queue</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Course', 'Faculty', 'Due Date', 'Blueprint %', 'QA Score', 'Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {exams.map((exam) => (
                  <tr
                    key={exam.id}
                    onClick={() => setSelectedExam(exam.id)}
                    className={`cursor-pointer transition-colors ${selectedExam === exam.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">{exam.course}</td>
                    <td className="px-4 py-3 text-gray-600">{exam.faculty}</td>
                    <td className="px-4 py-3 text-gray-600">{exam.due}</td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${exam.blueprint >= 80 ? 'text-green-700' : exam.blueprint >= 70 ? 'text-yellow-700' : 'text-red-700'}`}>
                        {exam.blueprint}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${exam.qa >= 85 ? 'text-green-700' : exam.qa >= 75 ? 'text-yellow-700' : 'text-red-700'}`}>
                        {exam.qa}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${exam.statusColor}`}>{exam.status}</span>
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
            <h2 className="text-xl font-bold text-gray-800 mb-4">Review Workspace — ACCT 295 Final</h2>
            <div className="bg-white rounded-lg shadow">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                {[
                  { id: 'paper', label: 'Exam Paper' },
                  { id: 'answerkey', label: 'Answer Key' },
                  { id: 'blueprint', label: 'Blueprint' },
                  { id: 'checklist', label: 'QA Checklist' },
                  { id: 'approval', label: 'Reviewer / Approval' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Tab 1: Exam Paper */}
                {activeTab === 'paper' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                      <div><span className="text-xs text-gray-500 block">Course</span><span className="font-medium">ACCT 295 - Financial Accounting</span></div>
                      <div><span className="text-xs text-gray-500 block">Faculty</span><span className="font-medium">Dr. Johnson</span></div>
                      <div><span className="text-xs text-gray-500 block">Date</span><span className="font-medium">June 20, 2025</span></div>
                      <div><span className="text-xs text-gray-500 block">Duration</span><span className="font-medium">120 minutes</span></div>
                      <div><span className="text-xs text-gray-500 block">Total Marks</span><span className="font-medium">100</span></div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Time-to-Complete Analysis</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm mb-2">
                        <div><span className="text-gray-600">Estimated Completion:</span> <span className="font-medium">135 min</span></div>
                        <div><span className="text-gray-600">Exam Duration:</span> <span className="font-medium">120 min</span></div>
                      </div>
                      <p className="text-yellow-700 text-sm font-medium">⚠ Warning: Estimated completion time exceeds exam duration by 15 minutes</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Sample Questions</h4>
                      <div className="space-y-3">
                        {[
                          { n: 1, q: 'Define the accounting equation and explain its components.', marks: 5, bloom: 'Remember' },
                          { n: 2, q: 'Prepare a balance sheet from the following trial balance...', marks: 20, bloom: 'Apply' },
                          { n: 3, q: 'Analyze the impact of the following transactions...', marks: 15, bloom: 'Analyze' },
                          { n: 4, q: 'Calculate the depreciation using straight-line method...', marks: 10, bloom: 'Apply' },
                          { n: 5, q: 'Evaluate the financial health of the company...', marks: 25, bloom: 'Evaluate' },
                        ].map(q => (
                          <div key={q.n} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                            <span className="w-7 h-7 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{q.n}</span>
                            <div className="flex-1">
                              <p className="text-gray-800 text-sm">{q.q}</p>
                              <div className="flex gap-2 mt-1">
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{q.marks} marks</span>
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{q.bloom}</span>
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
                    <div className="bg-red-600 text-white text-center py-3 rounded-lg font-bold tracking-widest text-sm">
                      RESTRICTED — ANSWER KEY — CONFIDENTIAL
                    </div>
                    <div className="space-y-3">
                      {[
                        { n: 1, answer: 'Assets = Liabilities + Equity. Assets are resources owned, liabilities are obligations, equity is owner\'s residual interest.' },
                        { n: 2, answer: 'Balance sheet showing total assets balanced against liabilities and stockholders\' equity, with correct categorization of current and non-current items.' },
                        { n: 3, answer: 'Debit/credit analysis showing impact on account balances, journal entries, and effect on financial statements for each transaction.' },
                        { n: 4, answer: '(Cost - Salvage Value) / Useful Life. Application with given figures showing annual depreciation, accumulated depreciation, and book value schedule.' },
                        { n: 5, answer: 'Ratio analysis including liquidity, solvency, and profitability ratios with interpretation and comparative industry benchmarks.' },
                      ].map(a => (
                        <div key={a.n} className="border border-gray-200 rounded-lg p-4">
                          <p className="text-xs font-semibold text-gray-500 mb-1">Question {a.n} — Model Answer</p>
                          <p className="text-gray-800 text-sm">{a.answer}</p>
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
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              {['CLO', 'Description', 'Questions', 'Marks', "Bloom's", 'Coverage %'].map(h => (
                                <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-600">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {clos.map(c => (
                              <tr key={c.clo}>
                                <td className="px-3 py-2 font-medium">{c.clo}</td>
                                <td className="px-3 py-2 text-gray-600">{c.desc}</td>
                                <td className="px-3 py-2 text-gray-600">{c.questions}</td>
                                <td className="px-3 py-2">{c.marks}</td>
                                <td className="px-3 py-2"><span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded">{c.blooms}</span></td>
                                <td className="px-3 py-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-20 bg-gray-200 rounded-full h-2">
                                      <div className={`${c.color} h-2 rounded-full`} style={{ width: `${c.coverage}%` }} />
                                    </div>
                                    <span className="font-medium">{c.coverage}%</span>
                                  </div>
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
                        {bloomsData.map(b => (
                          <div key={b.level} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 w-24">{b.level}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-4">
                              <div className="bg-blue-500 h-4 rounded-full flex items-center justify-end pr-2" style={{ width: `${b.pct}%` }}>
                                {b.pct > 0 && <span className="text-white text-xs font-medium">{b.pct}%</span>}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500 w-8">{b.pct}%</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <p className="text-orange-700 text-sm">⚠ Higher-order thinking questions (Analyze + Evaluate + Create) = 25%. Recommended minimum is 30%.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: QA Checklist */}
                {activeTab === 'checklist' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {qaChecklist.map((item, i) => (
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${item.pass ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                          <span className={`text-lg ${item.pass ? 'text-green-500' : 'text-red-500'}`}>{item.pass ? '✓' : '✗'}</span>
                          <span className={`text-sm ${item.pass ? 'text-green-800' : 'text-red-800'}`}>{item.item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                      <span className="font-semibold text-blue-800">QA Score</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-blue-700">86%</span>
                        <span className="text-blue-600 text-sm ml-2">(6/7 items)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 5: Reviewer / Approval */}
                {activeTab === 'approval' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Moderation Evidence Tracker</h4>
                      <div className="space-y-2">
                        {moderationSteps.map((step, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className={`w-3 h-3 rounded-full ${statusDotColor(step.status)}`} />
                            <span className="flex-1 text-sm text-gray-700">{step.label}</span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${step.status === 'done' ? 'bg-green-100 text-green-700' : step.status === 'pending' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                              {statusText(step.status)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Risk Scoring</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {risks.map((r, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">{r.area}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.color}`}>{r.level}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                        <span className="font-semibold text-yellow-800">Overall Risk: </span>
                        <span className="text-yellow-700 font-bold">Moderate Risk</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Review Comments</h4>
                      <textarea
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                        placeholder="Enter review comments..."
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        Approve
                      </button>
                      <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        Return for Revision
                      </button>
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
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
            {questionBank.map((qb) => (
              <div key={qb.course} className="bg-white rounded-lg shadow p-5">
                <h3 className="font-bold text-gray-800">{qb.course}</h3>
                <p className="text-gray-500 text-sm mb-4">{qb.name}</p>
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-blue-50 rounded p-2">
                    <div className="text-xl font-bold text-blue-700">{qb.total}</div>
                    <div className="text-xs text-gray-500">Total Items</div>
                  </div>
                  <div className="bg-green-50 rounded p-2">
                    <div className="text-xl font-bold text-green-700">{qb.approved}</div>
                    <div className="text-xs text-gray-500">Approved</div>
                  </div>
                  <div className="bg-yellow-50 rounded p-2">
                    <div className="text-xl font-bold text-yellow-700">{qb.review}</div>
                    <div className="text-xs text-gray-500">Needs Review</div>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Avg Difficulty:</span><span className="font-medium">{qb.difficulty}</span></div>
                  <div className="flex justify-between"><span>Avg Discrimination:</span><span className="font-medium">{qb.discrimination}</span></div>
                  <div className="flex justify-between"><span>Last Reviewed:</span><span className="font-medium">{qb.lastReviewed}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Governance Dashboard */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Governance Dashboard</h2>
            <button
              onClick={() => setGovernanceExpanded(!governanceExpanded)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              {governanceExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>

          {governanceExpanded && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Institution-wide KPIs</h3>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Metric', 'Rate', 'Progress', 'Status'].map(h => (
                      <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {govMetrics.map((m) => (
                    <tr key={m.metric}>
                      <td className="px-4 py-3 text-sm text-gray-700">{m.metric}</td>
                      <td className="px-4 py-3 text-sm font-semibold">{m.rate}%</td>
                      <td className="px-4 py-3 w-48">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${m.status === 'green' ? 'bg-green-500' : m.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${m.rate}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.status === 'green' ? 'bg-green-100 text-green-700' : m.status === 'yellow' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {m.status === 'green' ? 'Good' : m.status === 'yellow' ? 'Caution' : 'At Risk'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
