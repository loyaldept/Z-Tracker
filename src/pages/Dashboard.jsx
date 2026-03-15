import { useState, useEffect } from 'react'
import useSWR from 'swr'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import {
  DollarSign, Users, TrendingUp, ArrowUpRight, ArrowRight, ArrowDownRight,
  Building, Bot, Package, Chrome, FileText, Activity,
  ShoppingBag, Zap, Mail, ChevronRight, Sparkles, Heart,
  Target, Flame, Trophy, Globe, BarChart3, PieChart as PieIcon,
  Wallet, Clock, Eye, Star, Layers, Signal,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ventures } from '../data/ventures'
import { quotes } from '../data/quotes'
import { fetchFromDatabase } from '../lib/supabase'

/* ── Revenue data (stacked by channel groups) ── */
const revenueData = [
  { month: 'Jan', siml: 0, corvus: 0, ecom: 0, software: 0, fintech: 0, media: 0 },
  { month: 'Feb', siml: 0, corvus: 0, ecom: 0, software: 0, fintech: 0, media: 0 },
  { month: 'Mar', siml: 0, corvus: 0, ecom: 0, software: 0, fintech: 0, media: 0 },
  { month: 'Apr', siml: 0, corvus: 0, ecom: 0, software: 0, fintech: 0, media: 0 },
  { month: 'May', siml: 0, corvus: 0, ecom: 0, software: 0, fintech: 0, media: 0 },
  { month: 'Jun', siml: 0, corvus: 0, ecom: 0, software: 0, fintech: 0, media: 0 },
  { month: 'Jul', siml: 0, corvus: 0, ecom: 0, software: 0, fintech: 0, media: 0 },
  { month: 'Aug', siml: 0, corvus: 0, ecom: 0, software: 0, fintech: 0, media: 0 },
  { month: 'Sep', siml: 0, corvus: 0, ecom: 0, software: 0, fintech: 0, media: 0 },
  { month: 'Oct', siml: 0, corvus: 0, ecom: 0, software: 0, fintech: 0, media: 0 },
  { month: 'Nov', siml: 0, corvus: 0, ecom: 0, software: 0, fintech: 0, media: 0 },
  { month: 'Dec', siml: 0, corvus: 0, ecom: 0, software: 0, fintech: 0, media: 0 },
]

const channelDistribution = [
  { name: 'Siml Inc', value: 18, color: '#3b82f6' },
  { name: 'Corvus AI', value: 15, color: '#8b5cf6' },
  { name: 'Amazon', value: 12, color: '#f59e0b' },
  { name: 'Chrome Ext', value: 10, color: '#10b981' },
  { name: 'Notion', value: 10, color: '#6366f1' },
  { name: 'Trading Bot', value: 12, color: '#14b8a6' },
  { name: 'TikTok', value: 8, color: '#ec4899' },
  { name: 'OpenClaw', value: 8, color: '#f97316' },
  { name: 'Newsletter', value: 7, color: '#06b6d4' },
]

const ventureIcons = {
  siml: Building, corvus: Bot, amazon: Package, chrome: Chrome,
  notion: FileText, trading: TrendingUp, tiktok: ShoppingBag,
  openclaw: Zap, newsletter: Mail,
}

const ventureGlows = {
  siml: 'glow-blue', corvus: 'glow-purple', amazon: 'glow-amber',
  chrome: 'glow-green', notion: 'glow-purple', trading: 'glow-cyan',
  tiktok: 'glow-pink', openclaw: 'glow-amber', newsletter: 'glow-cyan',
}

const stackColors = {
  siml: '#3b82f6', corvus: '#8b5cf6', ecom: '#f59e0b',
  software: '#10b981', fintech: '#14b8a6', media: '#06b6d4',
}

