import { useState, useEffect } from 'react'
import { AlertTriangle, CheckCircle2, Circle, Clock, Plus, Flag, Building, GraduationCap, Plane, FileText } from 'lucide-react'
import { getLocalData, addItem, updateItem, deleteItem } from '../lib/storage'

const initialDeadlines = [
  { id: 1, title: 'Federal Tax Filing — Personal', category: 'Tax', date: '2026-04-15', priority: 'high', description: 'File personal federal income tax return (Form 1040)', done: false },
  { id: 2, title: 'Siml Inc — Corporate Tax Filing', category: 'Tax', date: '2026-04-15', priority: 'high', description: 'File Siml Inc corporate tax return', done: false },
  { id: 3, title: 'OPT Application', category: 'Visa', date: '2026-07-01', priority: 'high', description: 'Apply for Optional Practical Training (OPT)', done: false },
  { id: 4, title: 'Senior Project — Mid-Review', category: 'University', date: '2026-04-30', priority: 'medium', description: 'Submit mid-semester senior project review at Bard College', done: false },
  { id: 5, title: 'Senior Project — Final Submission', category: 'University', date: '2026-12-15', priority: 'high', description: 'Final senior project / diploma work submission', done: false },
  { id: 6, title: 'F1 Visa Expiration', category: 'Visa', date: '2026-12-22', priority: 'high', description: 'F1 student visa expires — must transition to OPT', done: false },
  { id: 7, title: 'Bard College Graduation', category: 'University', date: '2026-12-20', priority: 'medium', description: 'Graduation ceremony — BS in Computer Science & Finance', done: false },
  { id: 8, title: 'O1 Visa Application', category: 'Visa', date: '2027-01-10', priority: 'high', description: 'File O1 extraordinary ability visa petition through Siml Inc', done: false },
]

const categoryIcons = { tax: FileText, visa: Plane, university: GraduationCap, corporate: Building }

const categoryColors = {
  Tax: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  Visa: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  University: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  Corporate: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
}

const priorityColors = { high: 'text-red-400', medium: 'text-amber-400', low: 'text-green-400' }

