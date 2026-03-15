import { useState, useEffect } from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import {
  DollarSign, Users, TrendingUp, ArrowUpRight, ArrowRight,
  Building, Bot, Package, Chrome, FileText, Activity,
  ShoppingBag, Zap, Mail, ChevronRight, Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ventures } from '../data/ventures'
import { quotes } from '../data/quotes'

const revenueData = [
  { month: 'Jan', total: 0, siml: 0, corvus: 0, ecom: 0, other: 0 },
  { month: 'Feb', total: 0, siml: 0, corvus: 0, ecom: 0, other: 0 },
  { month: 'Mar', total: 0, siml: 0, corvus: 0, ecom: 0, other: 0 },
  { month: 'Apr', total: 0, siml: 0, corvus: 0, ecom: 0, other: 0 },
  { month: 'May', total: 0, siml: 0, corvus: 0, ecom: 0, other: 0 },
  { month: 'Jun', total: 0, siml: 0, corvus: 0, ecom: 0, other: 0 },
  { month: 'Jul', total: 0, siml: 0, corvus: 0, ecom: 0, other: 0 },
  { month: 'Aug', total: 0, siml: 0, corvus: 0, ecom: 0, other: 0 },
  { month: 'Sep', total: 0, siml: 0, corvus: 0, ecom: 0, other: 0 },
  { month: 'Oct', total: 0, siml: 0, corvus: 0, ecom: 0, other: 0 },
  { month: 'Nov', total: 0, siml: 0, corvus: 0, ecom: 0, other: 0 },
  { month: 'Dec', total: 0, siml: 0, corvus: 0, ecom: 0, other: 0 },
]

const channelDistribution = [
  { name: 'Siml Inc', value: 0, color: '#3b82f6' },
  { name: 'Corvus', value: 0, color: '#8b5cf6' },
  { name: 'Amazon', value: 0, color: '#f59e0b' },
  { name: 'Chrome Ext', value: 0, color: '#10b981' },
  { name: 'Notion', value: 0, color: '#6366f1' },
  { name: 'Trading Bot', value: 0, color: '#14b8a6' },
  { name: 'TikTok', value: 0, color: '#ec4899' },
  { name: 'OpenClaw', value: 0, color: '#f97316' },
  { name: 'Newsletter', value: 0, color: '#06b6d4' },
]

const ventureIcons = {
  siml: Building,
  corvus: Bot,
  amazon: Package,
  chrome: Chrome,
  notion: FileText,
  trading: TrendingUp,
  tiktok: ShoppingBag,
  openclaw: Zap,
  newsletter: Mail,
}

const kpiCards = [
  { label: 'Total Revenue', value: '$0.00', change: '+0%', icon: DollarSign, color: 'blue' },
  { label: 'Total Customers', value: '0', change: '+0%', icon: Users, color: 'indigo' },
  { label: 'Monthly Recurring', value: '$0.00', change: '+0%', icon: TrendingUp, color: 'green' },
  { label: 'Active Ventures', value: '9', change: 'All Channels', icon: Activity, color: 'purple' },
]

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
}