const kpiCards = [
  { label: 'Total Revenue', value: '$0.00', change: '+0%', icon: DollarSign, color: '#3b82f6', glow: 'glow-blue' },
  { label: 'Active Channels', value: '9', change: 'All Live', icon: Signal, color: '#10b981', glow: 'glow-green' },
  { label: 'Monthly Recurring', value: '$0.00', change: '+0%', icon: TrendingUp, color: '#8b5cf6', glow: 'glow-purple' },
  { label: 'Total Customers', value: '0', change: '+0%', icon: Users, color: '#f59e0b', glow: 'glow-amber' },
  { label: 'Vault Balance', value: '$0.00', change: 'Across 9 ch.', icon: Wallet, color: '#ec4899', glow: 'glow-pink' },
  { label: 'O1 Visa Progress', value: '35%', change: 'On Track', icon: Globe, color: '#06b6d4', glow: 'glow-cyan' },
]

/* ── Custom tooltip ── */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload) return null
  return (
    <div className="glass-card rounded-xl px-4 py-3 border border-white/10 shadow-2xl">
      <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-white/60">{p.name}:</span>
          <span className="text-white font-semibold">${p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [quoteVisible, setQuoteVisible] = useState(true)
  const [chartView, setChartView] = useState('stacked')
  const [hoveredVenture, setHoveredVenture] = useState(null)

  const { data: dbQuotes = [] } = useSWR('quotes', () => fetchFromDatabase('quotes'), {
    revalidateOnFocus: false,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteVisible(false)
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % (dbQuotes.length || quotes.length))
        setQuoteVisible(true)
      }, 500)
    }, 6000)
    return () => clearInterval(interval)
  }, [dbQuotes.length])

  const displayQuote = dbQuotes.length > 0 ? dbQuotes[quoteIndex]?.text : quotes[quoteIndex]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Hero Quote Banner ── */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-cyan-600/20 animate-gradient" />
        <div className="absolute inset-0 bg-[#0a0a0f]/60" />
        <div className="relative z-10 px-6 py-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0 animate-float">
            <Sparkles size={16} className="text-blue-400" />
          </div>
          <p className={`text-white/80 text-sm lg:text-base font-medium italic transition-all duration-500 ${
            quoteVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            &ldquo;{displayQuote}&rdquo;
          </p>
        </div>
      </div>

      {/* ── KPI Shards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className={`glass-card rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] ${card.glow} group`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                  <Icon size={14} style={{ color: card.color }} />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ color: card.color, backgroundColor: `${card.color}15` }}>{card.change}</span>
              </div>
              <p className="text-xl font-bold text-white tracking-tight">{card.value}</p>
              <p className="text-[10px] text-white/40 mt-1 font-medium">{card.label}</p>
            </div>
          )
        })}
      </div>

      {/* ── Main Row: Stacked Revenue Chart + Vault + Visa ── */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                <BarChart3 size={16} className="text-blue-400" />
                Revenue Streams
              </h3>
              <p className="text-[10px] text-white/30 mt-0.5">Stacked by channel group — 2026</p>
            </div>
            <div className="flex bg-white/[0.04] p-1 rounded-lg border border-white/[0.06]">
              {['stacked', 'lines'].map((v) => (
                <button key={v} onClick={() => setChartView(v)}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${
                    chartView === v ? 'bg-white/10 text-white shadow-sm border border-white/10' : 'text-white/30 hover:text-white/60'
                  }`}>{v}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                {Object.entries(stackColors).map(([key, color]) => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<ChartTooltip />} />
              {Object.entries(stackColors).map(([key, color]) => (
                <Area key={key} type="monotone" dataKey={key} stackId={chartView === 'stacked' ? '1' : undefined}
                  stroke={color} strokeWidth={chartView === 'lines' ? 2 : 0} fill={`url(#grad-${key})`}
                  name={key.charAt(0).toUpperCase() + key.slice(1)} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/[0.04]">
            {Object.entries(stackColors).map(([key, color]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[10px] text-white/40 font-medium capitalize">{key}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vault + Visa Column */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
            <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl animate-pulse-glow" />
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Global Vault</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-bold text-green-400 uppercase tracking-wider">Live</span>
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white tracking-tighter text-glow-blue">$0.00</h3>
              <p className="text-white/20 text-[10px] mt-1.5 font-medium">Across all 9 revenue channels</p>
              <div className="grid grid-cols-2 gap-3 pt-5 mt-5 border-t border-white/[0.06]">
                <div>
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.15em] block">Monthly</span>
                  <span className="text-sm font-bold text-white/80">$0/mo</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.15em] block">Runway</span>
                  <span className="text-sm font-bold text-white/80">&infin;</span>
                </div>
              </div>
              <Link to="/ventures" className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/60 text-xs font-medium hover:bg-white/[0.08] hover:text-white transition-all">
                View all channels <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          <Link to="/visa" className="block glass-card rounded-2xl p-5 transition-all group hover:glow-cyan">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Visa Path</span>
              <span className="text-[9px] bg-green-400/10 text-green-400 px-2 py-0.5 rounded-full font-bold border border-green-400/20">ON TRACK</span>
            </div>
            <h3 className="text-sm font-semibold tracking-tight text-white/90">O1 — Extraordinary Ability</h3>
            <p className="text-[10px] text-white/30 mt-1">Target: January 10, 2027</p>
            <div className="h-2 w-full bg-white/[0.04] rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 w-[35%] rounded-full relative shadow-[0_0_12px_rgba(59,130,246,0.4)]">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-blue-500/50 border-2 border-blue-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[10px] text-cyan-400 font-medium group-hover:gap-2 transition-all">
              View details <ChevronRight size={10} />
            </div>
          </Link>

          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/10 flex items-center justify-center">
                <Trophy size={16} className="text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Top Channel</p>
                <p className="text-sm font-semibold text-white/90">Siml Inc</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Channel Distribution Row ── */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-5 lg:col-span-4 glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white/90 mb-1 flex items-center gap-2">
            <PieIcon size={14} className="text-purple-400" />
            Channel Split
          </h3>
          <p className="text-[10px] text-white/30 mb-4">Revenue share by venture</p>
          <div className="flex items-center justify-center relative">
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie data={channelDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={2} dataKey="value" stroke="none">
                  {channelDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} opacity={0.8} />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div className="glass-card rounded-lg px-3 py-2 border border-white/10">
                      <p className="text-xs font-semibold text-white">{payload[0].name}</p>
                      <p className="text-[10px] text-white/50">{payload[0].value}% share</p>
                    </div>
                  )
                }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-2xl font-bold text-white tracking-tight">9</p>
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-wider">Channels</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-4 pt-4 border-t border-white/[0.04]">
            {channelDistribution.map((ch) => (
              <div key={ch.name} className="flex items-center gap-2 group cursor-default">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ch.color }} />
                <span className="text-[10px] text-white/40 font-medium truncate group-hover:text-white/70 transition-colors">{ch.name}</span>
                <span className="text-[9px] text-white/20 ml-auto font-bold">{ch.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Health Bars */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2">
                <Activity size={14} className="text-green-400" />
                Channel Health
              </h3>
              <p className="text-[10px] text-white/30 mt-0.5">Performance score by channel</p>
            </div>
            <Link to="/ventures" className="text-[10px] text-blue-400 font-medium hover:text-blue-300 flex items-center gap-1 transition-colors">
              Details <ArrowUpRight size={10} />
            </Link>
          </div>
          <div className="space-y-4">
            {ventures.map((v) => {
              const Icon = ventureIcons[v.id] || Zap
              const healthScore = Math.floor(Math.random() * 40) + 40
              return (
                <div key={v.id} className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${v.color}15` }}>
                      <Icon size={12} style={{ color: v.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white/80 truncate">{v.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/30 font-medium">{v.category}</span>
                          <span className="text-[10px] font-bold" style={{ color: v.color }}>$0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden ml-10">
                    <div className="h-full rounded-full transition-all duration-700 group-hover:shadow-lg"
                      style={{ width: `${healthScore}%`, backgroundColor: v.color, boxShadow: `0 0 8px ${v.color}40` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Venture Cards Grid (The Shards) ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white/90 flex items-center gap-2">
            <Layers size={14} className="text-blue-400" />
            All Revenue Channels
          </h3>
          <Link to="/ventures" className="text-[10px] text-blue-400 font-medium hover:text-blue-300 flex items-center gap-1">
            Manage channels <ArrowUpRight size={10} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ventures.map((v, idx) => {
            const Icon = ventureIcons[v.id] || Zap
            const isHovered = hoveredVenture === v.id
            return (
              <Link key={v.id} to="/ventures"
                className={`glass-card rounded-2xl p-5 transition-all duration-300 group relative overflow-hidden ${isHovered ? ventureGlows[v.id] : ''}`}
                onMouseEnter={() => setHoveredVenture(v.id)}
                onMouseLeave={() => setHoveredVenture(null)}>
                <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full blur-3xl transition-opacity duration-500"
                  style={{ backgroundColor: v.color, opacity: isHovered ? 0.08 : 0.02 }} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                        style={{ backgroundColor: `${v.color}10`, borderColor: `${v.color}20` }}>
                        <Icon size={16} style={{ color: v.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">{v.name}</p>
                        <p className="text-[10px] text-white/30 font-medium">{v.category}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]">
                      <p className="text-[9px] text-white/30 font-bold uppercase tracking-wider">Revenue</p>
                      <p className="text-base font-bold text-white tracking-tight mt-0.5">$0</p>
                    </div>
                    <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]">
                      <p className="text-[9px] text-white/30 font-bold uppercase tracking-wider">MRR</p>
                      <p className="text-base font-bold text-white tracking-tight mt-0.5">$0</p>
                    </div>
                  </div>
                  <div className="flex items-end gap-[3px] h-10">
                    {[30, 45, 35, 55, 40, 65, 50, 70, 55, 80, 60, 75].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm transition-all duration-300"
                        style={{ height: `${h * 0.4}px`, backgroundColor: i >= 10 ? v.color : `${v.color}20`,
                          opacity: isHovered ? (i >= 8 ? 1 : 0.6) : (i >= 10 ? 0.8 : 0.3) }} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.04]">
                    <span className="text-[10px] text-white/20 font-medium">{v.location || 'Online'}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: v.color }} />
                      <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: v.color }}>Active</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Bottom Row: Quick Access Shards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/jamka" className="glass-card rounded-2xl p-6 transition-all group relative overflow-hidden hover:glow-pink">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-rose-500/5 blur-2xl group-hover:bg-rose-500/10 transition-all" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Heart size={16} className="text-rose-400" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Project</p>
                <p className="text-sm font-semibold text-white/90">Jamka</p>
              </div>
            </div>
            <div className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.04] group-hover:bg-rose-500/5 transition-colors">
              <span className="text-[9px] font-bold text-white/20 uppercase block mb-0.5">Status</span>
              <span className="text-xs font-semibold text-white/60">Planning Phase</span>
            </div>
          </div>
        </Link>

        <Link to="/university" className="glass-card rounded-2xl p-6 transition-all group hover:glow-purple">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Star size={16} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Academic</p>
              <p className="text-sm font-semibold text-white/90">Senior Year — Bard</p>
            </div>
          </div>
          <div className="flex justify-between items-end mb-3">
            <div>
              <span className="text-[9px] font-bold text-white/20 uppercase block mb-0.5">Progress</span>
              <span className="text-lg font-bold text-white/90">Senior I</span>
            </div>
            <span className="text-[10px] text-indigo-400 font-semibold">Dec 2026</span>
          </div>
          <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[75%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.4)]" />
          </div>
        </Link>

        <Link to="/deadlines" className="glass-card rounded-2xl p-6 transition-all group hover:glow-amber">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Clock size={16} className="text-amber-400" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Upcoming</p>
              <p className="text-sm font-semibold text-white/90">Deadlines</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 bg-white/[0.03] rounded-xl border border-white/[0.04] group-hover:border-amber-500/10 transition-colors">
              <span className="text-xs text-white/60 font-medium">OPT Application</span>
              <span className="text-[10px] text-amber-400 font-bold">Jul 2026</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-white/[0.03] rounded-xl border border-white/[0.04] group-hover:border-amber-500/10 transition-colors">
              <span className="text-xs text-white/60 font-medium">Tax Filing</span>
              <span className="text-[10px] text-amber-400 font-bold">Apr 2026</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
