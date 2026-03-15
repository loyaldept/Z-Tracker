import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  return (
    <div className="bg-[#0a0a0f] text-white antialiased h-screen flex overflow-hidden dot-grid">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <Header />
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 no-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
