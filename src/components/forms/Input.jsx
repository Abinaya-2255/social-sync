import { forwardRef } from 'react'

const Input = forwardRef(function Input({ icon: Icon, error, className = '', ...props }, ref) {
  return (
    <div className="relative">
      {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />}
      <input
        ref={ref}
        className={`w-full bg-surface-2 border ${error ? 'border-red-500 focus:ring-red-500/30' : 'border-subtle focus:border-accent focus:shadow-[0_0_16px_rgba(0,209,108,0.2)]'} rounded-xl text-sm text-primary placeholder:text-muted py-2.5 ${Icon ? 'pl-10' : 'pl-3.5'} pr-3.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-200 ease-out input-interactive ${className}`}
        {...props}
      />
    </div>
  )
})

export default Input
