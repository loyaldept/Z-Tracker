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
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
              <span className="text-white font-black text-xs tracking-tighter">Z</span>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-base leading-none text-slate-900">ZTrack</span>
            <span className="text-[9px] text-slate-400 font-semibold tracking-[0.15em] mt-0.5">
              by zhanoff
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-6">
          <div>
            <div className="px-3 mb-3">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
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
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={isActive ? 'text-blue-400' : 'text-slate-400'}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && isActive && (
                      <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-md font-bold">
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
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
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
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? 'text-blue-400' : 'text-slate-400'}
                    />
                    <span>{item.label}</span>
                  </NavLink>
                )
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 mb-3">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
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
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? 'text-blue-400' : 'text-slate-400'}
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
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                Z
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate tracking-tight">
                Zuhayr
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
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-md"
      >
        {mobileOpen ? <X size={18} className="text-slate-900" /> : <Menu size={18} className="text-slate-900" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-72 border-r border-slate-200 flex-col h-full bg-white relative z-20">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 border-r border-slate-200 flex flex-col h-full bg-white z-40 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
