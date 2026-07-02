const Card = ({ className = '', children, as: Tag = 'div', padding = 'md', hover = false, ...props }) => {
  const paddings = { none: '', sm: 'p-4', md: 'p-5', lg: 'p-6' }
  return (
    <Tag
      className={`bg-surface border border-subtle rounded-2xl shadow-token-sm ${
        hover ? 'card-glow hover:-translate-y-0.5 cursor-pointer' : 'transition-all duration-200'
      } ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export const CardHeader = ({ title, subtitle, action, className = '' }) => (
  <div className={`flex items-start justify-between gap-3 mb-4 ${className}`}>
    <div>
      <h3 className="text-sm font-semibold text-primary">{title}</h3>
      {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
    </div>
    {action}
  </div>
)

export default Card
