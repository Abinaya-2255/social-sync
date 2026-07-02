const now = Date.now()
const hr = 3600000

export const mockNotifications = [
  { id: 'n1', title: 'Post published successfully', body: '"Case Study: Apex Creative" went live on LinkedIn.', read: false, createdAt: new Date(now - hr * 1).toISOString() },
  { id: 'n2', title: 'Post failed to publish', body: '"Flash sale alert" failed on X — check connection.', read: false, createdAt: new Date(now - hr * 3).toISOString() },
  { id: 'n3', title: 'New team member joined', body: 'Priya Nair accepted your invite as Editor.', read: true, createdAt: new Date(now - hr * 20).toISOString() },
  { id: 'n4', title: 'Weekly report ready', body: 'Your weekly performance snapshot is ready to view.', read: true, createdAt: new Date(now - hr * 30).toISOString() },
  { id: 'n5', title: 'Platform reconnect needed', body: 'Pinterest needs to be reconnected to continue scheduling.', read: false, createdAt: new Date(now - hr * 48).toISOString() },
]

export const mockActivity = [
  { id: 'a1', user: 'Jordan Reyes', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', action: 'scheduled a new post for Instagram', time: new Date(now - hr * 2).toISOString() },
  { id: 'a2', user: 'Priya Nair', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', action: 'commented on "Q3 Roadmap Thread"', time: new Date(now - hr * 5).toISOString() },
  { id: 'a3', user: 'Marcus Lee', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', action: 'connected a new TikTok account', time: new Date(now - hr * 9).toISOString() },
  { id: 'a4', user: 'Jordan Reyes', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', action: 'published "Case Study: Apex Creative" to LinkedIn', time: new Date(now - hr * 14).toISOString() },
  { id: 'a5', user: 'Priya Nair', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', action: 'uploaded 12 new assets to Content Library', time: new Date(now - hr * 22).toISOString() },
]

export const mockTeamMembers = [
  { id: 't1', name: 'Jordan Reyes', email: 'jordan@socialsync.app', role: 'Owner', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', online: true, status: 'active' },
  { id: 't2', name: 'Priya Nair', email: 'priya@socialsync.app', role: 'Editor', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', online: true, status: 'active' },
  { id: 't3', name: 'Marcus Lee', email: 'marcus@socialsync.app', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', online: false, status: 'active' },
  { id: 't4', name: 'Sofia Garcia', email: 'sofia@socialsync.app', role: 'Viewer', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80', online: false, status: 'pending' },
]

export const mockWorkspaces = [
  { id: 'ws_1', name: 'Reyes Creative Studio', plan: 'Agency', members: 4, accounts: 5, active: true, posts: 28 },
  { id: 'ws_2', name: 'Brewhouse Coffee Co.', plan: 'Business', members: 2, accounts: 3, active: false, posts: 14 },
  { id: 'ws_3', name: 'Personal Brand', plan: 'Creator', members: 1, accounts: 2, active: false, posts: 4 },
]

export const mockComments = [
  { id: 'c1', author: 'Priya Nair', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', text: 'Can we swap the CTA copy on this one before it goes live?', time: new Date(now - hr * 4).toISOString() },
  { id: 'c2', author: 'Marcus Lee', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', text: 'Approved — looks great, ship it.', time: new Date(now - hr * 6).toISOString() },
]
