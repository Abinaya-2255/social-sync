import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react'
import { postService } from '../../../services/modules/postService.js'
import { POST_STATUS, STATUS_STYLES } from '../../../lib/constants.js'
import { PLATFORM_LIST } from '../../../lib/platforms.js'
import Button from '../../../components/ui/Button.jsx'
import { PlatformBadgeGroup, StatusBadge } from '../../../components/ui/Badge.jsx'
import { formatDate, formatTime, truncate } from '../../../lib/formatters.js'
import { useNavigate } from 'react-router-dom'
import Skeleton from '../../../components/ui/Skeleton.jsx'
import EmptyState from '../../../components/ui/EmptyState.jsx'

const VIEWS = ['Month', 'Week', 'Day']
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function PostPill({ post, onClick }) {
  const style = STATUS_STYLES[post.status]
  const platform = PLATFORM_LIST.find((p) => p.id === post.platforms?.[0])
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(post) }}
      className="w-full text-left px-2 py-1 rounded-lg text-[10px] font-medium truncate calendar-event-interactive cursor-pointer"
      style={{ background: platform?.bg || 'var(--accent-glow)', color: platform?.color || 'var(--accent)' }}
    >
      {truncate(post.caption, 30)}
    </button>
  )
}

function MonthView({ year, month, posts, onPostClick, onDayClick }) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  const today = new Date()

  const postsForDay = (day) => {
    if (!day) return []
    return posts.filter((p) => {
      const d = new Date(p.scheduledAt)
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day
    })
  }

  return (
    <div className="bg-surface border border-subtle rounded-2xl overflow-hidden">
      <div className="grid grid-cols-7 border-b border-subtle">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="p-2 text-center text-[11px] font-semibold text-muted">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          const isToday = day && today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
          const dayPosts = postsForDay(day)
          return (
            <div
              key={idx}
              onClick={() => day && onDayClick(day)}
              className={`min-h-[90px] p-2 border-r border-b border-subtle last:border-r-0 ${day ? 'cursor-pointer hover:bg-surface-2' : 'bg-surface-2'} transition-colors`}
            >
              {day && (
                <>
                  <span className={`text-xs font-semibold inline-flex w-6 h-6 items-center justify-center rounded-full ${isToday ? 'bg-accent text-white' : 'text-secondary'}`}>
                    {day}
                  </span>
                  <div className="mt-1 space-y-0.5">
                    {dayPosts.slice(0, 3).map((p) => <PostPill key={p.id} post={p} onClick={onPostClick} />)}
                    {dayPosts.length > 3 && (
                      <p className="text-[10px] text-muted pl-1">+{dayPosts.length - 3} more</p>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WeekView({ year, month, weekStart, posts, onPostClick }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })
  const today = new Date()

  return (
    <div className="bg-surface border border-subtle rounded-2xl overflow-hidden">
      <div className="grid grid-cols-7 border-b border-subtle">
        {days.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString()
          return (
            <div key={i} className="p-3 text-center border-r border-subtle last:border-r-0">
              <p className="text-[11px] text-muted">{DAYS_OF_WEEK[d.getDay()]}</p>
              <p className={`text-sm font-semibold mt-0.5 inline-flex w-7 h-7 items-center justify-center rounded-full ${isToday ? 'bg-accent text-white' : 'text-primary'}`}>
                {d.getDate()}
              </p>
            </div>
          )
        })}
      </div>
      <div className="grid grid-cols-7 min-h-[320px]">
        {days.map((d, i) => {
          const dayPosts = posts.filter((p) => new Date(p.scheduledAt).toDateString() === d.toDateString())
          return (
            <div key={i} className="p-2 border-r border-subtle last:border-r-0 space-y-1.5">
              {dayPosts.map((p) => (
                <button key={p.id} onClick={() => onPostClick(p)}
                  className="w-full text-left p-2 rounded-xl bg-surface-2 hover:shadow-token-sm transition-shadow group">
                  {p.media?.url && (
                    <div className="w-full h-16 rounded-lg overflow-hidden mb-1.5 border border-subtle">
                      <img src={p.media.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                    </div>
                  )}
                  <p className="text-[10px] text-muted mb-0.5">{formatTime(p.scheduledAt)}</p>
                  <p className="text-[11px] text-primary font-medium leading-tight">{truncate(p.caption, 40)}</p>
                  <div className="mt-1 flex gap-1">
                    {p.platforms.slice(0, 2).map((pid) => {
                      const pl = PLATFORM_LIST.find((x) => x.id === pid)
                      return pl ? <pl.icon key={pid} size={10} style={{ color: pl.color }} /> : null
                    })}
                  </div>
                </button>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DayView({ date, posts, onPostClick }) {
  const navigate = useNavigate()
  const dayPosts = posts.filter((p) => new Date(p.scheduledAt).toDateString() === date.toDateString())
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))

  return (
    <div className="bg-surface border border-subtle rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-primary mb-4">{date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
      {dayPosts.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No posts scheduled for this day"
          description="Draft or schedule content for this date to keep your content calendar active."
          actionLabel="Create Post"
          actionIcon={Plus}
          onAction={() => navigate('/app/schedule')}
        />
      ) : (
        <div className="space-y-3">
          {dayPosts.map((p) => (
            <button key={p.id} onClick={() => onPostClick(p)}
              className="w-full text-left p-4 rounded-2xl bg-surface-2 border border-subtle hover:shadow-token-md transition-shadow flex items-start gap-4">
              {p.media?.url && (
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-subtle shrink-0">
                  <img src={p.media.url} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted mb-1">{formatTime(p.scheduledAt)}</p>
                    <p className="text-sm text-primary leading-relaxed">{p.caption}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div className="mt-2"><PlatformBadgeGroup platformIds={p.platforms} /></div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function PostDetailModal({ post, onClose }) {
  if (!post) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface border border-subtle rounded-2xl p-6 w-full max-w-lg shadow-token-lg">
        <div className="flex items-center justify-between mb-4">
          <StatusBadge status={post.status} />
          <button onClick={onClose} className="text-muted hover:text-primary p-1 rounded-lg hover:bg-surface-2">✕</button>
        </div>
        <p className="text-sm text-primary leading-relaxed mb-4">{post.caption}</p>
        <div className="flex items-center justify-between text-xs text-muted">
          <PlatformBadgeGroup platformIds={post.platforms} showLabel />
          <span>{formatDate(post.scheduledAt, { withYear: true })} · {formatTime(post.scheduledAt)}</span>
        </div>
      </motion.div>
    </div>
  )
}

export default function CalendarPage() {
  const [view, setView] = useState('Month')
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedPost, setSelectedPost] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    postService.list({ workspaceId: 'ws_1' }).then((data) => { setPosts(data); setIsLoading(false) })
  }, [])

  const filteredPosts = filterStatus === 'all' ? posts : posts.filter((p) => p.status === filterStatus)

  const navigate_ = (dir) => {
    setCurrentDate((prev) => {
      const d = new Date(prev)
      if (view === 'Month') d.setMonth(d.getMonth() + dir)
      else if (view === 'Week') d.setDate(d.getDate() + dir * 7)
      else d.setDate(d.getDate() + dir)
      return d
    })
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) || document.activeElement.isContentEditable) {
        return
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        navigate_(-1)
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        navigate_(1)
      } else if (e.key.toLowerCase() === 't') {
        e.preventDefault()
        setCurrentDate(new Date())
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [view])

  const getWeekStart = () => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() - d.getDay())
    return d
  }

  const label = view === 'Month'
    ? `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    : view === 'Week'
    ? `Week of ${formatDate(getWeekStart())}`
    : formatDate(currentDate, { withYear: true })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Calendar</h1>
          <p className="text-sm text-muted mt-0.5">Schedule and manage all your content</p>
        </div>
        <Button icon={Plus} onClick={() => navigate('/app/schedule')}>New Post</Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate_(-1)} className="p-2 rounded-xl border border-subtle hover:bg-surface-2 text-secondary">
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-primary min-w-[160px] text-center">{label}</span>
          <button onClick={() => navigate_(1)} className="p-2 rounded-xl border border-subtle hover:bg-surface-2 text-secondary">
            <ChevronRight size={16} />
          </button>
          <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 text-xs border border-subtle rounded-xl hover:bg-surface-2 text-secondary">Today</button>
          <span className="hidden lg:inline text-[10px] text-muted ml-2 font-mono">Use ← / → keys to navigate · T for Today</span>
        </div>

        <div className="flex items-center gap-2">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-surface-2 border border-subtle rounded-xl px-3 py-2 text-secondary focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
            <option value="all">All statuses</option>
            {Object.values(POST_STATUS).map((s) => <option key={s} value={s}>{STATUS_STYLES[s].label}</option>)}
          </select>
          <div className="flex bg-surface-2 border border-subtle rounded-xl overflow-hidden">
            {VIEWS.map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-2 text-xs font-medium transition-colors ${view === v ? 'bg-surface text-primary shadow-token-sm' : 'text-muted hover:text-primary'}`}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <Skeleton variant="calendar" />
      ) : filteredPosts.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title={filterStatus === 'all' ? "Your content calendar is empty" : `No posts found with status "${STATUS_STYLES[filterStatus]?.label || filterStatus}"`}
          description={filterStatus === 'all' ? "Plan ahead by scheduling posts across your connected social platforms." : "Try choosing a different status filter or schedule a new post."}
          actionLabel="Schedule Post"
          actionIcon={Plus}
          onAction={() => navigate('/app/schedule')}
        />
      ) : (
        <>
          {view === 'Month' && (
            <MonthView year={currentDate.getFullYear()} month={currentDate.getMonth()}
              posts={filteredPosts} onPostClick={setSelectedPost}
              onDayClick={(day) => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)); setView('Day') }} />
          )}
          {view === 'Week' && (
            <WeekView year={currentDate.getFullYear()} month={currentDate.getMonth()}
              weekStart={getWeekStart()} posts={filteredPosts} onPostClick={setSelectedPost} />
          )}
          {view === 'Day' && (
            <DayView date={currentDate} posts={filteredPosts} onPostClick={setSelectedPost} />
          )}
        </>
      )}

      {selectedPost && <PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  )
}
