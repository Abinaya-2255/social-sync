# Social Sync

> **Plan once. Publish everywhere.**

Social Sync is an AI-powered social media management platform that enables creators, agencies, startups, and businesses to plan, create, schedule, publish, and analyze content across multiple social media platforms from one centralized workspace.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages and Routes](#pages-and-routes)
- [Architecture](#architecture)
- [Design System](#design-system)
- [Backend Integration Guide](#backend-integration-guide)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)

---

## Overview

Social Sync provides a complete social media operating system combining:

- **Multi-platform scheduling** — Instagram, Facebook, LinkedIn, X, Pinterest, TikTok, YouTube
- **AI Studio** — Caption generation, hashtag optimization, tone rewriting, weekly planning, audience insights
- **Visual calendar** — Month / Week / Day views with post management
- **Deep analytics** — Engagement, reach, impressions, follower growth, platform comparison, best-time heatmap
- **Content Library** — Organized media repository with folder management
- **Team collaboration** — Role-based access, invites, activity feed
- **Multi-workspace support** — Isolated content, analytics, and accounts per brand or client
- **Dark / Light theme** — Full token-based theme system, persisted per user

The frontend is fully functional with realistic mock data. Swapping in a real backend requires only one environment variable change.

---

## Tech Stack

| Layer       | Technology                           |
|-------------|--------------------------------------|
| Framework   | React 19 + Vite 8                    |
| Routing     | React Router v7                      |
| Styling     | Tailwind CSS v4 (CSS-variable tokens)|
| Animation   | Framer Motion                        |
| Charts      | Recharts                             |
| Icons       | Lucide React                         |
| HTTP Client | Axios                                |
| State       | React Context + custom store factory |
| Font        | Inter (Google Fonts)                 |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# 1. Enter the project directory
cd social-sync

# 2. Install all dependencies
npm install

# 3. Copy environment config
cp .env.example .env

# 4. Start the development server
npm run dev
```

The app will be available at http://localhost:5173

### Demo Login

The app runs entirely on mock data. Go to /auth/login and enter any email and password to sign in.

---

## Project Structure

```
social-sync/
├── public/
│   └── favicon.svg
│
├── src/
│   ├── app/                           # Application bootstrap
│   │   ├── App.jsx                    # Root component + router setup
│   │   ├── AppProviders.jsx           # Context provider tree
│   │   └── routes/
│   │       ├── publicRoutes.jsx       # Marketing site routes
│   │       ├── authRoutes.jsx         # Login / Signup / Forgot password
│   │       └── appRoutes.jsx          # Protected app routes
│   │
│   ├── layouts/                       # Page shell components
│   │   ├── PublicLayout.jsx           # Header + Footer for marketing site
│   │   ├── AuthLayout.jsx             # Centered card for auth pages
│   │   └── AppLayout.jsx              # Sidebar + Header for the app
│   │
│   ├── pages/
│   │   ├── public/                    # Marketing / public pages
│   │   │   ├── LandingPage.jsx
│   │   │   ├── FeaturesPage.jsx
│   │   │   ├── PricingPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── FAQPage.jsx
│   │   │   ├── PrivacyPolicyPage.jsx
│   │   │   ├── TermsPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── ForgotPasswordPage.jsx
│   │   └── app/                       # Authenticated app pages
│   │       ├── dashboard/DashboardPage.jsx
│   │       ├── schedule/SchedulePostPage.jsx
│   │       ├── calendar/CalendarPage.jsx
│   │       ├── library/ContentLibraryPage.jsx
│   │       ├── analytics/AnalyticsPage.jsx
│   │       ├── ai-studio/AIStudioPage.jsx
│   │       ├── team/TeamManagementPage.jsx
│   │       ├── workspaces/WorkspacesPage.jsx
│   │       ├── notifications/NotificationsPage.jsx
│   │       ├── settings/SettingsPage.jsx
│   │       └── profile/ProfilePage.jsx
│   │
│   ├── features/                      # Feature-scoped components
│   │   └── dashboard/components/
│   │       ├── DashboardWidgets.jsx
│   │       └── DashboardFeed.jsx
│   │
│   ├── components/
│   │   ├── ui/                        # Reusable UI primitives
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── TimelineCard.jsx
│   │   │   ├── ChartCard.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Table.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── layout/                    # Shell / navigation components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── NotificationDropdown.jsx
│   │   │   ├── WorkspaceSwitcher.jsx
│   │   │   └── ProfileMenu.jsx
│   │   └── forms/
│   │       ├── Input.jsx
│   │       ├── Textarea.jsx
│   │       ├── Select.jsx
│   │       ├── FormField.jsx
│   │       ├── DatePicker.jsx
│   │       ├── EmojiPicker.jsx
│   │       └── MediaUpload.jsx
│   │
│   ├── context/                       # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── WorkspaceContext.jsx
│   │   └── ToastContext.jsx
│   │
│   ├── store/                         # Cross-page transient state
│   │   ├── createStore.js
│   │   ├── useUIStore.js
│   │   └── usePostDraftStore.js
│   │
│   ├── hooks/                         # Shared custom hooks
│   │   ├── useMediaQuery.js
│   │   ├── useDebounce.js
│   │   ├── useOutsideClick.js
│   │   ├── usePagination.js
│   │   └── usePersistedState.js
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── axiosClient.js         # Single Axios instance
│   │   │   ├── interceptors.js        # Auth injection, error normalization
│   │   │   └── endpoints.js           # Centralized API path constants
│   │   ├── modules/                   # One service per backend domain
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   ├── postService.js
│   │   │   ├── platformService.js
│   │   │   ├── analyticsService.js
│   │   │   ├── notificationService.js
│   │   │   ├── aiService.js
│   │   │   ├── workspaceService.js
│   │   │   ├── settingsService.js
│   │   │   ├── teamService.js
│   │   │   └── libraryService.js
│   │   └── mocks/                     # Realistic mock data
│   │       ├── mockUtils.js
│   │       ├── userMocks.js
│   │       ├── postMocks.js
│   │       ├── platformMocks.js
│   │       ├── analyticsMocks.js
│   │       ├── miscMocks.js
│   │       └── aiAndLibraryMocks.js
│   │
│   ├── lib/                           # Pure utilities and config
│   │   ├── platforms.js               # Platform registry (icons, colors, limits)
│   │   ├── PlatformIcons.jsx          # Inline SVG brand icons
│   │   ├── constants.js               # App-wide constants
│   │   ├── formatters.js              # Date, number, text formatters
│   │   └── validators.js              # Form validation helpers
│   │
│   ├── router-guards/
│   │   └── RequireAuth.jsx            # Auth guard for protected routes
│   │
│   ├── index.css                      # Tailwind v4 + CSS variable tokens
│   └── main.jsx                       # React DOM entry point
│
├── .env.example
├── index.html
├── vite.config.js
├── postcss.config.js
└── package.json
```

---

## Pages and Routes

### Public routes

| Route            | Page             |
|------------------|------------------|
| /                | Landing Page     |
| /features        | Features         |
| /pricing         | Pricing          |
| /about           | About            |
| /contact         | Contact          |
| /faq             | FAQ              |
| /privacy-policy  | Privacy Policy   |
| /terms           | Terms            |
| *                | 404 Not Found    |

### Auth routes

| Route                    | Page              |
|--------------------------|-------------------|
| /auth/login              | Sign In           |
| /auth/signup             | Create Account    |
| /auth/forgot-password    | Forgot Password   |

### App routes (require authentication)

| Route                    | Page                  |
|--------------------------|-----------------------|
| /app/dashboard           | Dashboard             |
| /app/schedule            | Schedule Post         |
| /app/calendar            | Content Calendar      |
| /app/library             | Content Library       |
| /app/analytics           | Analytics             |
| /app/ai-studio           | AI Studio             |
| /app/team                | Team Management       |
| /app/workspaces          | Workspaces            |
| /app/notifications       | Notifications         |
| /app/settings/*          | Settings (tabbed)     |
| /app/profile             | My Profile            |

---

## Architecture

### State management tiers

| Tier | Tool | Used for |
|------|------|----------|
| Global persistent | React Context | Auth session, theme, active workspace |
| Cross-page transient | Custom createStore | Post draft (survives navigation), UI flags |
| Component local | useState / useReducer | Form state, toggles, local UI |

### Data flow

```
Page / Feature Component
    calls service module (e.g. postService.js)
        checks VITE_USE_MOCKS env variable
            true  -> returns mock data with simulated latency
            false -> axiosClient -> interceptors -> real API
```

No component ever imports or calls axios directly. All data access is through src/services/modules/.

### Workspace scoping

Every data-fetching call that touches workspace-specific resources (posts, analytics, library, team members) is scoped to the active workspace ID. The axios interceptor automatically injects X-Workspace-Id into every request. Switching workspaces triggers a full data refresh.

---

## Design System

All visual tokens are CSS custom properties defined in src/index.css. Theme switching is a single class toggle on the html element.

### Core color tokens

| Token            | Dark value  | Light value |
|------------------|-------------|-------------|
| --bg-base        | #0B0C10     | #F8FAFC     |
| --bg-surface     | #1A1C23     | #FFFFFF     |
| --bg-surface-2   | #20232C     | #F1F5F9     |
| --border-subtle  | #2A2D37     | #E2E8F0     |
| --text-primary   | #F1F5F9     | #0B0C10     |
| --text-secondary | #94A3B8     | #475569     |
| --text-muted     | #64748B     | #94A3B8     |
| --accent         | #00D16C     | #00D16C     |

### Component styling convention

Components always reference CSS variable tokens, never hardcoded hex values:

```jsx
// Correct
<div className="bg-surface border border-subtle text-primary">

// Never
<div style={{ background: '#1A1C23', border: '1px solid #2A2D37' }}>
```

---

## Backend Integration Guide

### Step 1 — Set environment variables

```bash
# .env
VITE_USE_MOCKS=false
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

### Step 2 — Auth token flow

The axios interceptor (src/services/api/interceptors.js) automatically:
- Reads the JWT from localStorage key ss_token
- Injects Authorization: Bearer <token> into every request
- Injects X-Workspace-Id from localStorage key ss_active_workspace
- Normalizes all API errors to { message, code, status }

authService.login() stores the token; authService.logout() clears it.

### Step 3 — API endpoint reference

All endpoint paths are defined in src/services/api/endpoints.js. Every service module maps directly to these paths. Implement them on your backend and set VITE_USE_MOCKS=false.

```
POST   /auth/login
POST   /auth/signup
POST   /auth/forgot-password
POST   /auth/logout
GET    /users/me
PUT    /users/me
PUT    /users/me/password
GET    /posts
POST   /posts
PUT    /posts/:id
DELETE /posts/:id
POST   /posts/:id/publish
GET    /platforms
POST   /platforms/connect
POST   /platforms/:id/disconnect
GET    /analytics/summary
GET    /analytics/engagement
GET    /analytics/reach
GET    /analytics/growth
GET    /analytics/best-time
GET    /analytics/platform-comparison
GET    /notifications
POST   /notifications/:id/read
POST   /notifications/read-all
POST   /ai/caption
POST   /ai/hashtags
POST   /ai/tone
POST   /ai/rewrite
GET    /ai/ideas
GET    /ai/planner
GET    /ai/audience
GET    /workspaces
POST   /workspaces
GET    /workspaces/:id
GET    /settings
PUT    /settings
```

### Step 4 — Expected response shapes

Each mock file in src/services/mocks/ defines the exact JSON shape your real API must return. For example, the posts list endpoint must return an array where each item has:

```json
{
  "id": "string",
  "caption": "string",
  "platforms": ["instagram", "linkedin"],
  "status": "draft | scheduled | published | failed",
  "scheduledAt": "2026-06-30T19:00:00.000Z",
  "media": { "type": "image | video | none", "url": "string | null" },
  "workspaceId": "string"
}
```

### Step 5 — Adding new social platforms

Edit src/lib/platforms.js only. Add one entry to the PLATFORMS object:

```js
newplatform: {
  id: 'newplatform',
  label: 'New Platform',
  icon: NewPlatformIcon,   // component from PlatformIcons.jsx
  color: '#HEX',
  bg: 'rgba(r, g, b, 0.12)',
  charLimit: 500,
}
```

No other file in the codebase needs to change.

---

## Environment Variables

| Variable           | Default | Description                              |
|--------------------|---------|------------------------------------------|
| VITE_USE_MOCKS     | true    | true = mock data, false = real API       |
| VITE_API_BASE_URL  | /api    | Base URL for real backend API            |

---

## Available Scripts

```bash
npm run dev       # Development server at http://localhost:5173
npm run build     # Production build to /dist
npm run preview   # Preview the production build locally
npm run lint      # Lint with oxlint
```

---

## License

Private. All rights reserved.
