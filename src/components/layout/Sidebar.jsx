import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, CalendarPlus, Calendar, FolderOpen, BarChart3,
  Sparkles, Users, Settings, ChevronsLeft, ChevronsRight,
} from 'lucide-react'
import { NAV_ITEMS } from '../../lib/constants.js'
import { useUIStore, uiActions } from '../../store/useUIStore.js'
import BrandLogo from '../ui/BrandLogo.jsx'

const ICONS = {
  LayoutDashboard, CalendarPlus, Calendar, FolderOpen, BarChart3, Sparkles, Users, Settings,
}

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const collapsed = useUIStore((s) => s.sidebarCollapsed)

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onCloseMobile} />
      )}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 76 : 240 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={`fixed lg:sticky top-0 left-0 h-screen bg-surface border-r border-subtle z-50 flex flex-col shrink-0 transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center px-5 h-16 border-b border-subtle shrink-0 overflow-hidden">
          <BrandLogo size={28} showText={!collapsed} textClassName="font-semibold text-primary text-sm whitespace-nowrap" />
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon]
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium sidebar-link ${
                    isActive
                      ? 'bg-surface-2 text-accent sidebar-link-active'
                      : 'text-secondary hover:text-primary'
                  }`
                }
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </NavLink>
            )
          })}
        </nav>

        <button
          onClick={uiActions.toggleSidebar}
          className="hidden lg:flex items-center justify-center gap-2 m-3 p-2.5 rounded-xl text-muted hover:bg-surface-2 hover:text-primary transition-colors duration-150 border border-subtle btn-interactive"
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </motion.aside>
    </>
  )
}
