import { lazy } from 'react'
import AppLayout from '../../layouts/AppLayout.jsx'
import RequireAuth from '../../router-guards/RequireAuth.jsx'

const DashboardPage      = lazy(() => import('../../pages/app/dashboard/DashboardPage.jsx'))
const SchedulePostPage   = lazy(() => import('../../pages/app/schedule/SchedulePostPage.jsx'))
const CalendarPage       = lazy(() => import('../../pages/app/calendar/CalendarPage.jsx'))
const ContentLibraryPage = lazy(() => import('../../pages/app/library/ContentLibraryPage.jsx'))
const AnalyticsPage      = lazy(() => import('../../pages/app/analytics/AnalyticsPage.jsx'))
const AIStudioPage       = lazy(() => import('../../pages/app/ai-studio/AIStudioPage.jsx'))
const TeamManagementPage = lazy(() => import('../../pages/app/team/TeamManagementPage.jsx'))
const WorkspacesPage     = lazy(() => import('../../pages/app/workspaces/WorkspacesPage.jsx'))
const NotificationsPage  = lazy(() => import('../../pages/app/notifications/NotificationsPage.jsx'))
const SettingsPage       = lazy(() => import('../../pages/app/settings/SettingsPage.jsx'))
const ProfilePage        = lazy(() => import('../../pages/app/profile/ProfilePage.jsx'))

export const appRoutes = {
  path: '/app',
  element: <RequireAuth />,
  children: [
    {
      element: <AppLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'schedule', element: <SchedulePostPage /> },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'library', element: <ContentLibraryPage /> },
        { path: 'analytics', element: <AnalyticsPage /> },
        { path: 'ai-studio', element: <AIStudioPage /> },
        { path: 'team', element: <TeamManagementPage /> },
        { path: 'workspaces', element: <WorkspacesPage /> },
        { path: 'notifications', element: <NotificationsPage /> },
        { path: 'settings/*', element: <SettingsPage /> },
        { path: 'profile', element: <ProfilePage /> },
      ],
    },
  ],
}