export default function Deadlines() {
  const [filter, setFilter] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDeadline, setNewDeadline] = useState({ title: '', date: '', category: 'Tax', description: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [deadlines, setDeadlines] = useState(initialDeadlines)

  useEffect(() => {
    loadDeadlines()
  }, [])

  const loadDeadlines = async () => {
    const stored = await getLocalData('deadlines')
    if (stored.length > 0) {
      setDeadlines(stored)
    }
  }

  const handleAddDeadline = async () => {
    if (newDeadline.title && newDeadline.date) {
      setIsLoading(true)
      const deadline = await addItem('deadlines', {
        title: newDeadline.title,
        date: newDeadline.date,
        category: newDeadline.category,
        description: newDeadline.description,
        priority: 'medium',
        done: false,
      })
      setDeadlines([...deadlines, deadline])
      setNewDeadline({ title: '', date: '', category: 'Tax', description: '' })
      setShowAddForm(false)
      setIsLoading(false)
    }
  }

  const toggleDone = async (id) => {
    const deadline = deadlines.find(d => d.id === id)
    if (deadline) {
      const updated = await updateItem('deadlines', id, { done: !deadline.done })
      if (updated) {
        setDeadlines(deadlines.map(d => d.id === id ? updated : d))
      }
    }
  }

  const handleDelete = async (id) => {
    await deleteItem('deadlines', id)
    setDeadlines(deadlines.filter(d => d.id !== id))
  }

  const today = new Date()
  const filtered = filter === 'All' ? deadlines : deadlines.filter((d) => d.category === filter)
  const sorted = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date))

  const daysUntil = (dateStr) => {
    const target = new Date(dateStr)
    const diff = target - today
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const upcoming = deadlines.filter((d) => !d.done && daysUntil(d.date) <= 30 && daysUntil(d.date) > 0)
  const overdue = deadlines.filter((d) => !d.done && daysUntil(d.date) < 0)

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Deadlines & Filings</h1>
          <p className="text-sm text-white/40 mt-1">Tax filings, visa deadlines, university submissions</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-500 transition-colors w-fit">
          <Plus size={16} />
          Add Deadline
        </button>
      </div>

      {showAddForm && (
        <div className="glass-card rounded-2xl p-5 animate-slide-up">
          <h3 className="text-sm font-semibold text-white/90 mb-4">New Deadline</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input type="text" value={newDeadline.title} onChange={(e) => setNewDeadline({ ...newDeadline, title: e.target.value })} placeholder="Title"
              className="md:col-span-2 px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 outline-none focus:ring-2 ring-blue-500/20 placeholder:text-white/20" />
            <input type="date" value={newDeadline.date} onChange={(e) => setNewDeadline({ ...newDeadline, date: e.target.value })}
              className="px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 outline-none" />
            <select value={newDeadline.category} onChange={(e) => setNewDeadline({ ...newDeadline, category: e.target.value })}
              className="px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 outline-none">
              <option>Tax</option><option>Visa</option><option>University</option><option>Corporate</option>
            </select>
            <button onClick={handleAddDeadline} disabled={isLoading} className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50">
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {(overdue.length > 0 || upcoming.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {overdue.length > 0 && (
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-red-400" />
                <span className="text-sm font-semibold text-red-400">Overdue ({overdue.length})</span>
              </div>
              <div className="space-y-2">
                {overdue.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-2 bg-white/[0.03] rounded-lg border border-white/[0.04]">
                    <span className="text-xs font-medium text-red-300">{d.title}</span>
                    <span className="text-[10px] font-bold text-red-400">{Math.abs(daysUntil(d.date))}d overdue</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {upcoming.length > 0 && (
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-amber-400" />
                <span className="text-sm font-semibold text-amber-400">Due Soon ({upcoming.length})</span>
              </div>
              <div className="space-y-2">
                {upcoming.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-2 bg-white/[0.03] rounded-lg border border-white/[0.04]">
                    <span className="text-xs font-medium text-amber-300">{d.title}</span>
                    <span className="text-[10px] font-bold text-amber-400">{daysUntil(d.date)}d left</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {['All', 'Tax', 'Visa', 'University', 'Corporate'].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === cat ? 'bg-white/10 text-white border border-white/10' : 'text-white/40 border border-white/[0.06] hover:border-white/10'
            }`}>{cat}</button>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="space-y-0">
          {sorted.map((deadline, i) => {
            const days = daysUntil(deadline.date)
            const isOverdue = days < 0 && !deadline.done
            const colors = categoryColors[deadline.category] || categoryColors.Tax
            const Icon = categoryIcons[deadline.category.toLowerCase()] || FileText

            return (
              <div key={deadline.id || i} className={`flex items-center gap-4 p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-all group ${deadline.done ? 'opacity-50' : ''}`}>
                <button onClick={() => toggleDone(deadline.id)} className="shrink-0">
                  {deadline.done ? (
                    <CheckCircle2 size={20} className="text-green-400" />
                  ) : (
                    <Circle size={20} className="text-white/20 hover:text-blue-400 transition-colors" />
                  )}
                </button>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colors.bg}`}>
                  <Icon size={16} className={colors.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`text-sm font-medium ${deadline.done ? 'line-through text-white/20' : 'text-white/80'}`}>
                      {deadline.title}
                    </p>
                    <Flag size={10} className={priorityColors[deadline.priority]} />
                  </div>
                  <p className="text-xs text-white/30 truncate">{deadline.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                    {deadline.category}
                  </span>
                  <p className={`text-xs font-medium mt-1 ${
                    isOverdue ? 'text-red-400' : days <= 30 ? 'text-amber-400' : 'text-white/30'
                  }`}>
                    {deadline.done ? 'Done' : isOverdue ? `${Math.abs(days)}d overdue` : `${days}d left`}
                  </p>
                </div>
                <button onClick={() => handleDelete(deadline.id)} className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs font-medium transition-opacity shrink-0">Delete</button>
                <div className="text-xs text-slate-400 font-medium shrink-0 w-24 text-right">
                  {new Date(deadline.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
