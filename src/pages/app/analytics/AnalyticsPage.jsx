import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'
import {
  TrendingUp, Eye, Heart, BarChart3,
  Download, RefreshCw
} from 'lucide-react'
import { analyticsService } from '../../../services/modules/analyticsService.js'
import { formatNumber } from '../../../lib/formatters.js'
import Button from '../../../components/ui/Button.jsx'
import Skeleton from '../../../components/ui/Skeleton.jsx'
import EmptyState from '../../../components/ui/EmptyState.jsx'
import { useToast } from '../../../context/ToastContext.jsx'
import AnimatedCounter from '../../../components/ui/AnimatedCounter.jsx'

/* ─── Custom Tooltip ─── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface/90 backdrop-blur-md border border-subtle/80 rounded-2xl p-3.5 shadow-token-lg min-w-[150px] transition-all duration-200">
      <p className="text-xs font-semibold text-primary mb-2 border-b border-subtle/50 pb-1">{label}</p>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-secondary">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <span className="font-bold text-primary">{formatNumber(entry.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── KPI Row ─── */
function KpiRow({ summary, isLoading }) {
  const cards = [
    { label: 'Total Engagement', value: summary?.engagement?.value, delta: summary?.engagement?.delta, icon: Heart },
    { label: 'Total Reach', value: summary?.reach?.value, delta: summary?.reach?.delta, icon: Eye },
    { label: 'Impressions', value: summary?.impressions?.value, delta: summary?.impressions?.delta, icon: BarChart3 },
    { label: 'Follower Growth', value: summary?.followerGrowth?.value, delta: summary?.followerGrowth?.delta, icon: TrendingUp },
  ]
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <motion.div key={c.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          className="bg-surface border border-subtle rounded-2xl p-5 group hover:shadow-token-md transition-all duration-200">
          {isLoading ? <Skeleton variant="card" /> : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center border border-[#00D16C]/20 transition-all duration-300 group-hover:border-[#00D16C]/40 group-hover:scale-105 group-hover:brightness-125 shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 209, 108, 0.15) 0%, rgba(16, 185, 129, 0.10) 100%)',
                    color: '#00D16C',
                  }}
                >
                  <c.icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                {c.delta !== undefined && (
                  <span className={`text-xs font-semibold ${c.delta >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {c.delta >= 0 ? '↑' : '↓'} {Math.abs(c.delta).toFixed(1)}%
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-primary text-left">
                {c.value !== undefined ? <AnimatedCounter value={c.value} /> : '0'}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted">{c.label}</p>
                {c.label === 'Follower Growth' && (
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="" className="inline-block h-5 w-5 rounded-full ring-2 ring-surface object-cover" />
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" alt="" className="inline-block h-5 w-5 rounded-full ring-2 ring-surface object-cover" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="" className="inline-block h-5 w-5 rounded-full ring-2 ring-surface object-cover" />
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Best Time Heatmap ─── */
function BestTimeHeatmap({ data, isLoading }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = [9, 13, 19]
  const hourLabels = { 9: '9 AM', 13: '1 PM', 19: '7 PM' }

  const getScore = (day, hour) => data.find((d) => d.day === day && d.hour === hour)?.score ?? 0
  const max = Math.max(...(data.map((d) => d.score) || [1]))

  return (
    <div className="bg-surface border border-subtle rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-primary mb-4">Best Posting Times</h3>
      {isLoading ? <Skeleton variant="card" /> : (!data || data.length === 0) ? (
        <EmptyState
          icon={BarChart3}
          title="No timing insights yet"
          description="Schedule posts across multiple times and days to generate engagement heatmaps."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[360px]">
            <thead>
              <tr>
                <th className="text-left text-muted font-medium pb-2 pr-3 w-12" />
                {hours.map((h) => (
                  <th key={h} className="text-center text-muted font-medium pb-2 px-2">{hourLabels[h]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td className="text-muted pr-3 py-1.5 font-medium">{day}</td>
                  {hours.map((hour) => {
                    const score = getScore(day, hour)
                    const intensity = score / max
                    return (
                      <td key={hour} className="px-2 py-1.5">
                        <div
                          title={`${day} ${hourLabels[hour]}: Score ${score}`}
                          className="h-8 rounded-lg mx-auto w-full cursor-default transition-opacity hover:opacity-80"
                          style={{
                            background: `rgba(0, 209, 108, ${0.1 + intensity * 0.9})`,
                            border: `1px solid rgba(0, 209, 108, ${0.15 + intensity * 0.4})`,
                          }}
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end gap-2 mt-3">
            <span className="text-[10px] text-muted">Low</span>
            {[0.1, 0.3, 0.55, 0.75, 0.9].map((o) => (
              <div key={o} className="w-4 h-4 rounded" style={{ background: `rgba(0, 209, 108, ${o})` }} />
            ))}
            <span className="text-[10px] text-muted">High</span>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Platform Comparison Bar ─── */
function PlatformComparison({ data, isLoading }) {
  return (
    <div className="bg-surface border border-subtle rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-primary mb-4">Platform Comparison</h3>
      {isLoading ? <Skeleton variant="chart" /> : (!data || data.length === 0) ? (
        <EmptyState
          icon={BarChart3}
          title="No platform comparison data"
          description="Connect social accounts and publish posts to compare cross-channel performance."
        />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barGap={6}>
            <CartesianGrid vertical={false} stroke="var(--border-subtle)" strokeDasharray="3 3" />
            <XAxis dataKey="platform" tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} dy={6} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} dx={-6} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
            <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'Inter', color: 'var(--text-muted)', paddingTop: 10 }} />
            <Bar dataKey="engagement" name="Engagement" fill="var(--chart-green)" radius={[6, 6, 0, 0]} isAnimationActive={true} animationDuration={1200} />
            <Bar dataKey="reach" name="Reach" fill="#3B82F6" radius={[6, 6, 0, 0]} isAnimationActive={true} animationDuration={1200} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

/* ─── Date range picker ─── */
const RANGES = ['7 days', '14 days', '30 days', '90 days']

/* ─── Main page ─── */
export default function AnalyticsPage() {
  const [summary, setSummary] = useState(null)
  const [engagement, setEngagement] = useState([])
  const [reach, setReach] = useState([])
  const [growth, setGrowth] = useState([])
  const [comparison, setComparison] = useState([])
  const [heatmap, setHeatmap] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [range, setRange] = useState('14 days')
  const toast = useToast()

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [s, e, r, g, c, h] = await Promise.all([
        analyticsService.getSummary(),
        analyticsService.getEngagement(),
        analyticsService.getReach(),
        analyticsService.getGrowth(),
        analyticsService.getPlatformComparison(),
        analyticsService.getBestPostingTimes(),
      ])
      setSummary(s); setEngagement(e); setReach(r); setGrowth(g); setComparison(c); setHeatmap(h)
    } catch {
      toast.error('Failed to load analytics data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { loadData() }, [range])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Analytics</h1>
          <p className="text-sm text-muted mt-0.5">Track performance across all connected platforms</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-surface-2 border border-subtle rounded-xl overflow-hidden">
            {RANGES.map((r) => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-3 py-2 text-xs font-medium transition-colors ${range === r ? 'bg-surface text-primary shadow-token-sm' : 'text-muted hover:text-primary'}`}>
                {r}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={loadData}>Refresh</Button>
          <Button variant="outline" size="sm" icon={Download}>Export</Button>
        </div>
      </div>

      {/* KPI row */}
      <KpiRow summary={summary} isLoading={isLoading} />

      {/* Engagement chart */}
      <div className="bg-surface border border-subtle rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-primary">Engagement Over Time</h3>
            <p className="text-xs text-muted mt-0.5">Likes, comments, shares, and saves combined</p>
          </div>
        </div>
        {isLoading ? <Skeleton variant="chart" /> : (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={engagement}>
              <defs>
                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-green)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--chart-green)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border-subtle)" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} dy={6} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} dx={-6} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="engagement" name="Engagement" stroke="var(--chart-green)" strokeWidth={2} fill="url(#engGrad)" dot={false} activeDot={{ r: 4, fill: 'var(--chart-green)' }} isAnimationActive={true} animationDuration={1200} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Reach + Follower Growth side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-surface border border-subtle rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-primary mb-1">Reach</h3>
          <p className="text-xs text-muted mb-4">Unique accounts reached per day</p>
          {isLoading ? <Skeleton variant="chart" /> : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={reach}>
                <defs>
                  <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--border-subtle)" strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} dy={6} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} dx={-6} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="reach" name="Reach" stroke="#3B82F6" strokeWidth={2} fill="url(#reachGrad)" dot={false} activeDot={{ r: 4, fill: '#3B82F6' }} isAnimationActive={true} animationDuration={1200} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-surface border border-subtle rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-primary mb-1">Follower Growth</h3>
          <p className="text-xs text-muted mb-4">Total followers across all platforms</p>
          {isLoading ? <Skeleton variant="chart" /> : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={growth}>
                <defs>
                  <linearGradient id="growGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--border-subtle)" strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} dy={6} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} dx={-6} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="followers" name="Followers" stroke="#8B5CF6" strokeWidth={2} fill="url(#growGrad)" dot={false} activeDot={{ r: 4, fill: '#8B5CF6' }} isAnimationActive={true} animationDuration={1200} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Platform comparison + Best times */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PlatformComparison data={comparison} isLoading={isLoading} />
        <BestTimeHeatmap data={heatmap} isLoading={isLoading} />
      </div>
    </div>
  )
}
