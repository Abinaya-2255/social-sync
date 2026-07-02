export const APP_NAME = 'Social Sync'
export const APP_TAGLINE = 'Plan once. Publish everywhere.'

export const POST_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  PUBLISHED: 'published',
  FAILED: 'failed',
}

export const STATUS_STYLES = {
  [POST_STATUS.DRAFT]: { label: 'Draft', color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.15)' },
  [POST_STATUS.SCHEDULED]: { label: 'Scheduled', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' },
  [POST_STATUS.PUBLISHED]: { label: 'Published', color: '#00D16C', bg: 'rgba(0, 209, 108, 0.15)' },
  [POST_STATUS.FAILED]: { label: 'Failed', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)' },
}

export const ROLES = ['Owner', 'Admin', 'Editor', 'Viewer']

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/app/dashboard', icon: 'LayoutDashboard' },
  { label: 'Schedule', path: '/app/schedule', icon: 'CalendarPlus' },
  { label: 'Calendar', path: '/app/calendar', icon: 'Calendar' },
  { label: 'Content Library', path: '/app/library', icon: 'FolderOpen' },
  { label: 'Analytics', path: '/app/analytics', icon: 'BarChart3' },
  { label: 'AI Studio', path: '/app/ai-studio', icon: 'Sparkles' },
  { label: 'Team', path: '/app/team', icon: 'Users' },
  { label: 'Settings', path: '/app/settings', icon: 'Settings' },
]
