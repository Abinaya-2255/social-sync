import { createContext, useContext, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const TOAST_STYLES = {
  success: {
    icon: CheckCircle2,
    color: '#00D16C',
    iconBg: 'rgba(0, 209, 108, 0.14)',
    iconBorder: 'rgba(0, 209, 108, 0.3)',
    glowBg: 'radial-gradient(circle at 100% 0%, rgba(0, 209, 108, 0.12) 0%, transparent 60%)',
  },
  error: {
    icon: AlertCircle,
    color: '#EF4444',
    iconBg: 'rgba(239, 68, 68, 0.14)',
    iconBorder: 'rgba(239, 68, 68, 0.3)',
    glowBg: 'radial-gradient(circle at 100% 0%, rgba(239, 68, 68, 0.12) 0%, transparent 60%)',
  },
  warning: {
    icon: AlertTriangle,
    color: '#F59E0B',
    iconBg: 'rgba(245, 158, 11, 0.14)',
    iconBorder: 'rgba(245, 158, 11, 0.3)',
    glowBg: 'radial-gradient(circle at 100% 0%, rgba(245, 158, 11, 0.12) 0%, transparent 60%)',
  },
  info: {
    icon: Info,
    color: '#3B82F6',
    iconBg: 'rgba(59, 130, 246, 0.14)',
    iconBorder: 'rgba(59, 130, 246, 0.3)',
    glowBg: 'radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.12) 0%, transparent 60%)',
  },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (arg1, type = 'info', arg2 = null, durationArg = 4500) => {
      let title = ''
      let description = ''
      let duration = durationArg

      if (typeof arg1 === 'object' && arg1 !== null) {
        title = arg1.title || arg1.message || 'Notification'
        description = arg1.description || arg1.supportingText || ''
        if (arg1.duration) duration = arg1.duration
      } else if (typeof arg1 === 'string') {
        if (typeof arg2 === 'string') {
          title = arg1
          description = arg2
        } else if (typeof arg2 === 'number') {
          title = arg1
          duration = arg2
        } else if (typeof arg2 === 'object' && arg2 !== null) {
          title = arg1
          description = arg2.description || ''
          if (arg2.duration) duration = arg2.duration
        } else {
          title = arg1
        }
      }

      // Intelligent default supporting text when only a single string title is provided
      if (!description) {
        if (type === 'success') {
          if (title.toLowerCase().includes('updated') || title.toLowerCase().includes('saved')) {
            description = 'Your changes have been securely saved to the workspace.'
          } else if (title.toLowerCase().includes('deleted') || title.toLowerCase().includes('removed')) {
            description = 'The selected item has been removed successfully.'
          } else if (title.toLowerCase().includes('uploaded')) {
            description = 'Your media asset is now available in your content library.'
          } else {
            description = 'Action completed successfully.'
          }
        } else if (type === 'error') {
          description = 'Please verify your details and try again.'
        } else if (type === 'warning') {
          description = 'Please attention to this item before continuing.'
        }
      }

      const id = Date.now() + Math.random()
      setToasts((prev) => [...prev, { id, title, description, type, duration }])
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration)
      }
      return id
    },
    [removeToast]
  )

  const toast = {
    success: (arg1, arg2) => addToast(arg1, 'success', arg2),
    error: (arg1, arg2) => addToast(arg1, 'error', arg2),
    warning: (arg1, arg2) => addToast(arg1, 'warning', arg2),
    info: (arg1, arg2) => addToast(arg1, 'info', arg2),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3.5 w-[min(400px,92vw)] pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => {
            const style = TOAST_STYLES[t.type] || TOAST_STYLES.info
            const Icon = style.icon

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 70, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto relative bg-surface/95 backdrop-blur-xl border border-subtle/90 rounded-2xl p-4 shadow-token-xl overflow-hidden card-glow"
              >
                {/* Subtle top-right ambient glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-80"
                  style={{ background: style.glowBg }}
                />

                <div className="relative z-10 flex items-start gap-3.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: style.iconBg,
                      borderColor: style.iconBorder,
                      color: style.color,
                    }}
                  >
                    <Icon size={19} />
                  </div>

                  <div className="flex-1 min-w-0 pr-6 pt-0.5">
                    <p className="text-sm font-semibold text-primary tracking-tight leading-snug">
                      {t.title}
                    </p>
                    {t.description && (
                      <p className="text-xs text-secondary mt-1 leading-relaxed">
                        {t.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => removeToast(t.id)}
                    className="absolute top-3.5 right-3.5 text-muted hover:text-primary p-1 rounded-lg transition-colors cursor-pointer"
                    aria-label="Dismiss notification"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Animated progress bar at the bottom */}
                {t.duration > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-subtle/30 overflow-hidden">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: t.duration / 1000, ease: 'linear' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: style.color }}
                    />
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
