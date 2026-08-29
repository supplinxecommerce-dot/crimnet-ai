import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Network, Users, FolderOpen, BarChart3, Bell, Shield, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, key: 'dashboard' },
  { to: '/network', icon: Network, key: 'network' },
  { to: '/suspects', icon: Users, key: 'suspects' },
  { to: '/cases', icon: FolderOpen, key: 'cases' },
  { to: '/analytics', icon: BarChart3, key: 'analytics' },
  { to: '/alerts', icon: Bell, key: 'alerts' },
  { to: '/evidence', icon: Shield, key: 'evidence' },
  { to: '/how-it-works', icon: HelpCircle, key: 'howItWorks' },
]

function Logo({ open }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 32 32" className="shrink-0">
        <rect width="32" height="32" rx="8" fill="#064E3B" />
        <rect x="1" y="1" width="30" height="30" rx="7" fill="none" stroke="#10B981" strokeWidth="0.5" opacity="0.4" />
        <circle cx="16" cy="11" r="3.5" fill="#10B981" />
        <circle cx="9" cy="22" r="2.5" fill="#34D399" />
        <circle cx="23" cy="22" r="2.5" fill="#34D399" />
        <line x1="16" y1="14.5" x2="9" y2="19.5" stroke="#6EE7B7" strokeWidth="1.2" opacity="0.6" />
        <line x1="16" y1="14.5" x2="23" y2="19.5" stroke="#6EE7B7" strokeWidth="1.2" opacity="0.6" />
        <line x1="9" y1="22" x2="23" y2="22" stroke="#6EE7B7" strokeWidth="1.2" opacity="0.4" />
        <circle cx="16" cy="11" r="1.5" fill="#D1FAE5" />
      </svg>
      {open && (
        <div className="min-w-0">
          <h1 className="text-sm font-bold text-white leading-tight tracking-tight">CrimNet AI</h1>
          <p className="text-[10px] text-emerald-400 leading-tight">Network Analysis System</p>
        </div>
      )}
    </div>
  )
}

export default function Sidebar({ open, setOpen, t }) {
  return (
    <aside className={`${open ? 'w-64' : 'w-16'} bg-navy-800 border-r border-navy-700 flex flex-col transition-all duration-300 shrink-0 relative`}>
      <div className={`p-4 border-b border-navy-700 ${open ? '' : 'px-2'}`}>
        <Logo open={open} />
      </div>

      <button onClick={() => setOpen(!open)} className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-navy-700 border border-navy-600 flex items-center justify-center text-gray-400 hover:text-white z-10">
        {open ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      <nav className="flex-1 py-2 overflow-y-auto">
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-400 hover:text-white hover:bg-navy-700'} ${!open ? 'justify-center px-2' : ''}`}>
            <item.icon size={18} className="shrink-0" />
            {open && <span>{t[item.key]}</span>}
          </NavLink>
        ))}
      </nav>

      {open && (
        <div className="p-4 border-t border-navy-700 text-center">
          <p className="text-[10px] text-emerald-400 font-semibold">Smart India Hackathon 2026</p>
          <p className="text-[9px] text-gray-500 mt-0.5">Blockchain & Cybersecurity</p>
        </div>
      )}
    </aside>
  )
}
