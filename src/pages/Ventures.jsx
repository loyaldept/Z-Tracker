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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Revenue Channels</h1>
          <p className="text-sm text-slate-500 mt-1">Track performance across all 9 ventures</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Combined Revenue Chart */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Combined Revenue — All Channels</h3>
            <p className="text-xs text-slate-500 mt-0.5">Stacked view of revenue streams</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '11px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              }}
            />
            {ventures.map((v) => (
              <Bar key={v.id} dataKey={v.id} stackId="revenue" fill={v.color} radius={v.id === 'newsletter' ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-100">
          {ventures.map((v) => (
            <div key={v.id} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: v.color }}></div>
              <span className="text-[10px] text-slate-600 font-medium">{v.name}</span>
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
              className={`text-left bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all ${
                isSelected ? 'border-blue-300 ring-2 ring-blue-100' : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: v.bgColor }}
                  >
                    <Icon size={18} style={{ color: v.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{v.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{v.location}</p>
                  </div>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: v.bgColor, color: v.color }}
                >
                  {v.category}
                </span>
              </div>

              <p className="text-xs text-slate-500 mb-4">{v.description}</p>

              {/* Mini Chart */}
              <div className="h-16 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={v.chartData}>
                    <defs>
                      <linearGradient id={`grad-${v.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={v.color} stopOpacity={0.2} />
                        <stop offset="100%" stopColor={v.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="revenue" stroke={v.color} strokeWidth={2} fill={`url(#grad-${v.id})`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Revenue</span>
                  <span className="text-sm font-bold text-slate-900">$0.00</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">MRR</span>
                  <span className="text-sm font-bold text-slate-900">$0.00</span>
                </div>
              </div>

              {/* Siml-specific: Customers chart */}
              {v.id === 'siml' && (
                <div className="mt-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-blue-600 uppercase">Customers</span>
                    <Users size={12} className="text-blue-400" />
                  </div>
                  <div className="flex items-end gap-4">
                    <div>
                      <p className="text-lg font-bold text-slate-900">0</p>
                      <p className="text-[10px] text-slate-500">Total</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600">0</p>
                      <p className="text-[10px] text-slate-500">Paying</p>
                    </div>
                    <div className="flex-1 flex gap-px items-end h-10 justify-end">
                      {[20, 35, 25, 40, 30, 50, 45, 60].map((h, i) => (
                        <div
                          key={i}
                          className="w-2 rounded-t-sm"
                          style={{
                            height: `${h * 0.5}px`,
                            backgroundColor: i >= 6 ? '#3b82f6' : '#dbeafe',
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Corvus-specific */}
              {v.id === 'corvus' && (
                <div className="mt-3 p-3 bg-purple-50/50 rounded-xl border border-purple-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-purple-600 uppercase">Partnership</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-xs text-slate-700 font-medium">Zuhayr — 50%</p>
                      <div className="h-1.5 bg-purple-200 rounded-full mt-1">
                        <div className="h-full bg-purple-500 w-1/2 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-700 font-medium">Erkebai — 50%</p>
                      <div className="h-1.5 bg-indigo-200 rounded-full mt-1">
                        <div className="h-full bg-indigo-500 w-1/2 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Chrome Extensions specific */}
              {v.id === 'chrome' && (
                <div className="mt-3 p-3 bg-green-50/50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Chrome size={12} className="text-green-600" />
                    <span className="text-[10px] font-bold text-green-600 uppercase">Extensions</span>
                  </div>
                  <p className="text-xs text-slate-600">LetsWind + more coming</p>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Detail Panel */}
      {detail && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: detail.bgColor }}
              >
                {(() => { const Icon = ventureIcons[detail.id] || Zap; return <Icon size={22} style={{ color: detail.color }} /> })()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{detail.name} — Detailed Analytics</h3>
                <p className="text-xs text-slate-500">{detail.description} • {detail.location}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedVenture(null)}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Revenue Trend</h4>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={detail.chartData}>
                  <defs>
                    <linearGradient id={`detail-grad-${detail.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={detail.color} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={detail.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke={detail.color} strokeWidth={2} fill={`url(#detail-grad-${detail.id})`} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(detail.metrics).map(([key, val]) => (
                <div key={key} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-lg font-bold text-slate-900">
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

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-700 font-medium">
              <span className="font-bold">API Integration Required:</span> Connect your {detail.name} API to start tracking real revenue data.
              Data shown is placeholder — configure in Settings → Integrations.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
