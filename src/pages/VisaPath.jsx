import { useState } from 'react'
import {
  Plane, Shield, CheckCircle2, Circle, Clock, AlertTriangle,
  ChevronRight, Plus, Star, Globe, ArrowRight, Flag,
} from 'lucide-react'

const o1Criteria = [
  { id: 1, title: 'Awards / Prizes for Excellence', status: 'in_progress', description: 'Documentation of nationally or internationally recognized prizes or awards for excellence' },
  { id: 2, title: 'Membership in Associations', status: 'pending', description: 'Membership in associations requiring outstanding achievements as judged by recognized experts' },
  { id: 3, title: 'Published Material in Professional Publications', status: 'in_progress', description: 'Published material about the applicant in professional or major trade publications or other major media' },
  { id: 4, title: 'Judging the Work of Others', status: 'pending', description: 'Participation as a judge of the work of others in the same or allied field' },
  { id: 5, title: 'Original Contributions of Major Significance', status: 'in_progress', description: 'Original scientific, scholarly, artistic, or business-related contributions of major significance in the field' },
  { id: 6, title: 'Authorship of Scholarly Articles', status: 'pending', description: 'Authorship of scholarly articles in professional or major trade publications or other major media' },
  { id: 7, title: 'High Salary or Remuneration', status: 'pending', description: 'Evidence of commanding a high salary or significantly high remuneration' },
  { id: 8, title: 'Critical Role in Distinguished Organizations', status: 'in_progress', description: 'Performance in a critical or essential capacity for organizations with distinguished reputation — Siml Inc' },
]

const o1Progress = [
  { label: 'Startup Founded (Siml Inc)', done: true },
  { label: 'App/Product Launched', done: false },
  { label: 'Media Coverage', done: false },
  { label: 'Revenue Generated', done: false },
  { label: 'Awards / Recognition', done: false },
  { label: 'Advisory Letter Secured', done: false },
  { label: 'Attorney Consultation', done: false },
  { label: 'Petition Filed', done: false },
]

const backupVisas = [
  {
    country: 'Australia',
    flag: '🇦🇺',
    type: 'Global Talent Visa (subclass 858)',
    status: 'Researching',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    notes: 'Target sector: DigiTech. Requires nominator & EOI.',
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    type: 'Start-Up Visa',
    status: 'Planned',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    notes: 'Requires endorsement from approved body. Innovation-focused.',
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    type: 'Visa',
    status: 'Obtained',
    color: '#10b981',
    bgColor: '#ecfdf5',
    notes: 'Canadian visa obtained and secured.',
  },
]

const statusColors = {
  in_progress: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'In Progress' },
  pending: { bg: 'bg-slate-50', text: 'text-slate-400', label: 'Pending' },
  done: { bg: 'bg-green-50', text: 'text-green-600', label: 'Complete' },
}

