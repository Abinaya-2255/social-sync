import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ResponsiveContainer, AreaChart, Area } from 'recharts'
import { postService } from '../../../services/modules/postService.js'
import { analyticsService } from '../../../services/modules/analyticsService.js'
import { teamService } from '../../../services/modules/teamService.js'
import { platformService } from '../../../services/modules/platformService.js'
import { mockActivity } from '../../../services/mocks/miscMocks.js'
import TimelineCard from '../../../components/ui/TimelineCard.jsx'
import Skeleton from '../../../components/ui/Skeleton.jsx'
import EmptyState from '../../../components/ui/EmptyState.jsx'
import { Calendar, CalendarDays, Bell, Sparkles, LineChart, Briefcase, Send, Heart, TrendingUp, Users, Link2 } from 'lucide-react'
import { POST_STATUS } from '../../../lib/constants.js'
import { timeAgo, initials } from '../../../lib/formatters.js'

export function UpcomingQueue() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    postService.list({ workspaceId: 'ws_1' }).then((data) => {
      const upcoming = data
        .filter((p) => p.status === POST_STATUS.SCHEDULED && new Date(p.scheduledAt) > new Date())
        .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
        .slice(0, 5)
      setPosts(upcoming)
      setIsLoading(false)
    })
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="bg-surface border border-subtle rounded-2xl p-5 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center border border-[#00D16C]/20 transition-all duration-300 group-hover:border-[#00D16C]/40 group-hover:scale-105 group-hover:brightness-125 shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 209, 108, 0.15) 0%, rgba(16, 185, 129, 0.10) 100%)',
              color: '#00D16C',
            }}
          >
            <CalendarDays size={22} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="text-sm font-semibold text-primary">Upcoming Posts</h3>
        </div>
        <button onClick={() => navigate('/app/calendar')} className="text-xs text-accent hover:underline font-medium">View calendar →</button>
      </div>
      {isLoading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} variant="timelineCard" />)}</div>
      ) : posts.length === 0 ? (
        <EmptyState icon={Calendar} title="No upcoming posts" description="Schedule your first post to see it here." actionLabel="Schedule post" onAction={() => navigate('/app/schedule')} />
      ) : (
        <div className="space-y-2">
          {posts.map((post) => <TimelineCard key={post.id} post={post} />)}
        </div>
      )}
    </motion.div>
  )
}

