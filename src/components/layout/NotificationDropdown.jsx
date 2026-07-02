import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { useOutsideClick } from '../../hooks/useOutsideClick.js'
import { notificationService } from '../../services/modules/notificationService.js'
import { timeAgo } from '../../lib/formatters.js'
import EmptyState from '../ui/EmptyState.jsx'

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const ref = useRef(null)

  useOutsideClick(ref, () => setOpen(false), open)

  useEffect(() => {
    notificationService.list().then((data) => {
      setNotifications(data)
      setIsLoading(false)
    })
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAllRead = async () => {
    await notificationService.markAllRead()
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        className="relative p-2 rounded-xl text-secondary hover:bg-surface-2 hover:text-primary transition-colors duration-150"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 bg-surface border border-subtle rounded-2xl shadow-token-lg z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-subtle">
              <p className="text-sm font-semibold text-primary">Notifications</p>
              {unreadCount > 0 && (
                <button onClick={handleMarkAllRead} className="text-xs text-accent hover:underline">
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-xs text-muted">Loading...</div>
              ) : notifications.length === 0 ? (
                <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 border-b border-subtle last:border-0 ${!n.read ? 'bg-surface-2' : ''}`}
                  >
                    <p className="text-sm text-primary font-medium">{n.title}</p>
                    <p className="text-xs text-muted mt-0.5">{n.body}</p>
                    <p className="text-[11px] text-muted mt-1">{timeAgo(n.createdAt)}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
