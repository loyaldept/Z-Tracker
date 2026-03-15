import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  TrendingUp,
  Plane,
  GraduationCap,
  PiggyBank,
  CalendarClock,
  Heart,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard, badge: 'Live' },
  { path: '/ventures', label: 'Ventures', icon: TrendingUp },
  { path: '/visa', label: 'Visa Path', icon: Plane },
  { path: '/university', label: 'University', icon: GraduationCap },
  { path: '/savings', label: 'Savings', icon: PiggyBank },
  { path: '/deadlines', label: 'Deadlines', icon: CalendarClock },
  { path: '/jamka', label: 'Jamka', icon: Heart },
]

export default function Sidebar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 lg:p-8 pb-4">
        <div className="flex items-center gap-3 mb-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-lg blur opacity-20"></div>
            <div className="relative bg-slate-900 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold tracking-tighter text-xs">
              ZT
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-base leading-none">ZTrack</span>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest mt-0.5">
              DASHBOARD
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-6">
          <div>
            <div className="px-3 mb-3">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                Navigation
              </span>
            </div>
            <nav className="space-y-1">
              {navItems.slice(0, 3).map((item) => {
                const Icon = item.icon
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path)
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                      isActive
                        ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900'
                        : 'text-slate-500 hover:bg-white/50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={isActive ? 'text-blue-600' : 'text-slate-400'}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && isActive && (
                      <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                )
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 mb-3">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                Academic & Life
              </span>
            </div>
            <nav className="space-y-1">
              {navItems.slice(3, 5).map((item) => {
                const Icon = item.icon
                const isActive = location.pathname.startsWith(item.path)
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                      isActive
                        ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900'
                        : 'text-slate-500 hover:bg-white/50 hover:text-slate-900'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? 'text-blue-600' : 'text-slate-400'}
                    />
                    <span>{item.label}</span>
                  </NavLink>
                )
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 mb-3">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                Planning
              </span>
            </div>
            <nav className="space-y-1">
              {navItems.slice(5).map((item) => {
                const Icon = item.icon
                const isActive = location.pathname.startsWith(item.path)
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                      isActive
                        ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900'
                        : 'text-slate-500 hover:bg-white/50 hover:text-slate-900'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? 'text-blue-600' : 'text-slate-400'}
                    />
                    <span>{item.label}</span>
                  </NavLink>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="mt-auto p-6">
        <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                ZZ
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate tracking-tight">
                Zuhayr Zhanoff
              </p>
              <p className="text-[10px] text-slate-500 font-medium truncate">
                Founder & Builder
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-72 border-r border-slate-200/60 flex-col h-full glass relative z-20">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 border-r border-slate-200/60 flex flex-col h-full bg-white/95 backdrop-blur-xl z-40 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
