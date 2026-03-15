import { useState, useEffect } from 'react'
import { Bell, Search } from 'lucide-react'

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)

      const target = new Date('December 31, 2026 23:59:59').getTime()
      const diff = target - now.getTime()

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).toUpperCase()

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <header className="h-16 lg:h-20 border-b border-slate-200/60 glass flex items-center justify-between px-4 lg:px-10 shrink-0">
      <div className="flex items-center gap-4 lg:gap-8 ml-12 lg:ml-0">
        <div className="hidden md:flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold">
            Current Time
          </span>
          <span className="text-xs font-semibold text-slate-900 mt-0.5 tabular-nums">
            {formattedTime}
          </span>
        </div>

        <div className="hidden md:block h-8 w-px bg-slate-200"></div>

        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold">
            Today
          </span>
          <span className="text-xs font-semibold text-slate-900 mt-0.5 tracking-tight">
            {formattedDate}
          </span>
        </div>

        <div className="hidden sm:block h-8 w-px bg-slate-200"></div>

        <div className="hidden sm:flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.15em] text-blue-500 font-bold">
            End of 2026
          </span>
          <div className="flex gap-1.5 mt-0.5">
            <span className="text-xs font-bold text-slate-900 tabular-nums bg-slate-100 px-1.5 py-0.5 rounded">
              {countdown.days}d
            </span>
            <span className="text-xs font-bold text-slate-900 tabular-nums bg-slate-100 px-1.5 py-0.5 rounded">
              {countdown.hours}h
            </span>
            <span className="text-xs font-bold text-slate-900 tabular-nums bg-slate-100 px-1.5 py-0.5 rounded">
              {countdown.minutes}m
            </span>
            <span className="text-xs font-bold text-blue-600 tabular-nums bg-blue-50 px-1.5 py-0.5 rounded">
              {countdown.seconds}s
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex bg-white border border-slate-200/80 rounded-xl pl-3 pr-2 py-1.5 items-center gap-2 shadow-sm">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none text-xs font-medium outline-none w-36 text-slate-600 placeholder:text-slate-400"
          />
          <kbd className="h-5 flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-400">
            ⌘K
          </kbd>
        </div>
        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-blue-600 transition-colors relative">
          <Bell size={16} />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full"></div>
        </button>
      </div>
    </header>
  )
}
