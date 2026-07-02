import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`p-2 rounded-xl text-secondary hover:bg-surface-2 hover:text-primary transition-colors duration-150 ${className}`}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
