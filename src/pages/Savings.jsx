import { useState, useEffect } from 'react'
import { PiggyBank, Plus, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { getLocalData, addItem, deleteItem } from '../lib/storage'

const savingsData = [
  { month: 'Jan', savings: 0, expenses: 0 },
  { month: 'Feb', savings: 0, expenses: 0 },
  { month: 'Mar', savings: 0, expenses: 0 },
  { month: 'Apr', savings: 0, expenses: 0 },
  { month: 'May', savings: 0, expenses: 0 },
  { month: 'Jun', savings: 0, expenses: 0 },
  { month: 'Jul', savings: 0, expenses: 0 },
  { month: 'Aug', savings: 0, expenses: 0 },
  { month: 'Sep', savings: 0, expenses: 0 },
  { month: 'Oct', savings: 0, expenses: 0 },
  { month: 'Nov', savings: 0, expenses: 0 },
  { month: 'Dec', savings: 0, expenses: 0 },
]

const categories = [
  { name: 'Housing', color: '#3b82f6' },
  { name: 'Food', color: '#10b981' },
  { name: 'Transport', color: '#f59e0b' },
  { name: 'Business', color: '#8b5cf6' },
  { name: 'Personal', color: '#ec4899' },
  { name: 'Other', color: '#6b7280' },
]

export default function Savings() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', type: 'income', category: 'Other' })
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    const data = await getLocalData('transactions')
    setTransactions(data)
  }

  const handleAddTransaction = async () => {
    if (newTransaction.description && newTransaction.amount) {
      setIsLoading(true)
      const transaction = await addItem('transactions', {
        description: newTransaction.description,
        amount: parseFloat(newTransaction.amount),
        type: newTransaction.type,
        category: newTransaction.category,
        date: new Date().toISOString(),
      })
      setTransactions([...transactions, transaction])
      setNewTransaction({ description: '', amount: '', type: 'income', category: 'Other' })
      setShowAddForm(false)
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    await deleteItem('transactions', id)
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + (t.amount || 0), 0)
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + (t.amount || 0), 0)
  const netSavings = totalIncome - totalExpenses

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Savings</h1>
          <p className="text-sm text-white/40 mt-1">Track income, expenses, and savings goals</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-500 transition-colors w-fit">
          <Plus size={16} />
          Add Transaction
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm animate-slide-up">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">New Transaction</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input type="text" value={newTransaction.description} onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })} placeholder="Description" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 ring-blue-500/20" />
            <input type="number" value={newTransaction.amount} onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })} placeholder="Amount" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 ring-blue-500/20" />
            <select value={newTransaction.type} onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select value={newTransaction.category} onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none">
              {categories.map(cat => <option key={cat.name}>{cat.name}</option>)}
            </select>
            <button onClick={handleAddTransaction} disabled={isLoading} className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50">
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
              <ArrowUpRight size={16} className="text-green-400" />
            </div>
            <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-bold border border-green-500/20">INCOME</span>
          </div>
          <p className="text-2xl font-bold text-white tracking-tight">${totalIncome.toFixed(2)}</p>
          <p className="text-xs text-white/30 mt-1">Total Income</p>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
              <ArrowDownRight size={16} className="text-red-400" />
            </div>
            <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full font-bold border border-red-500/20">EXPENSES</span>
          </div>
          <p className="text-2xl font-bold text-white tracking-tight">${totalExpenses.toFixed(2)}</p>
          <p className="text-xs text-white/30 mt-1">Total Expenses</p>
        </div>

        <div className={`rounded-2xl p-5 border ${netSavings >= 0 ? 'bg-green-500/5 border-green-500/20 glow-green' : 'bg-red-500/5 border-red-500/20'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${netSavings >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
              <PiggyBank size={16} className={netSavings >= 0 ? 'text-green-400' : 'text-red-400'} />
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${netSavings >= 0 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              NET
            </span>
          </div>
          <p className="text-2xl font-bold text-white tracking-tight">${netSavings.toFixed(2)}</p>
          <p className="text-xs text-white/30 mt-1">Net Savings</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Savings Over Time</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={savingsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip contentStyle={{ background: 'rgba(20,20,35,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: 'white' }} />
            <Bar dataKey="savings" fill="#10b981" radius={[4, 4, 0, 0]} name="Savings" />
            <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expenses" opacity={0.6} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <div className="text-center py-10 text-white/20">
            <Wallet size={28} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">No transactions yet</p>
            <p className="text-xs mt-1 text-white/10">Add your first transaction to start tracking</p>
          </div>
        ) : (
          <div className="space-y-2">
            {[...transactions].reverse().map((t, idx) => (
              <div key={t.id || idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors group">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'income' ? 'bg-green-50' : 'bg-red-50'}`}>
                    {t.type === 'income' ? <ArrowUpRight size={14} className="text-green-600" /> : <ArrowDownRight size={14} className="text-red-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{t.description}</p>
                    <p className="text-[10px] text-white/30">{new Date(t.date || Date.now()).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </span>
                  <button onClick={() => handleDelete(t.id)} className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs font-medium transition-opacity">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
