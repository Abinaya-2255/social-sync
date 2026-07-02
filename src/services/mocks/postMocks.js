import { POST_STATUS } from '../../lib/constants.js'

const now = Date.now()
const day = 86400000

export const mockPosts = [
  {
    id: 'post_1',
    caption: '🚀 Social Sync 2.0 is officially live! Plan, create, schedule, and analyze your social channels from one unified, dark-mode workspace. Link in bio to try it free.',
    platforms: ['instagram', 'facebook'],
    status: POST_STATUS.SCHEDULED,
    scheduledAt: new Date(now + day * 1).toISOString(),
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80' },
    workspaceId: 'ws_1',
  },
  {
    id: 'post_2',
    caption: 'Scaling a remote team is about clear workflows, not micromanagement. Here are 5 asynchronous rules we use to coordinate across 6 time zones. Thread below 🧵',
    platforms: ['linkedin', 'x'],
    status: POST_STATUS.SCHEDULED,
    scheduledAt: new Date(now + day * 1.5).toISOString(),
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80' },
    workspaceId: 'ws_1',
  },
  {
    id: 'post_3',
    caption: 'Deep-diving into our custom chart rendering pipeline. Matrix Green theme never looked so good. 📈🧪 #uidesign #webdev',
    platforms: ['instagram', 'tiktok'],
    status: POST_STATUS.DRAFT,
    scheduledAt: new Date(now + day * 2).toISOString(),
    media: { type: 'video', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80' },
    workspaceId: 'ws_1',
  },
  {
    id: 'post_4',
    caption: 'Aesthetic mood boards and workspace inspiration for setting up a distraction-free home office setup 🏡💻',
    platforms: ['pinterest'],
    status: POST_STATUS.SCHEDULED,
    scheduledAt: new Date(now + day * 3).toISOString(),
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80' },
    workspaceId: 'ws_1',
  },
  {
    id: 'post_5',
    caption: 'Building Antigravity: How we designed the real-time AI and collaboration engine for modern social media agencies.',
    platforms: ['youtube'],
    status: POST_STATUS.PUBLISHED,
    scheduledAt: new Date(now - day * 1).toISOString(),
    media: { type: 'video', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80' },
    workspaceId: 'ws_1',
  },
  {
    id: 'post_6',
    caption: 'Flash sale: Get 30% off any Social Sync annual plan for the next 24 hours only. Code: SYNC30 at checkout. ⚡',
    platforms: ['facebook', 'instagram', 'x'],
    status: POST_STATUS.FAILED,
    scheduledAt: new Date(now - day * 0.5).toISOString(),
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    workspaceId: 'ws_1',
  },
  {
    id: 'post_7',
    caption: 'Case Study: How Apex Creative scaled client onboarding by 4x and saved 15+ hours a week using customized team workspaces.',
    platforms: ['linkedin'],
    status: POST_STATUS.PUBLISHED,
    scheduledAt: new Date(now - day * 3).toISOString(),
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
    workspaceId: 'ws_1',
  },
  {
    id: 'post_8',
    caption: 'Quick guide: How to schedule high-engaging cross-platform content in under 60 seconds. ⏱️✨',
    platforms: ['tiktok', 'instagram'],
    status: POST_STATUS.SCHEDULED,
    scheduledAt: new Date(now + day * 4).toISOString(),
    media: { type: 'video', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80' },
    workspaceId: 'ws_1',
  },
]
