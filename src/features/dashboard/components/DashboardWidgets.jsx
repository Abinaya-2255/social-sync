import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarPlus, BarChart3, Sparkles, FolderOpen, Heart, Eye, TrendingUp, Link2 } from 'lucide-react'
import { motion } from 'framer-motion'
import StatCard from '../../../components/ui/StatCard.jsx'
import { analyticsService } from '../../../services/modules/analyticsService.js'
import { InstagramIcon, FacebookIcon, LinkedinIcon, XIcon, TikTokIcon, YoutubeIcon, PinterestIcon } from '../../../lib/PlatformIcons.jsx'
import Skeleton from '../../../components/ui/Skeleton.jsx'
import Button from '../../../components/ui/Button.jsx'
import EmptyState from '../../../components/ui/EmptyState.jsx'

const PLATFORM_ICONS = {
  instagram: { icon: InstagramIcon, color: '#E1306C' },
  facebook: { icon: FacebookIcon, color: '#1877F2' },
  linkedin: { icon: LinkedinIcon, color: '#0A66C2' },
  x: { icon: XIcon, color: 'var(--text-primary)' },
  pinterest: { icon: PinterestIcon, color: '#BD081C' },
  tiktok: { icon: TikTokIcon, color: '#00F2EA' },
  youtube: { icon: YoutubeIcon, color: '#FF0000' }
}

export function KpiCardGrid() {
  const [summary, setSummary] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    analyticsService.getSummary().then((data) => { setSummary(data); setIsLoading(false) })
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="bg-surface border border-subtle rounded-2xl p-5"><Skeleton variant="card" /></div>)}
      </div>
    )
  }

  const cards = [
    { label: 'Total Engagement', value: summary?.engagement?.value, delta: summary?.engagement?.delta, icon: Heart },
    { label: 'Reach', value: summary?.reach?.value, delta: summary?.reach?.delta, icon: Eye },
    { label: 'Impressions', value: summary?.impressions?.value, delta: summary?.impressions?.delta, icon: BarChart3 },
    { label: 'Follower Growth', value: summary?.followerGrowth?.value, delta: summary?.followerGrowth?.delta, icon: TrendingUp },
  ]

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c, i) => <StatCard key={c.label} {...c} index={i} />)}
    </div>
  )
}

export function QuickActions() {
  const navigate = useNavigate()
  const actions = [
    { label: 'Schedule Post', icon: CalendarPlus, path: '/app/schedule', primary: true },
    { label: 'View Analytics', icon: BarChart3, path: '/app/analytics', primary: false },
    { label: 'AI Studio', icon: Sparkles, path: '/app/ai-studio', primary: false },
    { label: 'Content Library', icon: FolderOpen, path: '/app/library', primary: false },
  ]
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((a) => (
        <Button key={a.label} variant={a.primary ? 'primary' : 'outline'} size="sm" icon={a.icon}
          onClick={() => navigate(a.path)}>
          {a.label}
        </Button>
      ))}
    </div>
  )
}

export function PlatformStatusCard() {
  const [platforms, setPlatforms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    import('../../../services/modules/platformService.js').then(({ platformService }) =>
      platformService.list().then((data) => { setPlatforms(data); setIsLoading(false) })
    )
  }, [])

  const connected = platforms.filter((p) => p.connected)
  const disconnected = platforms.filter((p) => !p.connected)

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className="bg-surface border border-subtle rounded-2xl p-5 cursor-pointer hover:shadow-token-md transition-all duration-200 group"
      onClick={() => navigate('/app/settings/platforms')}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center border border-[#00D16C]/20 transition-all duration-300 group-hover:border-[#00D16C]/40 group-hover:scale-105 group-hover:brightness-125 shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 209, 108, 0.15) 0%, rgba(16, 185, 129, 0.10) 100%)',
              color: '#00D16C',
            }}
          >
            <Link2 size={22} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="text-sm font-semibold text-primary">Connected Platforms</h3>
        </div>
        <span className="text-xs text-muted font-medium">{connected.length}/{platforms.length} active</span>
      </div>
      {isLoading ? <Skeleton variant="timelineCard" count={4} /> : platforms.length === 0 ? (
        <EmptyState
          icon={Link2}
          title="No platforms connected"
          description="Connect your social accounts to start scheduling and tracking."
        />
      ) : (
        <div className="space-y-2.5">
          {platforms.slice(0, 5).map((p) => {
            const platformConfig = PLATFORM_ICONS[p.id]
            const Icon = platformConfig?.icon || Link2
            return (
              <div key={p.id} className="flex items-center justify-between py-1.5 border-b border-subtle/30 last:border-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center border border-subtle/50 shrink-0" style={{ background: 'var(--bg-surface-2)' }}>
                    <Icon size={12} style={{ color: platformConfig?.color }} />
                  </div>
                  <span className="text-xs font-semibold text-primary">{p.handle || `@your${p.id}`}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${p.connected ? 'text-accent' : 'text-muted'}`}
                  style={{ background: p.connected ? 'var(--accent-glow)' : undefined }}>
                  {p.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            )
          })}
        </div>
      )}
      {disconnected.length > 0 && (
        <p className="text-xs text-yellow-500 mt-3">{disconnected.length} platform(s) need reconnection</p>
      )}
    </motion.div>
  )
}
