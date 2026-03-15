import { useState, useEffect } from 'react'
import { Building, Bot, Package, Chrome, FileText, TrendingUp, ShoppingBag, Zap, Mail, DollarSign, Plus, X } from 'lucide-react'
import { ventures as defaultVentures } from '../data/ventures'
import { getLocalData, addItem } from '../lib/storage'

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

export default function Ventures() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVenture, setSelectedVenture] = useState(null)
  const [ventures, setVentures] = useState(defaultVentures)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newVenture, setNewVenture] = useState({ name: '', category: 'SaaS', revenue: 0, color: '#3b82f6' })

  useEffect(() => {
    loadVentures()
  }, [])

  const loadVentures = async () => {
    const stored = await getLocalData('ventures')
    if (stored.length > 0) {
      setVentures(stored)
    }
  }

  const handleAddVenture = async () => {
    if (newVenture.name && newVenture.category) {
      const venture = await addItem('ventures', {
        name: newVenture.name,
        category: newVenture.category,
        revenue: parseFloat(newVenture.revenue) || 0,
        color: newVenture.color,
        bgColor: `${newVenture.color}20`,
      })
      setVentures([...ventures, venture])
      setNewVenture({ name: '', category: 'SaaS', revenue: 0, color: '#3b82f6' })
      setShowAddForm(false)
    }
  }

  const filtered = selectedCategory === 'All' ? ventures : ventures.filter((v) => v.category === selectedCategory)
  const detail = selectedVenture ? ventures.find((v) => v.id === selectedVenture) : null
  const totalRevenue = ventures.reduce((s, v) => s + (v.revenue || 0), 0)

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Ventures</h1>
          <p className="text-sm text-slate-500 mt-1">Track all 9+ revenue streams</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors w-fit">
          <Plus size={16} />
          Add Venture
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm animate-slide-up">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">New Venture</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input type="text" value={newVenture.name} onChange={(e) => setNewVenture({ ...newVenture, name: e.target.value })} placeholder="Venture name" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 ring-blue-500/20" />
            <select value={newVenture.category} onChange={(e) => setNewVenture({ ...newVenture, category: e.target.value })} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none">
              {categories.slice(1).map(cat => <option key={cat}>{cat}</option>)}
            </select>
            <input type="number" value={newVenture.revenue} onChange={(e) => setNewVenture({ ...newVenture, revenue: e.target.value })} placeholder="Monthly revenue" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 ring-blue-500/20" />
            <button onClick={handleAddVenture} className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800">Save</button>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-600">Total Monthly Revenue</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
          <DollarSign size={32} className="text-blue-600 opacity-20" />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((venture) => {
          const Icon = ventureIcons[venture.id] || Building
          return (
            <div key={venture.id} onClick={() => setSelectedVenture(venture.id)} className={`bg-white border-2 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer ${selectedVenture === venture.id ? 'border-blue-500' : 'border-slate-200'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: venture.bgColor || '#f1f5f9' }}>
                  <Icon size={16} style={{ color: venture.color }} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{venture.category}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">{venture.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{venture.description}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-900">${(venture.revenue || 0).toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">Monthly</p>
                </div>
                <div className="flex gap-px items-end h-8">
                  {[40, 60, 45, 70, 55, 80].map((h, i) => (
                    <div key={i} className="w-1.5 rounded-t-sm" style={{ height: `${h * 0.3}px`, backgroundColor: i === 5 ? venture.color : '#f1f5f9', opacity: i === 5 ? 0.8 : 1 }}></div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {detail && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">{detail.name} — Details</h2>
            <button onClick={() => setSelectedVenture(null)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Monthly Revenue</p>
              <p className="text-2xl font-bold text-slate-900">${(detail.revenue || 0).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Category</p>
              <p className="text-lg font-semibold text-slate-900">{detail.category}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Status</p>
              <p className="text-lg font-semibold text-green-600">Active</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
