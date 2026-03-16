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
    <div className="min-h-screen bg-slate-950 flex relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      {/* Left panel - branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 relative z-10">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="text-white font-black text-sm tracking-tighter">Z</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">ZTrack</span>
          </div>

          {/* Time display */}
          <div className="mb-8">
            <p className="text-7xl font-bold text-white tracking-tighter leading-none">{formattedTime}</p>
            <p className="text-sm text-slate-500 mt-3 font-medium">{formattedDate}</p>
          </div>

          {/* Motivational */}
          <div className="max-w-md">
            <p className="text-slate-400 text-base leading-relaxed">
              Track your ventures. Build your empire. Every dollar counts on the path to extraordinary.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-2 h-2 rounded-full bg-blue-500/40" />
            <div className="w-2 h-2 rounded-full bg-blue-500/20" />
          </div>
          <span className="text-xs text-slate-600 font-medium">Secure Dashboard</span>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="text-white font-black text-sm tracking-tighter">Z</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">ZTrack</span>
          </div>

          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back, Zuhayr</h1>
            <p className="text-sm text-slate-500 mt-2">Log in to ZTrack to continue</p>
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
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-900/80 border border-slate-800 rounded-xl text-sm text-white outline-none focus:ring-2 ring-blue-500/30 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
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
