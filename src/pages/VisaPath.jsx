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
    flag: '\u{1F1E6}\u{1F1FA}',
    type: 'Global Talent Visa (subclass 858)',
    status: 'Researching',
    color: '#f59e0b',
    notes: 'Target sector: DigiTech. Requires nominator & EOI.',
  },
  {
    country: 'United Kingdom',
    flag: '\u{1F1EC}\u{1F1E7}',
    type: 'Start-Up Visa',
    status: 'Planned',
    color: '#3b82f6',
    notes: 'Requires endorsement from approved body. Innovation-focused.',
  },
  {
    country: 'Canada',
    flag: '\u{1F1E8}\u{1F1E6}',
    type: 'Visa',
    status: 'Obtained',
    color: '#10b981',
    notes: 'Canadian visa obtained and secured.',
  },
]

const statusColors = {
  in_progress: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'In Progress' },
  pending: { bg: 'bg-white/[0.04]', text: 'text-white/30', label: 'Pending' },
  done: { bg: 'bg-green-500/10', text: 'text-green-400', label: 'Complete' },
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
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Visa Path</h1>
        <p className="text-sm text-white/40 mt-1">Immigration strategy & progress tracking</p>
      </div>

      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Shield size={16} className="text-green-400" />
              </div>
              <span className="text-sm font-semibold text-white/90">F1 Student Visa</span>
            </div>
            <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-bold border border-green-500/20">ACTIVE</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 bg-white/[0.03] rounded-lg border border-white/[0.04]">
              <span className="text-white/40">Status</span>
              <span className="font-semibold text-white/80">Active — F1</span>
            </div>
            <div className="flex justify-between p-2 bg-white/[0.03] rounded-lg border border-white/[0.04]">
              <span className="text-white/40">Valid Until</span>
              <span className="font-semibold text-white/80">Dec 22, 2026</span>
            </div>
            <div className="flex justify-between p-2 bg-white/[0.03] rounded-lg border border-white/[0.04]">
              <span className="text-white/40">Institution</span>
              <span className="font-semibold text-white/80">Bard College</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock size={16} className="text-amber-400" />
              </div>
              <span className="text-sm font-semibold text-white/90">OPT</span>
            </div>
            <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-bold border border-amber-500/20">UPCOMING</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 bg-white/[0.03] rounded-lg border border-white/[0.04]">
              <span className="text-white/40">Application</span>
              <span className="font-semibold text-white/80">July 2026</span>
            </div>
            <div className="flex justify-between p-2 bg-white/[0.03] rounded-lg border border-white/[0.04]">
              <span className="text-white/40">Start Date</span>
              <span className="font-semibold text-white/80">Jan 1, 2027</span>
            </div>
            <div className="flex justify-between p-2 bg-white/[0.03] rounded-lg border border-white/[0.04]">
              <span className="text-white/40">End Date</span>
              <span className="font-semibold text-white/80">Dec 31, 2027</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
          <div className="relative z-10 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Star size={16} className="text-blue-400" />
                </div>
                <span className="text-sm font-semibold text-white/90">O1 Visa — Target</span>
              </div>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold border border-blue-500/20">PRIORITY</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-white/[0.04] rounded-lg">
                <span className="text-white/30">Apply Date</span>
                <span className="font-semibold text-white/80">Jan 10, 2027</span>
              </div>
              <div className="flex justify-between p-2 bg-white/[0.04] rounded-lg">
                <span className="text-white/30">Through</span>
                <span className="font-semibold text-white/80">Siml Inc</span>
              </div>
              <div className="flex justify-between p-2 bg-white/[0.04] rounded-lg">
                <span className="text-white/30">Category</span>
                <span className="font-semibold text-white/80">Extraordinary Ability</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* O1 Progress Tracker */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-white/90">O1 Visa — Progress Checklist</h3>
            <p className="text-xs text-white/30 mt-0.5">Building the extraordinary ability case through Siml Inc</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white/90">{completedSteps}/{totalSteps}</span>
            <span className="text-xs text-white/30">steps</span>
          </div>
        </div>

        <div className="h-3 w-full bg-white/[0.04] rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500 relative shadow-[0_0_12px_rgba(59,130,246,0.3)]"
            style={{ width: `${Math.max(progressPercent, 5)}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-blue-500/50 border-2 border-blue-400"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {o1Progress.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                step.done
                  ? 'bg-green-500/10 border-green-500/20'
                  : 'bg-white/[0.02] border-white/[0.04]'
              }`}
            >
              {step.done ? (
                <CheckCircle2 size={18} className="text-green-400 shrink-0" />
              ) : (
                <Circle size={18} className="text-white/20 shrink-0" />
              )}
              <span className={`text-sm font-medium ${step.done ? 'text-green-300' : 'text-white/50'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* O1 Criteria */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-white/90">O1 Eligibility Criteria</h3>
            <p className="text-xs text-white/30 mt-0.5">Must meet at least 3 of 8 criteria</p>
          </div>
          <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full font-bold border border-blue-500/20">
            {o1Criteria.filter((c) => c.status === 'in_progress').length} Active
          </span>
        </div>

        <div className="space-y-3">
          {o1Criteria.map((criterion) => {
            const style = statusColors[criterion.status]
            return (
              <div
                key={criterion.id}
                className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all"
              >
                <div className={`w-6 h-6 rounded-full ${style.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  {criterion.status === 'in_progress' ? (
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  ) : (
                    <Circle size={10} className={style.text} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white/80">{criterion.title}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                  </div>
                  <p className="text-xs text-white/30">{criterion.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white/90">Achievements Log</h3>
            <p className="text-xs text-white/30 mt-0.5">Track accomplishments for O1 petition</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-500 transition-colors"
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
              className="flex-1 px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 outline-none focus:ring-2 ring-blue-500/20 focus:border-blue-500/30 placeholder:text-white/20"
            />
            <button
              onClick={addAchievement}
              className="px-4 py-2 bg-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/15"
            >
              Save
            </button>
          </div>
        )}

        {achievements.length === 0 ? (
          <div className="text-center py-8 text-white/20">
            <Star size={24} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">No achievements logged yet</p>
            <p className="text-xs mt-1 text-white/10">Start adding your accomplishments</p>
          </div>
        ) : (
          <div className="space-y-2">
            {achievements.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                <div className="flex-1">
                  <span className="text-sm text-white/80 font-medium">{a.text}</span>
                </div>
                <span className="text-[10px] text-white/30">{a.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Backup Visas */}
      <div>
        <h3 className="text-base font-semibold text-white/90 mb-4">Backup Visa Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {backupVisas.map((visa) => (
            <div
              key={visa.country}
              className="glass-card rounded-2xl p-5 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{visa.flag}</span>
                  <span className="text-sm font-semibold text-white/90">{visa.country}</span>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${visa.color}15`, color: visa.color }}
                >
                  {visa.status}
                </span>
              </div>
              <p className="text-xs font-semibold text-white/60 mb-2">{visa.type}</p>
              <p className="text-xs text-white/30">{visa.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
