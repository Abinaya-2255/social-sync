import { forwardRef } from 'react'

const Textarea = forwardRef(function Textarea({ error, className = '', ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={`w-full bg-surface-2 border ${error ? 'border-red-500' : 'border-subtle'} rounded-xl text-sm text-primary placeholder:text-muted py-2.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-150 resize-none input-interactive ${className}`}
      {...props}
    />
  )
})

export default Textarea