export default function VisaPath() {
  const [achievements, setAchievements] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAchievement, setNewAchievement] = useState('')

  const completedSteps = o1Progress.filter((s) => s.done).length
  const totalSteps = o1Progress.length
  const progressPercent = (completedSteps / totalSteps) * 100

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, { text: newAchievement, date: new Date().toLocaleDateString() }])
      setNewAchievement('')
      setShowAddForm(false)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Visa Path</h1>
        <p className="text-sm text-slate-500 mt-1">Immigration strategy & progress tracking</p>
      </div>

      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* F1 Visa */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <Shield size={16} className="text-green-600" />
              </div>
              <span className="text-sm font-semibold text-slate-900">F1 Student Visa</span>
            </div>
            <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
              <span>Status</span>
              <span className="font-semibold text-slate-900">Active — F1</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
              <span>Valid Until</span>
              <span className="font-semibold text-slate-900">Dec 22, 2026</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
              <span>Institution</span>
              <span className="font-semibold text-slate-900">Bard College</span>
            </div>
          </div>
        </div>

        {/* OPT */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Clock size={16} className="text-amber-600" />
              </div>
              <span className="text-sm font-semibold text-slate-900">OPT</span>
            </div>
            <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold">UPCOMING</span>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
              <span>Application</span>
              <span className="font-semibold text-slate-900">July 2026</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
              <span>Start Date</span>
              <span className="font-semibold text-slate-900">Jan 1, 2027</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
              <span>End Date</span>
              <span className="font-semibold text-slate-900">Dec 31, 2027</span>
            </div>
          </div>
        </div>

        {/* O1 Target */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Star size={16} className="text-blue-400" />
              </div>
              <span className="text-sm font-semibold">O1 Visa — Target</span>
            </div>
            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">PRIORITY</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 bg-white/5 rounded-lg">
              <span className="text-slate-400">Apply Date</span>
              <span className="font-semibold">Jan 10, 2027</span>
            </div>
            <div className="flex justify-between p-2 bg-white/5 rounded-lg">
              <span className="text-slate-400">Through</span>
              <span className="font-semibold">Siml Inc</span>
            </div>
            <div className="flex justify-between p-2 bg-white/5 rounded-lg">
              <span className="text-slate-400">Category</span>
              <span className="font-semibold">Extraordinary Ability</span>
            </div>
          </div>
        </div>
      </div>

      {/* O1 Progress Tracker */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-slate-900">O1 Visa — Progress Checklist</h3>
            <p className="text-xs text-slate-500 mt-0.5">Building the extraordinary ability case through Siml Inc</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">{completedSteps}/{totalSteps}</span>
            <span className="text-xs text-slate-400">steps</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 w-full bg-slate-100 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 relative"
            style={{ width: `${Math.max(progressPercent, 5)}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-sm"></div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {o1Progress.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                step.done
                  ? 'bg-green-50 border-green-100'
                  : 'bg-slate-50 border-slate-100'
              }`}
            >
              {step.done ? (
                <CheckCircle2 size={18} className="text-green-500 shrink-0" />
              ) : (
                <Circle size={18} className="text-slate-300 shrink-0" />
              )}
              <span className={`text-sm font-medium ${step.done ? 'text-green-700' : 'text-slate-600'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* O1 Criteria */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-slate-900">O1 Eligibility Criteria</h3>
            <p className="text-xs text-slate-500 mt-0.5">Must meet at least 3 of 8 criteria</p>
          </div>
          <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">
            {o1Criteria.filter((c) => c.status === 'in_progress').length} Active
          </span>
        </div>

        <div className="space-y-3">
          {o1Criteria.map((criterion) => {
            const style = statusColors[criterion.status]
            return (
              <div
                key={criterion.id}
                className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all"
              >
                <div className={`w-6 h-6 rounded-full ${style.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  {criterion.status === 'in_progress' ? (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  ) : (
                    <Circle size={10} className={style.text} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-slate-900">{criterion.title}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{criterion.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Achievements Log</h3>
            <p className="text-xs text-slate-500 mt-0.5">Track accomplishments for O1 petition</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={14} />
            Add Achievement
          </button>
        </div>

        {showAddForm && (
          <div className="flex gap-2 mb-4 animate-fade-in">
            <input
              type="text"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addAchievement()}
              placeholder="Describe your achievement..."
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 ring-blue-500/20 focus:border-blue-300"
            />
            <button
              onClick={addAchievement}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800"
            >
              Save
            </button>
          </div>
        )}

        {achievements.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Star size={24} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">No achievements logged yet</p>
            <p className="text-xs mt-1">Start adding your accomplishments</p>
          </div>
        ) : (
          <div className="space-y-2">
            {achievements.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                <div className="flex-1">
                  <span className="text-sm text-slate-900 font-medium">{a.text}</span>
                </div>
                <span className="text-[10px] text-slate-400">{a.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Backup Visas */}
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-4">Backup Visa Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {backupVisas.map((visa) => (
            <div
              key={visa.country}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{visa.flag}</span>
                  <span className="text-sm font-semibold text-slate-900">{visa.country}</span>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: visa.bgColor, color: visa.color }}
                >
                  {visa.status}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-700 mb-2">{visa.type}</p>
              <p className="text-xs text-slate-500">{visa.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
