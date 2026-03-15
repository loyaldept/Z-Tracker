import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import {
  Building, Bot, Package, Chrome, FileText, TrendingUp,
  ShoppingBag, Zap, Mail, Users, DollarSign, ArrowUpRight,
  ArrowDownRight, Filter, ChevronDown,
} from 'lucide-react'
import { ventures } from '../data/ventures'

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

const categories = ['All', 'SaaS', 'AI Agency', 'E-Commerce', 'Software', 'Digital Products', 'FinTech', 'Platform', 'Media']

const combinedData = [
  { month: 'Jan', siml: 0, corvus: 0, amazon: 0, chrome: 0, notion: 0, trading: 0, tiktok: 0, openclaw: 0, newsletter: 0 },
  { month: 'Feb', siml: 0, corvus: 0, amazon: 0, chrome: 0, notion: 0, trading: 0, tiktok: 0, openclaw: 0, newsletter: 0 },
  { month: 'Mar', siml: 0, corvus: 0, amazon: 0, chrome: 0, notion: 0, trading: 0, tiktok: 0, openclaw: 0, newsletter: 0 },
  { month: 'Apr', siml: 0, corvus: 0, amazon: 0, chrome: 0, notion: 0, trading: 0, tiktok: 0, openclaw: 0, newsletter: 0 },
  { month: 'May', siml: 0, corvus: 0, amazon: 0, chrome: 0, notion: 0, trading: 0, tiktok: 0, openclaw: 0, newsletter: 0 },
  { month: 'Jun', siml: 0, corvus: 0, amazon: 0, chrome: 0, notion: 0, trading: 0, tiktok: 0, openclaw: 0, newsletter: 0 },
]

export default function Ventures() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVenture, setSelectedVenture] = useState(null)

  const filtered = selectedCategory === 'All'
    ? ventures
    : ventures.filter((v) => v.category === selectedCategory)

  const detail = selectedVenture ? ventures.find((v) => v.id === selectedVenture) : null

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Revenue Channels</h1>
          <p className="text-sm text-white/40 mt-1">Track performance across all 9 ventures</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-white/10 text-white border border-white/10'
                  : 'text-white/40 border border-white/[0.06] hover:border-white/10 hover:text-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Combined Revenue Chart */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-white/90">Combined Revenue — All Channels</h3>
            <p className="text-xs text-white/30 mt-0.5">Stacked view of revenue streams</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                background: 'rgba(20,20,35,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '11px',
                color: 'white',
              }}
            />
            {ventures.map((v) => (
              <Bar key={v.id} dataKey={v.id} stackId="revenue" fill={v.color} radius={v.id === 'newsletter' ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/[0.04]">
          {ventures.map((v) => (
            <div key={v.id} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: v.color }}></div>
              <span className="text-[10px] text-white/40 font-medium">{v.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Venture Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((v) => {
          const Icon = ventureIcons[v.id] || Zap
          const isSelected = selectedVenture === v.id
          return (
            <button
              key={v.id}
              onClick={() => setSelectedVenture(isSelected ? null : v.id)}
              className={`text-left glass-card rounded-2xl p-5 transition-all ${
                isSelected ? 'ring-1 ring-blue-500/30 border-blue-500/20' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${v.color}15` }}
                  >
                    <Icon size={18} style={{ color: v.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/90">{v.name}</p>
                    <p className="text-[10px] text-white/30 font-medium">{v.location}</p>
                  </div>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${v.color}15`, color: v.color }}
                >
                  {v.category}
                </span>
              </div>

              <p className="text-xs text-white/40 mb-4">{v.description}</p>

              {/* Mini Chart */}
              <div className="h-16 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={v.chartData}>
                    <defs>
                      <linearGradient id={`grad-${v.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={v.color} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={v.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="revenue" stroke={v.color} strokeWidth={2} fill={`url(#grad-${v.id})`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.03] rounded-lg p-2.5 border border-white/[0.04]">
                  <span className="text-[10px] text-white/30 font-bold uppercase block">Revenue</span>
                  <span className="text-sm font-bold text-white/90">$0.00</span>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-2.5 border border-white/[0.04]">
                  <span className="text-[10px] text-white/30 font-bold uppercase block">MRR</span>
                  <span className="text-sm font-bold text-white/90">$0.00</span>
                </div>
              </div>

              {v.id === 'siml' && (
                <div className="mt-3 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-blue-400 uppercase">Customers</span>
                    <Users size={12} className="text-blue-400" />
                  </div>
                  <div className="flex items-end gap-4">
                    <div>
                      <p className="text-lg font-bold text-white/90">0</p>
                      <p className="text-[10px] text-white/30">Total</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-400">0</p>
                      <p className="text-[10px] text-white/30">Paying</p>
                    </div>
                    <div className="flex-1 flex gap-px items-end h-10 justify-end">
                      {[20, 35, 25, 40, 30, 50, 45, 60].map((h, i) => (
                        <div
                          key={i}
                          className="w-2 rounded-t-sm"
                          style={{
                            height: `${h * 0.5}px`,
                            backgroundColor: i >= 6 ? '#3b82f6' : 'rgba(59,130,246,0.2)',
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {v.id === 'corvus' && (
                <div className="mt-3 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-purple-400 uppercase">Partnership</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-xs text-white/60 font-medium">Zuhayr — 50%</p>
                      <div className="h-1.5 bg-purple-500/20 rounded-full mt-1">
                        <div className="h-full bg-purple-500 w-1/2 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-white/60 font-medium">Erkebai — 50%</p>
                      <div className="h-1.5 bg-indigo-500/20 rounded-full mt-1">
                        <div className="h-full bg-indigo-500 w-1/2 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {v.id === 'chrome' && (
                <div className="mt-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Chrome size={12} className="text-green-400" />
                    <span className="text-[10px] font-bold text-green-400 uppercase">Extensions</span>
                  </div>
                  <p className="text-xs text-white/40">LetsWind + more coming</p>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Detail Panel */}
      {detail && (
        <div className="glass-card rounded-2xl p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${detail.color}15` }}
              >
                {(() => { const Icon = ventureIcons[detail.id] || Zap; return <Icon size={22} style={{ color: detail.color }} /> })()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white/90">{detail.name} — Detailed Analytics</h3>
                <p className="text-xs text-white/40">{detail.description} &bull; {detail.location}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedVenture(null)}
              className="text-xs text-white/30 hover:text-white/60 font-medium"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-white/80 mb-3">Revenue Trend</h4>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={detail.chartData}>
                  <defs>
                    <linearGradient id={`detail-grad-${detail.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={detail.color} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={detail.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(20,20,35,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: 'white' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke={detail.color} strokeWidth={2} fill={`url(#detail-grad-${detail.id})`} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(detail.metrics).map(([key, val]) => (
                <div key={key} className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.04]">
                  <span className="text-[10px] text-white/30 font-bold uppercase block mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-lg font-bold text-white/90">
                    {typeof val === 'number' && key.toLowerCase().includes('revenue') || key === 'mrr'
                      ? `$${val.toFixed(2)}`
                      : key === 'growth' || key === 'winRate' || key === 'openRate'
                      ? `${val}%`
                      : val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <p className="text-xs text-blue-300 font-medium">
              <span className="font-bold">API Integration Required:</span> Connect your {detail.name} API to start tracking real revenue data.
              Data shown is placeholder — configure in Settings &rarr; Integrations.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
