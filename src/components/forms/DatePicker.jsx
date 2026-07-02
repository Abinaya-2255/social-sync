import { forwardRef } from 'react'
import { Calendar, Clock } from 'lucide-react'

export const DatePicker = forwardRef(function DatePicker({ className = '', ...props }, ref) {
  return (
    <div className="relative">
      <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
      <input
        ref={ref}
        type="date"
        className={`w-full bg-surface-2 border border-subtle rounded-xl text-sm text-primary py-2.5 pl-10 pr-3.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-150 ${className}`}
        {...props}
      />
    </div>
  )
})

export const TimePicker = forwardRef(function TimePicker({ className = '', ...props }, ref) {
  return (
    <div className="relative">
      <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
      <input
        ref={ref}
        type="time"
        className={`w-full bg-surface-2 border border-subtle rounded-xl text-sm text-primary py-2.5 pl-10 pr-3.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-150 ${className}`}
        {...props}
      />
    </div>
  )
})
