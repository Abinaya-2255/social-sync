import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Check, Building2, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useOutsideClick } from '../../hooks/useOutsideClick.js'
import { useWorkspace } from '../../context/WorkspaceContext.jsx'

export default function WorkspaceSwitcher() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { workspaces, activeWorkspace, switchWorkspace } = useWorkspace()
  useOutsideClick(ref, () => setOpen(false), open)

  if (!activeWorkspace) return null

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-2 border border-subtle text-sm text-primary hover:bg-surface transition-colors duration-150 max-w-[180px]"
      >
        <Building2 size={14} className="text-accent shrink-0" />
        <span className="truncate">{activeWorkspace.name}</span>
        <ChevronDown size={14} className="text-muted shrink-0" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-surface border border-subtle rounded-2xl shadow-token-lg z-50 overflow-hidden"
          >
            <p className="px-4 py-2.5 text-xs font-semibold text-muted uppercase tracking-wide border-b border-subtle">
              Workspaces
            </p>
            <div className="max-h-64 overflow-y-auto">
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    switchWorkspace(ws.id)
                    setOpen(false)
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm dropdown-item-interactive text-left"
                >
                  <span>
                    <span className="block text-primary font-medium truncate">{ws.name}</span>
                    <span className="block text-xs text-muted">{ws.plan} · {ws.members} members</span>
                  </span>
                  {ws.id === activeWorkspace.id && <Check size={16} className="text-accent shrink-0" />}
                </button>
              ))}
            </div>
            <Link
              to="/app/workspaces"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm text-accent border-t border-subtle dropdown-item-interactive"
            >
              <Plus size={14} /> Manage workspaces
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
