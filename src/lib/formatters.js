export function formatNumber(num) {
  if (num === null || num === undefined) return '—'
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return String(num)
}

export function formatPercent(value, { withSign = true } = {}) {
  if (value === null || value === undefined) return '—'
  const sign = withSign && value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

export function formatDate(date, opts = {}) {
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: opts.withYear ? 'numeric' : undefined,
  })
}

export function formatTime(date) {
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export function formatDateTime(date) {
  return `${formatDate(date)} · ${formatTime(date)}`
}

export function timeAgo(date) {
  const d = date instanceof Date ? date : new Date(date)
  const diff = Math.floor((Date.now() - d.getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export function truncate(text, length = 80) {
  if (!text) return ''
  return text.length > length ? `${text.slice(0, length).trim()}…` : text
}

export function initials(name = '') {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
