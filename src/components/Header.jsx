import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Search, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
  }).toUpperCase()

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <header className="h-16 lg:h-20 border-b border-slate-200/60 bg-white/80 backdrop-blur flex items-center justify-between px-4 lg:px-10 shrink-0">
      <div className="flex items-center gap-4 lg:gap-8 ml-12 lg:ml-0">
        <div className="hidden md:flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">
            Current Time
          </span>
          <span className="text-xs font-semibold text-slate-900 mt-0.5 tabular-nums">
            {formattedTime}
          </span>
        </div>

        <div className="hidden md:block h-8 w-px bg-slate-200"></div>

        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">
            Today
          </span>
          <span className="text-xs font-semibold text-slate-900 mt-0.5 tracking-tight">
            {formattedDate}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex bg-slate-100 border border-slate-200 rounded-xl pl-3 pr-2 py-1.5 items-center gap-2">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none text-xs font-medium outline-none w-36 text-slate-700 placeholder:text-slate-400"
          />
        </div>
        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-blue-600 transition-colors relative">
          <Bell size={16} />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full"></div>
        </button>
        <button 
          onClick={() => { logout(); navigate('/login'); }}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-red-600 transition-colors"
          title="Sign out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  )
}
