import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-slate-900 text-white font-mono font-bold text-sm leading-none px-2.5 py-1.5 rounded-lg min-w-[40px] text-center tabular-nums tracking-tight shadow-sm">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-1">{label}</span>
    </div>
  )
}

export default function Header() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [now, setNow] = useState(new Date())
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const current = new Date()
      setNow(current)
      const target = new Date('January 1, 2027 00:00:00').getTime()
      const diff = target - current.getTime()
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        })
      }
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  return (
    <header className="h-16 lg:h-20 border-b border-slate-200/60 bg-white/80 backdrop-blur flex items-center justify-between px-4 lg:px-10 shrink-0 gap-4">
      {/* Left: date */}
      <div className="hidden md:flex flex-col ml-12 lg:ml-0">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">Today</span>
        <span className="text-xs font-semibold text-slate-800 mt-0.5 tracking-tight">{formattedDate}</span>
      </div>

      {/* Center: countdown to 2027 */}
      <div className="flex items-center gap-3 mx-auto">
        <div className="hidden sm:flex flex-col items-end mr-1">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">Until 2027</span>
          <span className="text-[9px] text-slate-400 mt-0.5">2026 goal countdown</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CountdownUnit value={countdown.days} label="days" />
          <span className="font-mono font-bold text-slate-300 text-lg mb-3">:</span>
          <CountdownUnit value={countdown.hours} label="hrs" />
          <span className="font-mono font-bold text-slate-300 text-lg mb-3">:</span>
          <CountdownUnit value={countdown.minutes} label="min" />
          <span className="font-mono font-bold text-blue-400 text-lg mb-3">:</span>
          <CountdownUnit value={countdown.seconds} label="sec" />
        </div>
      </div>

      {/* Right: logout */}
      <button
        onClick={() => { logout(); navigate('/login') }}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-red-600 transition-colors shrink-0"
        title="Sign out"
      >
        <LogOut size={16} />
      </button>
    </header>
  )
}