export default function Dashboard() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [quoteVisible, setQuoteVisible] = useState(true)

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

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Quote Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-50"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Sparkles size={18} className="text-blue-400" />
          </div>
          <p
            className={`text-white/90 text-sm lg:text-base font-medium italic transition-all duration-500 ${
              quoteVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
          >
            "{quotes[quoteIndex]}"
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon
          const colors = colorMap[card.color]
          return (
            <div
              key={card.label}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center`}>
                  <Icon size={16} className={colors.text} />
                </div>
                <span className={`text-[10px] font-bold ${colors.text} ${colors.bg} px-2 py-0.5 rounded-full`}>
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{card.value}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">{card.label}</p>
            </div>
          )
        })}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-12 gap-6">
        {/* Revenue Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Revenue Overview</h3>
              <p className="text-xs text-slate-500 mt-0.5">All channels combined — 2026</p>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
              <button className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white shadow-sm border border-slate-200 rounded-md text-slate-900">
                Monthly
              </button>
              <button className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600">
                Annual
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                }}
              />
              <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2.5} fill="url(#totalGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Global Vault + Visa Status */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Global Vault
                </span>
                <DollarSign size={16} className="text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold tracking-tighter">$0.00</h3>
              <p className="text-slate-500 text-xs mt-1.5">Across all 9 revenue channels</p>
              <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    Monthly Burn
                  </span>
                  <span className="text-sm font-semibold">$0/mo</span>
                </div>
                <Link
                  to="/ventures"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/visa"
            className="block bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Visa Status
              </span>
              <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">
                ON TRACK
              </span>
            </div>
            <h3 className="text-base font-semibold tracking-tight text-slate-900">
              O1 — Extraordinary Ability
            </h3>
            <p className="text-xs text-slate-500 mt-1">Target: January 10, 2027</p>
            <div className="h-1.5 w-full bg-slate-100 rounded-full mt-4">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-[35%] rounded-full relative">
                <div className="absolute -right-1 -top-[3px] w-3 h-3 bg-white border-2 border-blue-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs text-blue-600 font-medium group-hover:gap-2 transition-all">
              View details <ChevronRight size={12} />
            </div>
          </Link>
        </div>
      </div>

      {/* Channel Distribution + Venture Quick Cards */}
      <div className="grid grid-cols-12 gap-6">
        {/* Pie Chart */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Channel Distribution</h3>
          <p className="text-xs text-slate-500 mb-4">Revenue share by venture</p>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={channelDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {channelDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} opacity={0.7} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {channelDistribution.slice(0, 6).map((ch) => (
              <div key={ch.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.color }}></div>
                <span className="text-[10px] text-slate-600 font-medium truncate">{ch.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Venture Grid */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">All Ventures</h3>
            <Link to="/ventures" className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {ventures.map((v) => {
              const Icon = ventureIcons[v.id] || Zap
              return (
                <Link
                  key={v.id}
                  to="/ventures"
                  className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: v.bgColor }}
                    >
                      <Icon size={14} style={{ color: v.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{v.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{v.category}</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-bold text-slate-900 tracking-tight">$0</p>
                      <p className="text-[10px] text-slate-400">Revenue</p>
                    </div>
                    <div className="flex gap-px items-end h-8">
                      {[40, 60, 45, 70, 55, 80].map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 rounded-t-sm transition-all"
                          style={{
                            height: `${h * 0.3}px`,
                            backgroundColor: i === 5 ? v.color : '#f1f5f9',
                            opacity: i === 5 ? 0.8 : 1,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Row: Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Jamka */}
        <Link
          to="/jamka"
          className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:border-rose-200 transition-all group relative overflow-hidden"
        >
          <div className="absolute -right-8 -bottom-8 text-rose-500/5 group-hover:text-rose-500/10 transition-all">
            <Heart size={100} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center">
                <Heart size={16} className="text-rose-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project</p>
                <p className="text-sm font-semibold text-slate-900">Jamka</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-rose-50/30 transition-colors">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Status</span>
              <span className="text-xs font-semibold text-slate-700">Planning Phase</span>
            </div>
          </div>
        </Link>

        {/* University */}
        <Link
          to="/university"
          className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:border-indigo-200 transition-all group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
              <ArrowUpRight size={16} className="text-indigo-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic</p>
              <p className="text-sm font-semibold text-slate-900">Senior Year — Bard College</p>
            </div>
          </div>
          <div className="flex justify-between items-end mb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Progress</span>
              <span className="text-lg font-bold text-slate-900">Senior I</span>
            </div>
            <span className="text-xs text-indigo-600 font-semibold">Dec 2026</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[75%] rounded-full"></div>
          </div>
        </Link>

        {/* Deadlines */}
        <Link
          to="/deadlines"
          className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:border-amber-200 transition-all group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <ArrowUpRight size={16} className="text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upcoming</p>
              <p className="text-sm font-semibold text-slate-900">Deadlines & Filings</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-700 font-medium">OPT Application</span>
              <span className="text-[10px] text-amber-600 font-bold">Jul 2026</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-700 font-medium">Tax Filing</span>
              <span className="text-[10px] text-amber-600 font-bold">Apr 2026</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
