import { getPlatform } from '../../lib/platforms.js'
import { STATUS_STYLES } from '../../lib/constants.js'

export function PlatformBadge({ platformId, size = 'md', showLabel = false }) {
  const platform = getPlatform(platformId)
  if (!platform) return null
  const Icon = platform.icon
  const dims = { sm: 22, md: 28, lg: 34 }
  const iconSize = { sm: 12, md: 14, lg: 16 }

  if (showLabel) {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{ backgroundColor: platform.bg, color: platform.color }}
      >
        <Icon size={iconSize[size]} />
        {platform.label}
      </span>
    )
  }

  return (
    <span
      title={platform.label}
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{ backgroundColor: platform.bg, color: platform.color, width: dims[size], height: dims[size] }}
    >
      <Icon size={iconSize[size]} />
    </span>
  )
}

export function PlatformBadgeGroup({ platformIds = [], size = 'sm', max = 4 }) {
  const visible = platformIds.slice(0, max)
  const remaining = platformIds.length - visible.length
  return (
    <div className="flex items-center -space-x-1.5">
      {visible.map((id) => (
        <span key={id} className="ring-2 ring-[var(--bg-surface)] rounded-full">
          <PlatformBadge platformId={id} size={size} />
        </span>
      ))}
      {remaining > 0 && (
        <span className="ring-2 ring-[var(--bg-surface)] rounded-full bg-surface-2 text-[10px] font-semibold text-secondary w-[22px] h-[22px] flex items-center justify-center">
          +{remaining}
        </span>
      )}
    </div>
  )
}

export function StatusBadge({ status }) {
  const style = STATUS_STYLES[status]
  if (!style) return null
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {style.label}
    </span>
  )
}
