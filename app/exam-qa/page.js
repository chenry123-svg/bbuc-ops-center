'use client'
import { useState } from 'react'

// ─── SOP Reference Data ───────────────────────────────────────────────────────
// Source: BBUC Standard Operating Procedure for Mid-Semester, Final &
// Supplementary Examinations

const SOP_CHECKS = {
  // §3.2 Required Examination Components
  packageComponents: [
    { id: 'coverSheet',      label: 'Official Examination Cover Sheet (§3.2)' },
    { id: 'examScript',      label: 'Examination Script (§3.2)' },
    { id: 'answerKey',       label: 'Complete Answer Key / Marking Scheme (§3.2)' },
    { id: 'jacketCover',     label: 'Official Jacket Cover (§3.2)' },
    { id: 'moderationForm',  label: 'Moderation Form (§3.2)' },
  ],
  // §3.1 Formatting Standards
  formatting: [
    { id: 'fontTNR',         label: 'Font: Times New Roman, 12 pt (§3.1)' },
    { id: 'lineSpacing',     label: 'Line spacing: 1.5 (§3.1)' },
    { id: 'margins',         label: 'Margins: 1 inch, alignment justified (§3.1)' },
    { id: 'pageNumbers',     label: 'Page numbers at bottom center (§3.1)' },
  ],
  // §3.3 Cover Sheet Completeness
  coverSheetFields: [
    { id: 'csInstitution',   label: 'Institution & School name present (§3.3)' },
    { id: 'csCourseInfo',    label: 'Course Title & Code complete and accurate (§3.3)' },
    { id: 'csExamType',      label: 'Exam type indicated: Mid-Semester / Final / Supplementary (§3.3)' },
    { id: 'csSemester',      label: 'Semester/Year included (§3.3)' },
    { id: 'csDuration',      label: 'Exam duration specified (§3.3)' },
    { id: 'csLecturer',      label: 'Lecturer name included (§3.3)' },
    { id: 'csInstructions',  label: 'General instructions present (device rules, answer directions) (§3.3)' },
    { id: 'csSections',      label: 'Section breakdown & marks allocation present (§3.3)' },
    { id: 'csTotalMarks',    label: 'Total marks correct and verified (§3.3)' },
  ],
  // §5 Question Development Standards
  questionQuality: [
    { id: 'cloAlignment',    label: 'All questions aligned with Course Learning Outcomes (§5.3)' },
    { id: 'bloomsVerified',  label: "Bloom's taxonomy levels verified for each question (§5.1)" },
    { id: 'pointAllocation', label: 'Point allocation reflects cognitive demand (§5.3)' },
    { id: 'rubrics',         label: 'Rubrics provided for essays, case studies & extended responses (§5.1)' },
    { id: 'mixedTypes',      label: 'Mix of appropriate question types used (§5.2, §5.3)' },
  ],
  // §4 HOD QA Responsibilities
  hodReview: [
    { id: 'hodAccuracy',     label: 'HOD reviewed for accuracy & academic integrity (§4)' },
    { id: 'hodOutcomes',     label: 'HOD verified question-to-outcome alignment (§4)' },
    { id: 'hodReturned',     label: 'Non-compliant items corrected before resubmission (§4)' },
  ],
  // §6 Submission
  submission: [
    { id: 'hardCopy',        label: 'Hard copy submitted — electronic copy NOT official (§6.2)' },
    { id: 'onTime',          label: 'Submitted by Academic Affairs deadline (§6.3)' },
    { id: 'proofread',       label: 'Faculty proofread and confirmed error-free (§4, §11)' },
  ],
}

// ─── Exam Data ────────────────────────────────────────────────────────────────

