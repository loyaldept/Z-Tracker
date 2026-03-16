import { useState, useEffect } from 'react'
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import {
  DollarSign, Users, TrendingUp, ArrowUpRight, ArrowRight,
  Building, Bot, Package, Chrome, Activity,
  ChevronRight, Sparkles, Heart,
  Globe, Clock, Calendar, Target, Plus, X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ventures as defaultVentures } from '../data/ventures'
import { quotes } from '../data/quotes'
import { getLocalData, saveLocalData } from '../lib/storage'

const revenueData = [
  { month: 'Jan', total: 0 },
  { month: 'Feb', total: 0 },
  { month: 'Mar', total: 0 },
  { month: 'Apr', total: 0 },
  { month: 'May', total: 0 },
  { month: 'Jun', total: 0 },
  { month: 'Jul', total: 0 },
  { month: 'Aug', total: 0 },
  { month: 'Sep', total: 0 },
  { month: 'Oct', total: 0 },
  { month: 'Nov', total: 0 },
  { month: 'Dec', total: 0 },
]

const channelDistribution = [
  { name: 'Siml Inc', value: 25, color: '#10b981' },
  { name: 'Corvus AI', value: 30, color: '#1e3a5f' },
  { name: 'Amazon', value: 25, color: '#f59e0b' },
  { name: 'Chrome Ext', value: 20, color: '#4285f4' },
]

const ventureIcons = {
  siml: Building, corvus: Bot, amazon: Package, chrome: Chrome,
}

const ventureBrandImages = {
  siml: '/images/siml.png',
  corvus: '/images/corvus.png',
  amazon: '/images/amazon.png',
  chrome: '/images/chrome.png',
}

function VentureCardIcon({ venture }) {
  const imgSrc = ventureBrandImages[venture.id]
  if (imgSrc) {
    return <img src={imgSrc} alt={venture.name} className="w-4 h-4 object-contain" />
  }
  const Icon = ventureIcons[venture.id] || Zap
  return <Icon size={14} style={{ color: venture.color }} />
}

