import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { loginWithPassword } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const navigate = useNavigate()
  const { refreshAuth } = useAuth()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await loginWithPassword(password)

    if (result.success) {
      refreshAuth()
      navigate('/', { replace: true })
    } else {
      setError(result.error)
    }

    setIsLoading(false)
  }

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-10 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Top - Logo */}
        <div className="relative z-10">
          <img
            src="/images/zhanoff.png"
            alt="Zhanoff"
            className="h-10 object-contain brightness-0 invert"
          />
        </div>

        {/* Center - Time display */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="space-y-2">
            <p className="text-6xl font-mono font-bold text-white tracking-tight tabular-nums">{formattedTime}</p>
            <p className="text-lg text-slate-400">{formattedDate}</p>
          </div>
        </div>

        {/* Bottom - tagline */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-2 h-2 rounded-full bg-blue-500/40" />
            <div className="w-2 h-2 rounded-full bg-blue-500/20" />
          </div>
          <span className="text-xs text-slate-500 font-medium">Personal Dashboard</span>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <img
              src="/images/zhanoff.png"
              alt="Zhanoff"
              className="h-8 object-contain brightness-0 invert"
            />
          </div>

          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back, Zuhayr</h1>
            <p className="text-sm text-slate-400 mt-2">Enter your password to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock size={16} className="text-slate-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white outline-none focus:ring-2 ring-blue-500/30 focus:border-blue-500/50 transition-all placeholder:text-slate-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-xs text-red-400 font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-3.5 px-4 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-slate-800/50">
            <p className="text-[11px] text-slate-600 text-center">
              Created by <span className="text-slate-400 font-medium">Zuhayr Abdullazhanov</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
