import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, CheckCheck, AlertCircle, Info, CheckCircle2, Trash2, Settings } from 'lucide-react'
import { notificationService } from '../../../services/modules/notificationService.js'
import { useToast } from '../../../context/ToastContext.jsx'
import { timeAgo } from '../../../lib/formatters.js'
import Button from '../../../components/ui/Button.jsx'
import EmptyState from '../../../components/ui/EmptyState.jsx'
import Skeleton from '../../../components/ui/Skeleton.jsx'

const TYPE_CONFIG = {
  success: { icon: CheckCircle2, color: '#00D16C' },
  warning: { icon: AlertCircle, color: '#F59E0B' },
  error: { icon: AlertCircle, color: '#EF4444' },
  info: { icon: Info, color: '#3B82F6' },
}

function getType(title) {
  if (title.toLowerCase().includes('fail') || title.toLowerCase().includes('error')) return 'error'
  if (title.toLowerCase().includes('success') || title.toLowerCase().includes('publish')) return 'success'
  if (title.toLowerCase().includes('reconnect') || title.toLowerCase().includes('need')) return 'warning'
  return 'info'
}

const FILTERS = ['All', 'Unread', 'Read']

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const toast = useToast()

  useEffect(() => {
    notificationService.list().then((data) => { setNotifications(data); setIsLoading(false) })
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const filtered = notifications.filter((n) => {
    if (filter === 'Unread') return !n.read
    if (filter === 'Read') return n.read
    return true
  })

  const markRead = async (id) => {
    await notificationService.markRead(id)
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllRead = async () => {
    await notificationService.markAllRead()
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success('All notifications marked as read')
  }

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Notifications</h1>
          <p className="text-sm text-muted mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" icon={CheckCheck} onClick={markAllRead}>Mark all read</Button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex bg-surface-2 border border-subtle rounded-xl overflow-hidden w-fit">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${filter === f ? 'bg-surface text-primary shadow-token-sm' : 'text-muted hover:text-primary'}`}>
            {f}
            {f === 'Unread' && unreadCount > 0 && (
              <span className="ml-2 text-xs bg-accent text-white rounded-full px-1.5 py-0.5">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="bg-surface border border-subtle rounded-2xl overflow-hidden">
        {isLoading ? (
          <div>
            {[...Array(5)].map((_, i) => <Skeleton key={i} variant="notificationItem" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-4">
            <EmptyState
              icon={Bell}
              title={filter === 'Unread' ? "You're all caught up!" : "No notifications found"}
              description={filter === 'Unread' ? "There are no unread notifications requiring your attention right now." : filter === 'Read' ? "You haven't read any notifications yet." : "System updates, post publishing statuses, and team activity alerts will appear here."}
              actionLabel={filter !== 'All' ? "View All Notifications" : undefined}
              onAction={filter !== 'All' ? () => setFilter('All') : undefined}
            />
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((n, i) => {
              const type = getType(n.title)
              const config = TYPE_CONFIG[type]
              return (
                <motion.div key={n.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className={`flex items-start gap-4 px-5 py-4 border-b border-subtle last:border-0 group transition-colors hover:bg-surface-2 ${!n.read ? 'bg-[var(--accent-glow)] bg-opacity-30' : ''}`}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${config.color}1a` }}>
                    <config.icon size={16} style={{ color: config.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-medium ${!n.read ? 'text-primary' : 'text-secondary'}`}>{n.title}</p>
                      <span className="text-[11px] text-muted shrink-0 mt-0.5">{timeAgo(n.createdAt)}</span>
                    </div>
                    <p className="text-xs text-muted mt-0.5 leading-relaxed">{n.body}</p>
                  </div>
                  {!n.read && (
                    <button onClick={() => markRead(n.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-muted hover:text-accent hover:bg-[var(--accent-glow)] shrink-0">
                      <CheckCheck size={14} />
                    </button>
                  )}
                  {!n.read && (
                    <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Notification preferences hint */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-subtle">
        <Settings size={16} className="text-muted shrink-0" />
        <p className="text-xs text-muted flex-1">Manage your notification preferences in Settings</p>
        <a href="/app/settings/preferences" className="text-xs text-accent hover:underline shrink-0">Go to settings →</a>
      </div>
    </div>
  )
}
