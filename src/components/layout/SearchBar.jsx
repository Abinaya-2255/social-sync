import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import EmptyState from '../ui/EmptyState.jsx'

const SEARCH_ITEMS = [
  { title: 'Dashboard Overview', category: 'Page', path: '/app/dashboard' },
  { title: 'Content Calendar & Schedule', category: 'Page', path: '/app/calendar' },
  { title: 'Media & Asset Library', category: 'Page', path: '/app/library' },
  { title: 'Performance Analytics', category: 'Page', path: '/app/analytics' },
  { title: 'AI Studio & Generators', category: 'Page', path: '/app/ai-studio' },
  { title: 'Team Members & Roles', category: 'Page', path: '/app/team' },
  { title: 'Workspaces & Brands', category: 'Page', path: '/app/workspaces' },
  { title: 'Platform Settings & Connections', category: 'Page', path: '/app/settings/platforms' },
  { title: 'General Account Settings', category: 'Page', path: '/app/settings' },
  { title: 'Summer Sale Launch Post', category: 'Scheduled Post', path: '/app/calendar' },
  { title: 'Q3 Product Teaser Reel', category: 'Draft Post', path: '/app/calendar' },
  { title: 'Brand Guidelines 2026.pdf', category: 'Asset', path: '/app/library' },
  { title: 'Product Showcase B-Roll.mp4', category: 'Asset', path: '/app/library' },
]

export default function SearchBar({ className = '' }) {
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. "/" focuses search input if not inside other form controls
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) || document.activeElement.isContentEditable) {
          return
        }
        e.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.select()
      }

      // 2. "Ctrl + K" or "Cmd + K" triggers search input focus & opens layout list
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.select()
        setIsOpen(true)
      }

      // 3. "Escape" closes list & blurs
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        e.preventDefault()
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filtered = value.trim()
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.category.toLowerCase().includes(value.toLowerCase())
      )
    : []

  const handleSelect = (path) => {
    navigate(path)
    setIsOpen(false)
    setValue('')
  }

  return (
    <div ref={containerRef} className={`relative hidden md:block ${className}`}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted z-10" />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => {
          if (value.trim()) setIsOpen(true)
        }}
        type="text"
        placeholder="Search pages, assets..."
        aria-label="Global search"
        className="w-72 bg-surface-2 border border-subtle rounded-xl text-sm text-primary placeholder:text-muted py-2 pl-9 pr-12 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-150"
      />
      {!value && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none select-none text-[9px] font-mono text-muted bg-surface border border-subtle px-1.5 py-0.5 rounded-md shrink-0">
          <span>⌘</span>
          <span>K</span>
        </div>
      )}
      {value && (
        <button
          onClick={() => {
            setValue('')
            setIsOpen(false)
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-primary z-10"
        >
          <X size={14} />
        </button>
      )}

      <AnimatePresence>
        {isOpen && value.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-full mt-2 w-80 sm:w-96 bg-surface border border-subtle rounded-2xl shadow-token-lg overflow-hidden z-50 p-2"
          >
            {filtered.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No results found"
                description={`We couldn't find anything matching "${value}". Try searching for pages, assets, or scheduled content.`}
                className="py-8 border-none bg-transparent"
              />
            ) : (
              <div className="max-h-80 overflow-y-auto space-y-1">
                {filtered.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-2 transition-colors text-left group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-primary group-hover:text-accent transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-muted">{item.category}</p>
                    </div>
                    <ArrowRight size={14} className="text-muted group-hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
