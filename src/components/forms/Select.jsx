import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

const Select = forwardRef(function Select({ options = [], className = '', placeholder, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={`w-full bg-surface-2 border border-subtle rounded-xl text-sm text-primary py-2.5 pl-3.5 pr-9 appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-150 input-interactive ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
    </div>
  )
})

export default Select
