import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`relative w-full ${sizes[size]} bg-surface border border-subtle rounded-2xl shadow-token-lg max-h-[90vh] overflow-y-auto`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-subtle sticky top-0 bg-surface">
              <h2 className="text-base font-semibold text-primary">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-2 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-5">{children}</div>
            {footer && <div className="px-6 py-4 border-t border-subtle flex justify-end gap-3">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
