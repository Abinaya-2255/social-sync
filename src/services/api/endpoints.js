export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    forgotPassword: '/auth/forgot-password',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  users: {
    me: '/users/me',
    updateProfile: '/users/me',
    changePassword: '/users/me/password',
  },
  posts: {
    list: '/posts',
    create: '/posts',
    detail: (id) => `/posts/${id}`,
    publishNow: (id) => `/posts/${id}/publish`,
  },
  platforms: {
    list: '/platforms',
    connect: '/platforms/connect',
    disconnect: (id) => `/platforms/${id}/disconnect`,
  },
  analytics: {
    summary: '/analytics/summary',
    engagement: '/analytics/engagement',
    reach: '/analytics/reach',
    growth: '/analytics/growth',
    bestTime: '/analytics/best-time',
  },
  notifications: {
    list: '/notifications',
    markRead: (id) => `/notifications/${id}/read`,
  },
  ai: {
    caption: '/ai/caption',
    hashtags: '/ai/hashtags',
    tone: '/ai/tone',
    rewrite: '/ai/rewrite',
    ideas: '/ai/ideas',
    planner: '/ai/planner',
    audience: '/ai/audience',
  },
  workspaces: {
    list: '/workspaces',
    create: '/workspaces',
    detail: (id) => `/workspaces/${id}`,
  },
  settings: {
    get: '/settings',
    update: '/settings',
  },
}
