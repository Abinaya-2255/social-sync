import { Clock } from 'lucide-react'
import { PlatformBadgeGroup } from './Badge.jsx'
import { StatusBadge } from './Badge.jsx'
import { formatDateTime, truncate } from '../../lib/formatters.js'

export default function TimelineCard({ post, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-2 transition-colors duration-150 text-left"
    >
      <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center shrink-0 text-muted overflow-hidden border border-subtle">
        {post?.media?.url ? (
          <img src={post.media.url} alt="" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        ) : (
          <Clock size={16} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-primary font-medium truncate">{truncate(post.caption, 60)}</p>
        <p className="text-xs text-muted mt-0.5">{formatDateTime(post.scheduledAt)}</p>
      </div>
      <PlatformBadgeGroup platformIds={post.platforms} />
      <StatusBadge status={post.status} />
    </button>
  )
}