export function ActivityFeed() {
  const [activity, setActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => { setActivity(mockActivity.slice(0, 4)); setIsLoading(false) }, 400)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
      className="bg-surface border border-subtle rounded-2xl p-5 group">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center border border-[#00D16C]/20 transition-all duration-300 group-hover:border-[#00D16C]/40 group-hover:scale-105 group-hover:brightness-125 shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 209, 108, 0.15) 0%, rgba(16, 185, 129, 0.10) 100%)',
            color: '#00D16C',
          }}
        >
          <Bell size={22} className="transition-transform duration-300 group-hover:scale-110" />
        </div>
        <h3 className="text-sm font-semibold text-primary">Recent Activity</h3>
      </div>
      {isLoading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} variant="activityItem" />)}</div>
      ) : activity.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No recent activity"
          description="Team actions, notifications, and updates will appear right here."
        />
      ) : (
        <div className="space-y-4">
          {activity.map((a) => (
            <div key={a.id} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full accent-gradient flex items-center justify-center text-white text-[10px] font-bold shrink-0 overflow-hidden border border-subtle">
                {a.avatar ? <img src={a.avatar} alt={a.user} className="w-full h-full object-cover" /> : initials(a.user)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-primary">
                  <span className="font-medium">{a.user}</span>{' '}
                  <span className="text-secondary">{a.action}</span>
                </p>
                <p className="text-[11px] text-muted mt-0.5">{timeAgo(a.time)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export function AIRecommendationsCard() {
  const navigate = useNavigate()
  const recommendations = [
    { text: 'Post at 7 PM today for 32% higher engagement on Instagram', type: 'timing' },
    { text: 'Your TikTok audience is most active on Wednesdays — plan a video', type: 'platform' },
    { text: 'Reels get 4x more reach than static images on your Instagram', type: 'format' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="bg-surface border border-subtle rounded-2xl p-5 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center border border-[#00D16C]/20 transition-all duration-300 group-hover:border-[#00D16C]/40 group-hover:scale-105 group-hover:brightness-125 shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 209, 108, 0.15) 0%, rgba(16, 185, 129, 0.10) 100%)',
              color: '#00D16C',
            }}
          >
            <Sparkles size={22} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="text-sm font-semibold text-primary">AI Recommendations</h3>
        </div>
        <button onClick={() => navigate('/app/ai-studio')} className="text-xs text-accent hover:underline font-medium">Open AI Studio →</button>
      </div>
      <div className="space-y-3">
        {recommendations.map((r, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-surface-2">
            <span className="text-accent text-sm mt-0.5">✦</span>
            <p className="text-xs text-secondary leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function PerformanceSnapshot() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      postService.list({ workspaceId: 'ws_1' }),
      analyticsService.getSummary()
    ]).then(([posts, summary]) => {
      const publishedCount = posts.filter(p => p.status === POST_STATUS.PUBLISHED).length
      setStats({
        posts: publishedCount,
        engRate: '4.8%',
        followers: `+${summary.followerGrowth?.value || 312}`
      })
      setIsLoading(false)
    }).catch(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <div className="bg-surface border border-subtle rounded-2xl p-5"><Skeleton variant="card" /></div>
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
      className="bg-surface border border-subtle rounded-2xl p-5 cursor-pointer hover:shadow-token-md transition-all duration-200 group"
      onClick={() => navigate('/app/analytics')}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center border border-[#00D16C]/20 transition-all duration-300 group-hover:border-[#00D16C]/40 group-hover:scale-105 group-hover:brightness-125 shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 209, 108, 0.15) 0%, rgba(16, 185, 129, 0.10) 100%)',
              color: '#00D16C',
            }}
          >
            <LineChart size={22} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="text-sm font-semibold text-primary">This Week</h3>
        </div>
        <span className="text-xs text-accent hover:underline font-medium">Full analytics →</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Published', val: stats?.posts ?? '0', icon: Send },
          { label: 'Eng. Rate', val: stats?.engRate ?? '0%', icon: Heart },
          { label: 'New Followers', val: stats?.followers ?? '+0', icon: TrendingUp }
        ].map((item) => (
          <div key={item.label} className="text-center p-3 rounded-xl bg-surface-2 border border-subtle/50 flex flex-col items-center justify-center">
            <item.icon size={14} className="text-accent mb-1 opacity-80" />
            <p className="text-lg font-bold text-primary">{item.val}</p>
            <p className="text-[10px] text-muted mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-subtle/40">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[10px] font-semibold text-secondary">Weekly Traffic Trend</p>
          <span className="text-[10px] text-emerald-500 font-semibold">↑ 12.4% vs last week</span>
        </div>
        <div className="h-10 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { value: 400 }, { value: 650 }, { value: 500 }, { value: 800 },
              { value: 750 }, { value: 1100 }, { value: 950 }, { value: 1300 }
            ]}>
              <defs>
                <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={1.5} fill="url(#sparkGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

export function WorkspaceSummaryCard() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      platformService.list(),
      teamService.listMembers(),
      postService.list({ workspaceId: 'ws_1' })
    ]).then(([platforms, team, posts]) => {
      const activeMembers = team.filter(t => t.status === 'active').length
      const connectedCount = platforms.filter(p => p.connected).length
      const scheduledCount = posts.filter(p => p.status === POST_STATUS.SCHEDULED).length
      
      setData({
        members: `${activeMembers} member${activeMembers !== 1 ? 's' : ''}`,
        channels: `${connectedCount} channel${connectedCount !== 1 ? 's' : ''}`,
        queue: `${scheduledCount} in queue`
      })
      setIsLoading(false)
    }).catch(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <div className="bg-surface border border-subtle rounded-2xl p-5"><Skeleton variant="card" /></div>
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
      className="bg-surface border border-subtle rounded-2xl overflow-hidden cursor-pointer hover:shadow-token-md transition-all group"
      onClick={() => navigate('/app/workspaces')}>
      <div className="h-24 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
          alt="Workspace Cover"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-black/20 dark:bg-black/50 transition-colors duration-350" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent" />
        <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-md border border-[#00D16C]/40 shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 209, 108, 0.25) 0%, rgba(16, 185, 129, 0.18) 100%)',
                color: '#00D16C',
              }}
            >
              <Briefcase size={16} />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">Brand Workspace</span>
          </div>
          <div className="flex -space-x-1.5 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Team" className="h-5 w-5 rounded-full ring-1 ring-surface object-cover" />
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" alt="Team" className="h-5 w-5 rounded-full ring-1 ring-surface object-cover" />
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2.5">
        {[
          { label: 'Active Members', val: data?.members || '0 members', icon: Users },
          { label: 'Connected Accounts', val: data?.channels || '0 channels', icon: Link2 },
          { label: 'Scheduled Posts', val: data?.queue || '0 in queue', icon: CalendarDays }
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between text-xs">
            <span className="text-secondary flex items-center gap-2">
              <item.icon size={14} className="text-accent shrink-0" />
              {item.label}
            </span>
            <span className="font-semibold text-primary">{item.val}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
