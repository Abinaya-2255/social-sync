import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { User, Settings, LogOut } from 'lucide-react'
import { useOutsideClick } from '../../hooks/useOutsideClick.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { initials } from '../../lib/formatters.js'

export default function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  useOutsideClick(ref, () => setOpen(false), open)

  const handleLogout = async () => {
    // Navigate away from the protected route FIRST, before clearing auth state.
    // If we clear state first, RequireAuth re-renders with isAuthenticated=false
    // and fires <Navigate to="/auth/login"> before our navigate('/') runs.
    navigate('/', { replace: true })
    await logout()
  }

  if (!user) return null

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-9 h-9 rounded-full accent-gradient text-white text-xs font-semibold flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity overflow-hidden border border-subtle"
        aria-label="Profile menu"
      >
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          initials(user.name)
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-surface border border-subtle rounded-2xl shadow-token-lg z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-subtle flex items-center gap-3">
              <div className="w-9 h-9 rounded-full accent-gradient text-white text-xs font-semibold flex items-center justify-center shrink-0 overflow-hidden border border-subtle">
                {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : initials(user.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-primary truncate">{user.name}</p>
                <p className="text-xs text-muted truncate">{user.email}</p>
              </div>
            </div>
            <div className="py-1">
              <Link
                to="/app/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-secondary dropdown-item-interactive"
              >
                <User size={15} /> Profile
              </Link>
              <Link
                to="/app/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-secondary dropdown-item-interactive"
              >
                <Settings size={15} /> Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 dropdown-item-interactive"
              >
                <LogOut size={15} /> Log out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