const EXAMS = [
  {
    id: 1,
    course: 'ACCT 295',
    title: 'Final Exam',
    faculty: 'Dr. Johnson',
    school: 'Business',
    examType: 'Final',
    semester: 'Spring 2026',
    due: 'Jun 20',
    blueprint: 82,
    status: 'pending-hod',
    duration: 120,
    estimatedTime: 115,
    totalMarks: 100,
    readiness: {
      overall: 87,
      packageCompleteness: 80,
      formatting: 100,
      coverSheetFields: 89,
      questionQuality: 80,
      hodReview: 67,
      submission: 100,
    },
    sopChecks: {
      coverSheet: true, examScript: true, answerKey: true, jacketCover: true, moderationForm: false,
      fontTNR: true, lineSpacing: true, margins: true, pageNumbers: true,
      csInstitution: true, csCourseInfo: true, csExamType: true, csSemester: true, csDuration: true,
      csLecturer: true, csInstructions: true, csSections: true, csTotalMarks: false,
      cloAlignment: true, bloomsVerified: true, pointAllocation: true, rubrics: false, mixedTypes: true,
      hodAccuracy: true, hodOutcomes: false, hodReturned: false,
      hardCopy: true, onTime: true, proofread: true,
    },
    moderation: {
      facultySubmission: true, peerModeration: true, hodApproval: false,
      qaApproval: true, secureArchive: false,
    },
    clos: [
      { id: 'CLO 1', desc: 'Financial Statements', questions: 8, marks: 24, bloom: 'Apply', coverage: 90 },
      { id: 'CLO 2', desc: 'Accounting Principles', questions: 6, marks: 18, bloom: 'Remember', coverage: 75 },
      { id: 'CLO 3', desc: 'Transaction Analysis', questions: 4, marks: 12, bloom: 'Analyze', coverage: 88 },
      { id: 'CLO 4', desc: 'Asset Management', questions: 2, marks: 6, bloom: 'Apply', coverage: 50 },
    ],
    blooms: { Remember: 20, Understand: 25, Apply: 30, Analyze: 15, Evaluate: 10, Create: 0 },
    risk: { Formatting: 'Low', 'Blueprint Alignment': 'Medium', 'Outcome Coverage': 'Low', 'Mark Allocation': 'Low' },
  },
  {
    id: 2,
    course: 'CHEM 010',
    title: 'Final Exam',
    faculty: 'Prof. Williams',
    school: 'Natural Sciences',
    examType: 'Final',
    semester: 'Spring 2026',
    due: 'Jun 18',
    blueprint: 61,
    status: 'needs-revision',
    duration: 120,
    estimatedTime: 140,
    totalMarks: 100,
    readiness: {
      overall: 61,
      packageCompleteness: 60,
      formatting: 75,
      coverSheetFields: 67,
      questionQuality: 40,
      hodReview: 33,
      submission: 67,
    },
    sopChecks: {
      coverSheet: true, examScript: true, answerKey: false, jacketCover: true, moderationForm: false,
      fontTNR: true, lineSpacing: false, margins: true, pageNumbers: true,
      csInstitution: true, csCourseInfo: true, csExamType: true, csSemester: true, csDuration: false,
      csLecturer: true, csInstructions: false, csSections: true, csTotalMarks: false,
      cloAlignment: false, bloomsVerified: false, pointAllocation: true, rubrics: false, mixedTypes: false,
      hodAccuracy: false, hodOutcomes: false, hodReturned: false,
      hardCopy: true, onTime: false, proofread: true,
    },
    moderation: {
      facultySubmission: true, peerModeration: false, hodApproval: false,
      qaApproval: false, secureArchive: false,
    },
    clos: [
      { id: 'CLO 1', desc: 'Periodic Law', questions: 10, marks: 30, bloom: 'Remember', coverage: 100 },
      { id: 'CLO 2', desc: 'Chemical Bonding', questions: 5, marks: 15, bloom: 'Understand', coverage: 60 },
      { id: 'CLO 3', desc: 'Reaction Types', questions: 2, marks: 6, bloom: 'Apply', coverage: 25 },
      { id: 'CLO 4', desc: 'Quantitative Analysis', questions: 0, marks: 0, bloom: 'Analyze', coverage: 0 },
    ],
    blooms: { Remember: 45, Understand: 30, Apply: 15, Analyze: 10, Evaluate: 0, Create: 0 },
    risk: { Formatting: 'Medium', 'Blueprint Alignment': 'High', 'Outcome Coverage': 'High', 'Mark Allocation': 'Medium' },
  },
  {
    id: 3,
    course: 'NURS 214',
    title: 'Midterm Exam',
    faculty: 'Dr. Thompson',
    school: 'Education',
    examType: 'Mid-Semester',
    semester: 'Spring 2026',
    due: 'Jun 22',
    blueprint: 88,
    status: 'under-review',
    duration: 90,
    estimatedTime: 95,
    totalMarks: 80,
    readiness: {
      overall: 78,
      packageCompleteness: 80,
      formatting: 100,
      coverSheetFields: 89,
      questionQuality: 80,
      hodReview: 33,
      submission: 100,
    },
    sopChecks: {
      coverSheet: true, examScript: true, answerKey: true, jacketCover: true, moderationForm: false,
      fontTNR: true, lineSpacing: true, margins: true, pageNumbers: true,
      csInstitution: true, csCourseInfo: true, csExamType: true, csSemester: true, csDuration: true,
      csLecturer: true, csInstructions: true, csSections: true, csTotalMarks: false,
      cloAlignment: true, bloomsVerified: false, pointAllocation: true, rubrics: true, mixedTypes: true,
      hodAccuracy: false, hodOutcomes: false, hodReturned: false,
      hardCopy: true, onTime: true, proofread: true,
    },
    moderation: {
      facultySubmission: true, peerModeration: true, hodApproval: false,
      qaApproval: false, secureArchive: false,
    },
    clos: [
      { id: 'CLO 1', desc: 'Nursing Process', questions: 10, marks: 20, bloom: 'Apply', coverage: 95 },
      { id: 'CLO 2', desc: 'Patient Assessment', questions: 8, marks: 16, bloom: 'Analyze', coverage: 85 },
      { id: 'CLO 3', desc: 'Care Planning', questions: 6, marks: 12, bloom: 'Understand', coverage: 70 },
      { id: 'CLO 4', desc: 'Clinical Evaluation', questions: 4, marks: 8, bloom: 'Evaluate', coverage: 60 },
    ],
    blooms: { Remember: 15, Understand: 20, Apply: 35, Analyze: 20, Evaluate: 10, Create: 0 },
    risk: { Formatting: 'Low', 'Blueprint Alignment': 'Low', 'Outcome Coverage': 'Medium', 'Mark Allocation': 'Low' },
  },
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
    'pending-hod':    { label: '🟡 Pending HOD', cls: 'bg-yellow-100 text-yellow-800' },
    'needs-revision': { label: '🔴 Needs Revision', cls: 'bg-red-100 text-red-800' },
    'under-review':   { label: '🔵 Under Review', cls: 'bg-blue-100 text-blue-800' },
    approved:         { label: '🟢 Approved', cls: 'bg-green-100 text-green-800' },
  }
  const s = map[status] || { label: status, cls: 'bg-gray-100 text-gray-700' }
  return <span className={`px-2 py-0.5 rounded text-xs font-semibold ${s.cls}`}>{s.label}</span>
}

