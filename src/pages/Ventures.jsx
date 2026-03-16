import { useState, useEffect } from 'react'
import { Building, Bot, Package, Chrome, DollarSign, Plus, X } from 'lucide-react'
import { ventures as defaultVentures } from '../data/ventures'
import { getLocalData, saveLocalData, addItem } from '../lib/storage'

const ventureIcons = {
  siml: Building,
  corvus: Bot,
  amazon: Package,
  chrome: Chrome,
}

const ventureBrandColors = {
  siml: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
  corvus: { bg: 'bg-slate-100', text: 'text-slate-700' },
  amazon: { bg: 'bg-amber-50', text: 'text-amber-600' },
  chrome: { bg: 'bg-blue-50', text: 'text-blue-500' },
}

const categories = ['All', 'SaaS', 'AI Agency', 'E-Commerce', 'Software']

export default function Ventures() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVenture, setSelectedVenture] = useState(null)
  const [ventures, setVentures] = useState(defaultVentures)
  const [showAddRevenue, setShowAddRevenue] = useState(false)
  const [revenueAmount, setRevenueAmount] = useState('')
  const [revenueNote, setRevenueNote] = useState('')
  const [revenueEntries, setRevenueEntries] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const stored = await getLocalData('ventures')
      if (Array.isArray(stored) && stored.length > 0) setVentures(stored)
    } catch (e) {
      console.warn('Failed to load ventures:', e)
    }
    try {
      const entries = await getLocalData('revenue_entries')
      if (Array.isArray(entries) && entries.length > 0) setRevenueEntries(entries)
    } catch (e) {
      console.warn('Failed to load revenue entries:', e)
    }
  }

  const handleAddRevenue = async () => {
    if (!selectedVenture || !revenueAmount || parseFloat(revenueAmount) <= 0) return

    const entry = {
      ventureId: selectedVenture,
      amount: parseFloat(revenueAmount),
      note: revenueNote,
      date: new Date().toISOString(),
      id: Date.now(),
    }

    const newEntries = [...revenueEntries, entry]
    setRevenueEntries(newEntries)
    await saveLocalData('revenue_entries', newEntries)

    const updated = ventures.map(v => {
      if (v.id === selectedVenture) {
        return {
          ...v,
          metrics: { ...v.metrics, revenue: (v.metrics?.revenue || 0) + entry.amount },
          revenue: (v.revenue || 0) + entry.amount,
        }
      }
      return v
    })
    setVentures(updated)
    await saveLocalData('ventures', updated)

    setRevenueAmount('')
    setRevenueNote('')
    setShowAddRevenue(false)
  }

  const filtered = selectedCategory === 'All' ? ventures : ventures.filter((v) => v.category === selectedCategory)
  const detail = selectedVenture ? ventures.find((v) => v.id === selectedVenture) : null
  const totalRevenue = ventures.reduce((s, v) => s + (v.metrics?.revenue || v.revenue || 0), 0)

  // Get revenue entries for selected venture
  const ventureEntries = selectedVenture
    ? revenueEntries.filter(e => e.ventureId === selectedVenture).reverse().slice(0, 10)
    : []

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Ventures</h1>
          <p className="text-sm text-slate-500 mt-1">Track all 4 revenue streams</p>
        </div>
        <button
          onClick={() => { setShowAddRevenue(true); if (!selectedVenture && ventures.length > 0) setSelectedVenture(ventures[0].id) }}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors w-fit"
        >
          <Plus size={16} />
          Add Revenue
        </button>
      </div>

      {/* Add Revenue Form */}
      {showAddRevenue && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Add Manual Revenue</h3>
            <button onClick={() => setShowAddRevenue(false)} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <select
              value={selectedVenture || ''}
              onChange={(e) => setSelectedVenture(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 ring-blue-500/20"
            >
              {ventures.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
            <input
              type="number"
              step="0.01"
              value={revenueAmount}
              onChange={(e) => setRevenueAmount(e.target.value)}
              placeholder="Amount ($)"
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 ring-blue-500/20 font-mono-nums"
            />
            <input
              type="text"
              value={revenueNote}
              onChange={(e) => setRevenueNote(e.target.value)}
              placeholder="Note (optional)"
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 ring-blue-500/20"
            />
            <button onClick={handleAddRevenue} className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 transition-colors">
              Save
            </button>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/60 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-600">Total Monthly Revenue</p>
            <p className="text-3xl font-bold mt-1 revenue-text font-mono-nums">
              ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <DollarSign size={32} className="text-emerald-600 opacity-20" />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((venture) => {
          const Icon = ventureIcons[venture.id] || Building
          const brand = ventureBrandColors[venture.id] || { bg: 'bg-slate-50', text: 'text-slate-600' }
          const ventureRevenue = venture.metrics?.revenue || venture.revenue || 0
          return (
            <div key={venture.id} onClick={() => setSelectedVenture(venture.id)} className={`bg-white border-2 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer ${selectedVenture === venture.id ? 'border-blue-500' : 'border-slate-200'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${brand.bg} flex items-center justify-center`}>
                  <Icon size={20} className={brand.text} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{venture.category}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">{venture.name}</h3>
              <p className="text-xs text-slate-500 mb-4">{venture.description}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold font-mono-nums revenue-text">
                    ${ventureRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Monthly</p>
                </div>
                <div className="flex gap-px items-end h-8">
                  {[40, 60, 45, 70, 55, 80].map((h, i) => (
                    <div key={i} className="w-2 rounded-t-sm" style={{ height: `${h * 0.3}px`, backgroundColor: i === 5 ? venture.color : '#f1f5f9', opacity: i === 5 ? 0.8 : 1 }} />
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {detail && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">{detail.name} — Details</h2>
            <button onClick={() => setSelectedVenture(null)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Monthly Revenue</p>
              <p className="text-2xl font-bold font-mono-nums revenue-text">${(detail.metrics?.revenue || detail.revenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Category</p>
              <p className="text-lg font-bold text-slate-900">{detail.category}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Status</p>
              <p className="text-lg font-bold text-green-600">Active</p>
            </div>
          </div>

          {/* Revenue History for this venture */}
          {ventureEntries.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Revenue History</h3>
              <div className="space-y-2">
                {ventureEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{entry.note || 'Revenue entry'}</p>
                      <p className="text-[10px] text-slate-400">{new Date(entry.date).toLocaleDateString()}</p>
                    </div>
                    <span className="text-sm font-bold font-mono-nums revenue-text">+${entry.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
