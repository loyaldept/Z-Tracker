import { useState } from 'react'
import useSWR from 'swr'
import {
  PiggyBank, Plus, Wallet, ArrowUpRight, ArrowDownRight,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { fetchFromDatabase, insertToDatabase } from '../lib/supabase'

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
  { name: 'Housing', amount: 0, color: '#3b82f6', percent: 0 },
  { name: 'Food', amount: 0, color: '#10b981', percent: 0 },
  { name: 'Transport', amount: 0, color: '#f59e0b', percent: 0 },
  { name: 'Business', amount: 0, color: '#8b5cf6', percent: 0 },
  { name: 'Personal', amount: 0, color: '#ec4899', percent: 0 },
  { name: 'Other', amount: 0, color: '#6b7280', percent: 0 },
]

export default function Savings() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', type: 'income' })
  const [isLoading, setIsLoading] = useState(false)

  const { data: dbTransactions = [], mutate } = useSWR('transactions', () => fetchFromDatabase('transactions'), {
    revalidateOnFocus: false,
  })

  const transactions = dbTransactions || []

  const addTransaction = async () => {
    if (newTransaction.description && newTransaction.amount) {
      setIsLoading(true)
      const result = await insertToDatabase('transactions', [{
        description: newTransaction.description,
        amount: parseFloat(newTransaction.amount),
        type: newTransaction.type,
        date: new Date().toISOString(),
      }])
      if (result) {
        setNewTransaction({ description: '', amount: '', type: 'income' })
        setShowAddForm(false)
        mutate()
      }
      setIsLoading(false)
    }
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
        <div className="glass-card rounded-2xl p-5 animate-slide-up">
          <h3 className="text-sm font-semibold text-white/90 mb-4">New Transaction</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input type="text" value={newTransaction.description} onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })} placeholder="Description"
              className="px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 outline-none focus:ring-2 ring-blue-500/20 placeholder:text-white/20" />
            <input type="number" value={newTransaction.amount} onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })} placeholder="Amount"
              className="px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 outline-none focus:ring-2 ring-blue-500/20 placeholder:text-white/20" />
            <select value={newTransaction.type} onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
              className="px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white/80 outline-none">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button onClick={addTransaction} disabled={isLoading}
              className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/15 disabled:opacity-50">
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

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-base font-semibold text-white/90 mb-1">Savings Over Time</h3>
        <p className="text-xs text-white/30 mb-4">Monthly savings vs expenses — 2026</p>
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

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-base font-semibold text-white/90 mb-4">Expense Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <div key={cat.name} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.04]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                <span className="text-xs font-semibold text-white/60">{cat.name}</span>
              </div>
              <p className="text-lg font-bold text-white/90">${cat.amount.toFixed(2)}</p>
              <div className="h-1 w-full bg-white/[0.04] rounded-full mt-2">
                <div className="h-full rounded-full" style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-base font-semibold text-white/90 mb-4">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <div className="text-center py-10 text-white/20">
            <Wallet size={28} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">No transactions yet</p>
            <p className="text-xs mt-1 text-white/10">Add your first transaction to start tracking</p>
          </div>
        ) : (
          <div className="space-y-2">
            {[...transactions].reverse().map((t, idx) => (
              <div key={t.id || idx} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'income' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    {t.type === 'income' ? <ArrowUpRight size={14} className="text-green-400" /> : <ArrowDownRight size={14} className="text-red-400" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{t.description}</p>
                    <p className="text-[10px] text-white/30">{new Date(t.date || Date.now()).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                  {t.type === 'income' ? '+' : '-'}${(t.amount || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
