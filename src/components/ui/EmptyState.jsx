import { Inbox } from 'lucide-react'
import Button from './Button.jsx'

export default function EmptyState({ icon: Icon = Inbox, title, description, actionLabel, onAction, actionIcon: ActionIcon, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-14 px-6 bg-surface/60 rounded-3xl border border-subtle/60 transition-all duration-350 ${className}`}>
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center border border-[#00D16C]/20 mb-5 shadow-token-sm transition-transform duration-300 hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 209, 108, 0.15) 0%, rgba(16, 185, 129, 0.10) 100%)',
          color: '#00D16C',
        }}
      >
        <Icon size={26} className="text-accent" />
      </div>
      <h3 className="text-base font-semibold text-primary mb-1.5 tracking-tight">{title}</h3>
      {description && <p className="text-sm text-secondary font-light max-w-md mb-6 leading-relaxed">{description}</p>}
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction} icon={ActionIcon}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