const kpiCards = [
  { label: 'Total Revenue', value: '$0.00', change: '+0%', icon: DollarSign, color: 'blue' },
  { label: 'Total Customers', value: '0', change: '+0%', icon: Users, color: 'indigo' },
  { label: 'Monthly Recurring', value: '$0.00', change: '+0%', icon: TrendingUp, color: 'green' },
  { label: 'Active Ventures', value: '9', change: 'All Channels', icon: Activity, color: 'purple' },
]

        <div className="grid grid-cols-4 gap-3 lg:gap-4">
          {units.map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="bg-white/[0.06] border border-white/[0.08] rounded-xl p-3 lg:p-4 mb-2">
                <span className="countdown-digit text-3xl lg:text-4xl text-white">
                  {String(unit.value || 0).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.15em]">{unit.label}</span>
            </div>
          ))}
        </div>

        {/* Progress bar for the year */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-slate-500 font-medium">Year progress</span>
            <span className="text-[10px] text-blue-400 font-bold">
              {Math.round(((new Date() - new Date(2026, 0, 1)) / (new Date(2027, 0, 1) - new Date(2026, 0, 1))) * 100)}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all"
              style={{ width: `${((new Date() - new Date(2026, 0, 1)) / (new Date(2027, 0, 1) - new Date(2026, 0, 1))) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function AddRevenueModal({ ventures, onSave, onClose }) {
  const [ventureId, setVentureId] = useState(ventures[0]?.id || '')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  const handleSave = () => {
    if (ventureId && amount && parseFloat(amount) > 0) {
      onSave({
        ventureId,
        amount: parseFloat(amount),
        note,
        date: new Date().toISOString(),
        id: Date.now(),
      })
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Add Revenue</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Venture</label>
            <select
              value={ventureId}
              onChange={(e) => setVentureId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 ring-blue-500/20"
            >
              {ventures.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 ring-blue-500/20 font-mono-nums"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Note (optional)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., Client payment, product sale..."
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 ring-blue-500/20"
            />
          </div>
        </div>
        <div className="p-5 border-t border-slate-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors">
            Add Revenue
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [quoteVisible, setQuoteVisible] = useState(true)
  const [showRevenueModal, setShowRevenueModal] = useState(false)
  const [ventures, setVentures] = useState(defaultVentures)
  const [revenueEntries, setRevenueEntries] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const storedVentures = await getLocalData('ventures')
    if (storedVentures.length > 0) setVentures(storedVentures)
    const storedRevenue = await getLocalData('revenue_entries')
    if (storedRevenue.length > 0) setRevenueEntries(storedRevenue)
  }

  const handleAddRevenue = async (entry) => {
    const newEntries = [...revenueEntries, entry]
    setRevenueEntries(newEntries)
    await saveLocalData('revenue_entries', newEntries)

    // Update venture revenue
    const updated = ventures.map(v => {
      if (v.id === entry.ventureId) {
        return { ...v, metrics: { ...v.metrics, revenue: (v.metrics?.revenue || 0) + entry.amount } }
      }
      return v
    })
    setVentures(updated)
    await saveLocalData('ventures', updated)
  }

  const totalRevenue = ventures.reduce((s, v) => s + (v.metrics?.revenue || 0), 0)
  const totalCustomers = ventures.reduce((s, v) => s + (v.metrics?.customers || v.metrics?.clients || v.metrics?.installs || 0), 0)
  const totalMRR = ventures.reduce((s, v) => s + (v.metrics?.mrr || 0), 0)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteVisible(false)
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length)
        setQuoteVisible(true)
      }, 500)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const kpiCards = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, change: '+0%', icon: DollarSign, color: 'emerald' },
    { label: 'Total Customers', value: totalCustomers.toString(), change: '+0%', icon: Users, color: 'blue' },
    { label: 'Monthly Recurring', value: `$${totalMRR.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, change: '+0%', icon: TrendingUp, color: 'indigo' },
    { label: 'Active Ventures', value: '4', change: 'All Channels', icon: Activity, color: 'purple' },
  ]

  const colorMap = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Quote Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-50" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 animate-float">
            <Sparkles size={18} className="text-blue-400" />
          </div>
          <p className={`text-white/90 text-sm font-medium italic transition-all duration-500 ${
            quoteVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            "{quotes[quoteIndex]}"
          </p>
        </div>
      </div>

      {/* Countdown */}
      <CountdownTimer />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon
          const colors = colorMap[card.color]
          const isRevenue = card.label.includes('Revenue') || card.label.includes('Recurring')
          return (
            <div key={card.label} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                  <Icon size={18} className={colors.text} />
                </div>
                <span className={`text-[10px] font-bold ${colors.text} ${colors.bg} px-2 py-1 rounded-full`}>
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-mono font-bold text-slate-900 tracking-tight">{card.value}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">{card.label}</p>
            </div>
          )
        })}
      </div>

      {/* Add Revenue Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowRevenueModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-sm"
        >
          <Plus size={16} />
          Add Revenue
        </button>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-12 gap-6">
        {/* Revenue Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Revenue Overview</h3>
              <p className="text-xs text-slate-500 mt-0.5">All channels combined — 2026</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-white shadow-sm border border-slate-200 rounded-md text-slate-900">Monthly</button>
              <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600">Annual</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2.5} fill="url(#totalGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Global Vault + Visa Status */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Vault</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-bold text-green-400 uppercase">Live</span>
                </div>
              </div>
              <h3 className="text-3xl font-mono font-bold tracking-tighter">$0.00</h3>
              <p className="text-slate-500 text-xs mt-1">Across all 9 revenue channels</p>
              <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Monthly</span>
                  <span className="text-sm font-semibold font-mono-nums">${totalMRR}/mo</span>
                </div>
                <Link to="/ventures" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <Link to="/visa" className="block bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visa Status</span>
              <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold border border-green-100">ON TRACK</span>
            </div>
            <h3 className="text-base font-semibold tracking-tight text-slate-900">O1 — Extraordinary Ability</h3>
            <p className="text-xs text-slate-500 mt-1">Target: January 10, 2027</p>
            <div className="h-2 w-full bg-slate-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-[35%] rounded-full relative">
                <div className="absolute -right-1 -top-[3px] w-3 h-3 bg-white border-2 border-blue-500 rounded-full shadow-sm" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs text-blue-600 font-medium group-hover:gap-2 transition-all">
              View details <ChevronRight size={12} />
            </div>
          </Link>
        </div>
      </div>

      {/* Channel Distribution + Venture Cards */}
      <div className="grid grid-cols-12 gap-6">
        {/* Pie Chart */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Channel Distribution</h3>
          <p className="text-xs text-slate-500 mb-4">Revenue share by venture</p>
          <div className="flex items-center justify-center relative">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie data={channelDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" stroke="none">
                  {channelDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} opacity={0.85} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-xl font-bold text-slate-900">4</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase">Channels</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {channelDistribution.map((ch) => (
              <div key={ch.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ch.color }} />
                <span className="text-[11px] text-slate-600 font-medium truncate">{ch.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Venture Grid */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">All Ventures</h3>
            <Link to="/ventures" className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {ventures.map((v) => {
              const Icon = ventureIcons[v.id] || Building
              const brand = ventureBrandColors[v.id] || { bg: 'bg-slate-50', text: 'text-slate-600' }
              const ventureRevenue = v.metrics?.revenue || 0
              return (
                <Link key={v.id} to="/ventures" className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden" style={{ backgroundColor: v.bgColor }}>
                      <VentureCardIcon venture={v} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{v.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{v.category}</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-mono font-bold text-slate-900 tracking-tight">$0</p>
                      <p className="text-[10px] text-slate-400">Revenue</p>
                    </div>
                    <div className="flex gap-px items-end h-8">
                      {[40, 60, 45, 70, 55, 80].map((h, i) => (
                        <div key={i} className="w-2 rounded-t-sm transition-all" style={{ height: `${h * 0.3}px`, backgroundColor: i === 5 ? (brand.accent || v.color) : '#f1f5f9', opacity: i === 5 ? 0.8 : 1 }} />
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Revenue Entries */}
      {revenueEntries.length > 0 && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Recent Revenue Entries</h3>
          <div className="space-y-2">
            {revenueEntries.slice(-5).reverse().map((entry) => {
              const venture = ventures.find(v => v.id === entry.ventureId)
              return (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <DollarSign size={14} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{venture?.name || 'Unknown'}</p>
                      <p className="text-[10px] text-slate-400">{entry.note || 'Revenue entry'} — {new Date(entry.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold font-mono-nums revenue-text">+${entry.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick Links Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Jamka */}
        <Link to="/jamka" className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-rose-200 transition-all group relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-all">
            <img src="/images/zhamka.jpg" alt="" className="w-full h-full object-cover object-top" aria-hidden="true" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-rose-100 shadow-sm shrink-0">
                <img src="/images/zhamka.jpg" alt="Zhamka" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project</p>
                <p className="text-sm font-bold text-slate-900">Jamka</p>
              </div>
            </div>
            <div className="p-2.5 bg-rose-50/80 rounded-xl border border-rose-100">
              <span className="text-[10px] font-bold text-rose-400 uppercase block mb-0.5">Status</span>
              <span className="text-xs font-semibold text-rose-700">Planning Phase</span>
            </div>
          </div>
        </Link>

        {/* University */}
        <Link to="/university" className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Target size={16} className="text-indigo-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic</p>
              <p className="text-sm font-bold text-slate-900">Bard College</p>
            </div>
          </div>
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Progress</span>
              <span className="text-lg font-bold text-slate-900">Senior I</span>
            </div>
            <span className="text-xs text-indigo-600 font-semibold">Dec 2026</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[75%] rounded-full" />
          </div>
        </Link>

        {/* Deadlines */}
        <Link to="/deadlines" className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-200 transition-all group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <Calendar size={16} className="text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upcoming</p>
              <p className="text-sm font-bold text-slate-900">Deadlines</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-700 font-medium">OPT Application</span>
              <span className="text-[10px] text-amber-600 font-bold">Jul 2026</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-700 font-medium">Tax Filing</span>
              <span className="text-[10px] text-amber-600 font-bold">Apr 2026</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Revenue Modal */}
      {showRevenueModal && (
        <AddRevenueModal
          ventures={ventures}
          onSave={handleAddRevenue}
          onClose={() => setShowRevenueModal(false)}
        />
      )}
    </div>
  )
}
