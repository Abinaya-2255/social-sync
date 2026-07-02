import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Smile } from 'lucide-react'
import { useOutsideClick } from '../../hooks/useOutsideClick.js'

const EMOJIS = [
  '😀', '😂', '🥰', '😎', '🤔', '🙌', '👏', '🔥', '✨', '🎉',
  '❤️', '💡', '🚀', '📸', '🎬', '📅', '✅', '⭐', '💪', '🙏',
  '👀', '💯', '🤝', '📈', '🎯', '🛍️', '☕', '🌿', '🏡', '🎵',
]

export default function EmojiPicker({ onSelect }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutsideClick(ref, () => setOpen(false), open)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Insert emoji"
        className="p-2 rounded-lg text-secondary hover:bg-surface-2 hover:text-primary transition-colors duration-150"
      >
        <Smile size={18} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-64 bg-surface border border-subtle rounded-2xl shadow-token-lg z-50 p-3 grid grid-cols-6 gap-1"
          >
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => {
                  onSelect?.(emoji)
                  setOpen(false)
                }}
                className="text-lg p-1.5 rounded-lg hover:bg-surface-2 transition-colors duration-150"
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