function scoreColor(v) {
  if (v >= 85) return 'text-green-600'
  if (v >= 70) return 'text-yellow-600'
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
  if (vals.includes('High'))   return { label: '🔴 High Risk', cls: 'bg-red-50 border-red-300 text-red-700' }
  if (vals.includes('Medium')) return { label: '🟡 Moderate Risk', cls: 'bg-yellow-50 border-yellow-300 text-yellow-700' }
  return { label: '🟢 Low Risk', cls: 'bg-green-50 border-green-300 text-green-700' }
}

function ProgressBar({ value, colorClass }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className={`h-2 rounded-full ${colorClass}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  )
}

function CheckRow({ label, ok }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0 gap-2">
      <span className="text-sm text-gray-700 flex-1">{label}</span>
      <span className={`text-base font-bold shrink-0 ${ok ? 'text-green-600' : 'text-red-500'}`}>
        {ok ? '✓' : '✗'}
      </span>
    </div>
  )
}

function ModerationRow({ label, done }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${done ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
        {done ? '✓' : '✗'}
      </span>
      <span className={`text-sm ${done ? 'text-gray-800' : 'text-gray-400'}`}>{label}</span>
    </div>
  )
}

// ─── Tab Components ───────────────────────────────────────────────────────────

function TabExamPaper({ exam }) {
  const overtime = exam.estimatedTime > exam.duration
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['School', exam.school],
          ['Exam Type', exam.examType],
          ['Semester', exam.semester],
          ['Duration', `${exam.duration} min`],
          ['Faculty', exam.faculty],
          ['Total Marks', exam.totalMarks],
          ['Due Date', exam.due],
          ['Course', exam.course],
        ].map(([k, v]) => (
          <div key={k} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{k}</p>
            <p className="font-semibold text-gray-800 mt-0.5">{v}</p>
          </div>
        ))}
      </div>

      {/* SOP Cover Sheet preview */}
      <div className="border border-gray-300 rounded-lg p-5 font-mono text-sm bg-gray-50">
        <p className="font-bold text-center text-base mb-1">BAHAMAS BAPTIST UNIVERSITY COLLEGE</p>
        <p className="text-center mb-3">School of {exam.school}</p>
        <p className="font-bold text-center mb-4 underline">OFFICIAL EXAMINATION COVER SHEET</p>
        <div className="space-y-1 text-xs">
          <p>Course Title: <span className="border-b border-gray-400 inline-block w-48">{exam.course} – {exam.title}</span></p>
          <p>Course Code: <span className="border-b border-gray-400 inline-block w-48">{exam.course}</span></p>
          <p>Type of Examination: ☑ {exam.examType} &nbsp; □ Other</p>
          <p>Semester/Year: <span className="border-b border-gray-400 inline-block w-40">{exam.semester}</span></p>
          <p>Exam Duration: <span className="border-b border-gray-400 inline-block w-40">{exam.duration} minutes</span></p>
          <p>Lecturer: <span className="border-b border-gray-400 inline-block w-48">{exam.faculty}</span></p>
          <p className="mt-2 font-semibold">General Instructions:</p>
          <p>1. Do not open this paper until instructed.</p>
          <p>2. Answer all questions as directed.</p>
          <p>3. Electronic devices are prohibited.</p>
          <p>4. Write clearly and legibly.</p>
          <p className="mt-2">Total Marks: <span className="border-b border-gray-400 inline-block w-20">{exam.totalMarks}</span></p>
        </div>
      </div>

      {/* Time-to-complete */}
      <div className={`rounded-lg border p-4 ${overtime ? 'border-orange-300 bg-orange-50' : 'border-green-300 bg-green-50'}`}>
        <h3 className="font-semibold text-gray-800 mb-3">⏱ Time-to-Complete Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Estimated Completion</span>
            <p className={`font-bold text-lg ${overtime ? 'text-orange-600' : 'text-green-600'}`}>{exam.estimatedTime} min</p>
          </div>
          <div>
            <span className="text-gray-500">Allocated Duration</span>
            <p className="font-bold text-lg text-gray-800">{exam.duration} min</p>
          </div>
        </div>
        {overtime
          ? <p className="mt-2 text-orange-700 text-sm font-medium">⚠️ Exam may be too long — estimated time exceeds duration by {exam.estimatedTime - exam.duration} min. Review question count and mark allocation.</p>
          : <p className="mt-2 text-green-700 text-sm">✓ Timing is within acceptable range.</p>}
      </div>
    </div>
  )
}

function TabAnswerKey({ exam }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
        <span className="text-lg">🔒</span>
        <span>Answer key access is restricted per BBUC SOP §3.2. Only the QA Officer and designated HOD reviewers may view the complete marking scheme.</span>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-800 mb-2">SOP §3.2 Requirements for Answer Key / Marking Scheme:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Complete model answers or acceptable alternatives for every question</li>
          <li>Mark breakdown per question / sub-question</li>
          <li>Rubrics for all essays, case studies, and extended responses (§5.1)</li>
          <li>Bloom's level noted alongside each answer to verify alignment</li>
        </ul>
      </div>
      <div className={`rounded-lg border p-3 text-sm font-medium ${exam.sopChecks.answerKey ? 'bg-green-50 border-green-300 text-green-700' : 'bg-red-50 border-red-300 text-red-700'}`}>
        {exam.sopChecks.answerKey ? '✓ Answer Key / Marking Scheme submitted with this package.' : '✗ Answer Key / Marking Scheme MISSING — non-compliant with SOP §3.2.'}
      </div>
      <div className={`rounded-lg border p-3 text-sm font-medium ${exam.sopChecks.rubrics ? 'bg-green-50 border-green-300 text-green-700' : 'bg-yellow-50 border-yellow-300 text-yellow-700'}`}>
        {exam.sopChecks.rubrics ? '✓ Rubrics provided for subjective/extended responses.' : '⚠️ Rubrics not confirmed for essays/case studies — required per SOP §5.1.'}
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
        <h3 className="font-semibold text-gray-800 mb-1">Outcome Coverage Heat Map <span className="text-xs text-gray-400 font-normal">(SOP §5.3 — align all questions with CLOs)</span></h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {['Outcome', 'Description', 'Questions', 'Marks', "Bloom's Level", 'Coverage'].map(h => (
                  <th key={h} className="text-left p-3 font-semibold text-gray-600 border-b">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exam.clos.map(c => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{c.id}</td>
                  <td className="p-3 text-gray-600 text-xs">{c.desc}</td>
                  <td className="p-3 text-gray-700">{c.questions}</td>
                  <td className="p-3 text-gray-700">{c.marks}</td>
                  <td className="p-3 text-gray-700">{c.bloom}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${coverageColor(c.coverage)}`}>{c.coverage}%</span>
                      <div className="flex-1 max-w-20">
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
        <h3 className="font-semibold text-gray-800 mb-1">
          Bloom's Taxonomy Distribution <span className="text-xs text-gray-400 font-normal">(SOP §5.1)</span>
        </h3>
        {higherOrder < 30 && (
          <p className="text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded p-2 mb-3">
            ⚠️ SOP §5.1: Final exams should include higher-order questions (Analyze + Evaluate + Create). Current higher-order: <strong>{higherOrder}%</strong> — below the recommended 30% threshold.
          </p>
        )}
        {higherOrder >= 30 && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded p-2 mb-3">
            ✓ Higher-order questions (Analyze + Evaluate + Create): <strong>{higherOrder}%</strong> — meets recommended threshold.
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
              <span className="text-xs text-gray-400 w-20 shrink-0">{
                level === 'Remember' || level === 'Understand' ? '1–3 pts typical' :
                level === 'Apply' || level === 'Analyze' ? '4–8 pts typical' : '10–20+ pts typical'
              }</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">Point allocation guidance from SOP §5.1 (sample verbs: Remember→define/list; Understand→explain/classify; Apply→calculate/solve; Analyze→compare/differentiate; Evaluate→critique/justify; Create→design/construct)</p>
      </div>
    </div>
  )
}

