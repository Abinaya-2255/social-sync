import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const VARIANTS = {
  primary: 'text-white accent-gradient hover:opacity-95 shadow-token-sm hover:shadow-[0_4px_20px_rgba(0,209,108,0.35)] btn-interactive',
  secondary: 'bg-surface-2 text-primary border border-subtle hover:bg-surface hover:border-subtle/80 hover:shadow-token-sm btn-interactive',
  ghost: 'bg-transparent text-secondary hover:bg-surface-2 hover:text-primary btn-interactive',
  danger: 'bg-red-500 text-white hover:bg-red-600 shadow-token-sm hover:shadow-[0_4px_16px_rgba(239,68,68,0.3)] btn-interactive',
  outline: 'bg-transparent border border-subtle text-primary hover:bg-surface-2 hover:shadow-token-sm btn-interactive',
}

const SIZES = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-base px-6 py-3 gap-2',
  icon: 'p-2',
}

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', isLoading = false, icon: Icon, iconRight: IconRight, className = '', children, disabled, ...props },
  ref
) {
  const isInteractive = !disabled && !isLoading

  return (
    <motion.button
      ref={ref}
      disabled={disabled || isLoading}
      whileHover={isInteractive ? { y: -1.5, scale: 1.01 } : {}}
      whileTap={isInteractive ? { scale: 0.98 } : {}}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] cursor-pointer ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-1 px-1">
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 animate-[pulse_1s_ease-in-out_infinite]" />
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 animate-[pulse_1s_ease-in-out_0.2s_infinite]" />
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 animate-[pulse_1s_ease-in-out_0.4s_infinite]" />
        </span>
      ) : (
        Icon && <Icon size={size === 'sm' ? 14 : 16} className="transition-transform duration-200 group-hover:scale-110" />
      )}
      {children}
      {!isLoading && IconRight && <IconRight size={size === 'sm' ? 14 : 16} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </motion.button>
  )
})

export default Button
