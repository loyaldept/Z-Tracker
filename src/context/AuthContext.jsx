import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { isAuthenticated, logout as authLogout } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check auth on mount
    const checkAuth = () => {
      const auth = isAuthenticated()
      setAuthenticated(auth)
      setLoading(false)
    }
    checkAuth()
  }, [])

  const logout = () => {
    authLogout()
    setAuthenticated(false)
  }

  const refreshAuth = () => {
    setAuthenticated(isAuthenticated())
  }

  return (
    <AuthContext.Provider value={{ authenticated, loading, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function RequireAuth({ children }) {
  const { authenticated, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate('/login', { state: { from: location }, replace: true })
    }
  }, [authenticated, loading, navigate, location])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
      </div>
    )
  }

  return authenticated ? children : null
}