function TabQAChecklist({ exam }) {
  const allChecks = [
    ...SOP_CHECKS.packageComponents,
    ...SOP_CHECKS.formatting,
    ...SOP_CHECKS.coverSheetFields,
    ...SOP_CHECKS.questionQuality,
    ...SOP_CHECKS.hodReview,
    ...SOP_CHECKS.submission,
  ]
  const passed = allChecks.filter(c => exam.sopChecks[c.id]).length
  const total = allChecks.length
  const score = Math.round((passed / total) * 100)

  const sections = [
    { title: 'Required Package Components', ref: 'SOP §3.2', items: SOP_CHECKS.packageComponents },
    { title: 'Formatting Standards', ref: 'SOP §3.1', items: SOP_CHECKS.formatting },
    { title: 'Cover Sheet Completeness', ref: 'SOP §3.3', items: SOP_CHECKS.coverSheetFields },
    { title: 'Question Development & Bloom\'s Alignment', ref: 'SOP §5', items: SOP_CHECKS.questionQuality },
    { title: 'HOD Quality Review', ref: 'SOP §4', items: SOP_CHECKS.hodReview },
    { title: 'Submission Compliance', ref: 'SOP §6', items: SOP_CHECKS.submission },
  ]

  return (
    <div className="space-y-5">
      <div className={`rounded-lg border p-4 ${score >= 85 ? 'border-green-300 bg-green-50' : score >= 70 ? 'border-yellow-300 bg-yellow-50' : 'border-red-300 bg-red-50'}`}>
        <p className="text-sm text-gray-600">Overall SOP Compliance Score</p>
        <p className={`text-4xl font-bold ${scoreColor(score)}`}>{score}%</p>
        <p className="text-sm text-gray-500">{passed} of {total} checks passed</p>
      </div>

      {sections.map(sec => {
        const secPassed = sec.items.filter(c => exam.sopChecks[c.id]).length
        return (
          <div key={sec.title} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
              <div>
                <span className="font-semibold text-gray-800 text-sm">{sec.title}</span>
                <span className="ml-2 text-xs text-gray-400">{sec.ref}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${secPassed === sec.items.length ? 'bg-green-100 text-green-700' : secPassed === 0 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {secPassed}/{sec.items.length}
              </span>
            </div>
            <div className="px-4">
              {sec.items.map(c => <CheckRow key={c.id} label={c.label} ok={exam.sopChecks[c.id]} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TabReviewer({ exam }) {
  const [comment, setComment] = useState('')
  const risk = overallRisk(exam)
  const modItems = [
    ['Faculty Submission', exam.moderation.facultySubmission],
    ['Peer Moderation', exam.moderation.peerModeration],
    ['HOD Approval (§4)', exam.moderation.hodApproval],
    ['QA Approval', exam.moderation.qaApproval],
    ['Secure Archive (§9)', exam.moderation.secureArchive],
  ]
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Moderation Evidence Tracker <span className="text-xs text-gray-400 font-normal">(SOP §4, §11)</span></h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            {modItems.map(([label, done]) => <ModerationRow key={label} label={label} done={done} />)}
          </div>
          <p className="text-xs text-gray-400 mt-2">SOP §11: HODs must complete the moderation form and verification form before submission.</p>
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
          placeholder="Enter review comments, feedback, or conditions for approval (per SOP §4 — HOD must return non-compliant exams to faculty for correction)..."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">✓ Approve Exam</button>
        <button className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">↩ Return for Revision (SOP §4)</button>
        <button className="px-5 py-2 bg-yellow-500 text-white rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors">📋 Request HOD Review (SOP §4)</button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ExamQAPage() {
  const [selectedId, setSelectedId] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [govOpen, setGovOpen] = useState(false)

  const exam = selectedId !== null ? EXAMS.find(e => e.id === selectedId) : null
  const tabs = ['Exam Paper', 'Answer Key', 'Blueprint & CLOs', 'SOP QA Checklist', 'Reviewer / Approval']

  const sopScore = (ex) => {
    const all = Object.values(ex.sopChecks)
    return Math.round((all.filter(Boolean).length / all.length) * 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1a2e5a] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
              <span className="text-[#1a2e5a] font-bold text-sm">BB</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">BBUC Ops Center</h1>
              <p className="text-blue-200 text-xs mt-0.5">Examination Quality Assurance · SOP Compliance System</p>
            </div>
          </div>
          <div className="text-right text-sm text-blue-200 hidden sm:block">
            <p>Bahamas Baptist University College</p>
            <p className="text-xs">Academic Year 2025–2026</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── Section 1: Executive Dashboard ── */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Executive Dashboard</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            {[
              { label: 'Submitted', value: 3, color: 'text-blue-600' },
              { label: 'Approved', value: 1, color: 'text-green-600' },
              { label: 'Returned', value: 1, color: 'text-red-600' },
              { label: 'Pending', value: 1, color: 'text-yellow-600' },
              { label: 'Avg Blueprint', value: '77%', color: 'text-purple-600' },
              { label: 'Avg SOP Score', value: `${Math.round(EXAMS.reduce((a, e) => a + sopScore(e), 0) / EXAMS.length)}%`, color: 'text-indigo-600' },
            ].map(k => (
              <div key={k.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
                <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                <p className="text-xs text-gray-500 mt-1">{k.label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Exam Readiness */}
            {exam ? (
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
                    ['Package Completeness (§3.2)', exam.readiness.packageCompleteness],
                    ['Formatting Standards (§3.1)', exam.readiness.formatting],
                    ['Cover Sheet Fields (§3.3)', exam.readiness.coverSheetFields],
                    ['Question Quality (§5)', exam.readiness.questionQuality],
                    ['HOD Review (§4)', exam.readiness.hodReview],
                    ['Submission Compliance (§6)', exam.readiness.submission],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-center gap-2 text-sm">
                      <span className="w-44 text-gray-600 shrink-0 text-xs">{label}</span>
                      <ProgressBar value={val} colorClass={val >= 80 ? 'bg-green-500' : val >= 60 ? 'bg-yellow-400' : 'bg-red-500'} />
                      <span className={`w-10 text-right font-semibold text-xs ${scoreColor(val)}`}>{val}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-dashed border-gray-300 p-5 flex items-center justify-center text-gray-400 text-sm">
                Select an exam from the Review Queue to see its Readiness Score
              </div>
            )}

            {/* Critical Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-3">Critical Alerts</h3>
              <div className="space-y-3">
                {EXAMS.filter(e => e.blueprint < 65).map(e => (
                  <div key={e.id} className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
                    <span className="text-lg shrink-0">🔴</span>
                    <div>
                      <p className="font-semibold text-red-800">{e.course} {e.title}</p>
                      <p className="text-red-700">Blueprint {e.blueprint}% · SOP §5.3: Missing CLO alignment · Exam overlong ({e.estimatedTime} min vs {e.duration} min allowed)</p>
                    </div>
                  </div>
                ))}
                {EXAMS.filter(e => !e.sopChecks.answerKey).map(e => (
                  <div key={`ak-${e.id}`} className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
                    <span className="text-lg shrink-0">🔴</span>
                    <div>
                      <p className="font-semibold text-red-800">{e.course} {e.title}</p>
                      <p className="text-red-700">Answer Key / Marking Scheme missing — required by SOP §3.2</p>
                    </div>
                  </div>
                ))}
                {EXAMS.filter(e => sopScore(e) < 80 && e.blueprint >= 65 && e.sopChecks.answerKey).map(e => (
                  <div key={`sop-${e.id}`} className="flex gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                    <span className="text-lg shrink-0">🟡</span>
                    <div>
                      <p className="font-semibold text-yellow-800">{e.course} {e.title}</p>
                      <p className="text-yellow-700">SOP Compliance {sopScore(e)}% — review checklist for outstanding items</p>
                    </div>
                  </div>
                ))}
                {EXAMS.every(e => e.blueprint >= 65 && sopScore(e) >= 80 && e.sopChecks.answerKey) && (
                  <p className="text-sm text-green-600">✓ No critical alerts at this time.</p>
                )}
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
                  {['Course', 'Faculty', 'School', 'Due Date', 'Blueprint %', 'SOP Score', 'Status', ''].map(h => (
                    <th key={h} className="px-4 py-3 font-semibold text-gray-600 border-b text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EXAMS.map(e => (
                  <tr
                    key={e.id}
                    onClick={() => { setSelectedId(e.id); setActiveTab(0) }}
                    className={`border-b border-gray-50 cursor-pointer transition-colors ${selectedId === e.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-800">{e.course}</p>
                      <p className="text-xs text-gray-500">{e.title}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{e.faculty}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{e.school}</td>
                    <td className="px-4 py-3 text-gray-700">{e.due}</td>
                    <td className="px-4 py-3"><span className={`font-bold ${scoreColor(e.blueprint)}`}>{e.blueprint}%</span></td>
                    <td className="px-4 py-3"><span className={`font-bold ${scoreColor(sopScore(e))}`}>{sopScore(e)}%</span></td>
                    <td className="px-4 py-3">{statusBadge(e.status)}</td>
                    <td className="px-4 py-3"><button className="text-blue-600 text-xs font-medium hover:underline">Review →</button></td>
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
              <p className="text-blue-200 text-xs mt-0.5">{exam.faculty} · School of {exam.school} · {exam.examType} · Due {exam.due}</p>
            </div>
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

        {/* ── Section 4: Governance Dashboard ── */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setGovOpen(o => !o)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Examination Governance Dashboard</h2>
              <p className="text-xs text-gray-500 mt-0.5">Institution-wide SOP compliance overview — for President, Dean &amp; Academic Affairs</p>
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
              <p className="text-xs text-gray-400 mt-4">SOP §12: This dashboard is reviewed annually by Academic Affairs in consultation with the Dean, Proctors, HODs and the Examination Office.</p>
            </div>
          )}
        </section>

      </main>

      <footer className="mt-8 py-4 text-center text-xs text-gray-400 border-t border-gray-200">
        BBUC Ops Center · Examination Quality Assurance · © 2026 Bahamas Baptist University College ·
        SOP: Mid-Semester, Final &amp; Supplementary Examinations
      </footer>
    </div>
  )
}
