import { useAuth } from '../../../context/AuthContext.jsx'
import { KpiCardGrid, QuickActions, PlatformStatusCard } from '../../../features/dashboard/components/DashboardWidgets.jsx'
import {
  UpcomingQueue, ActivityFeed, AIRecommendationsCard,
  PerformanceSnapshot, WorkspaceSummaryCard
} from '../../../features/dashboard/components/DashboardFeed.jsx'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const { user } = useAuth()

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-bold text-primary">
          {greeting()}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-muted mt-1">Here's what's happening across your social channels.</p>
      </motion.div>

      {/* Quick Actions */}
      <QuickActions />

      {/* KPI Cards */}
      <KpiCardGrid />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: upcoming queue + activity */}
        <div className="lg:col-span-2 space-y-6">
          <UpcomingQueue />
          <ActivityFeed />
        </div>

        {/* Right sidebar widgets */}
        <div className="space-y-6">
          <PerformanceSnapshot />
          <PlatformStatusCard />
          <WorkspaceSummaryCard />
          <AIRecommendationsCard />
        </div>
      </div>
    </div>
  )
}
