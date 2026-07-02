import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, NavLink } from 'react-router-dom'
import { User, Building2, Globe2, Palette, Lock, Bell } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext.jsx'
import { useTheme } from '../../../context/ThemeContext.jsx'
import { useWorkspace } from '../../../context/WorkspaceContext.jsx'
import { userService } from '../../../services/modules/userService.js'
import { platformService } from '../../../services/modules/platformService.js'
import { useToast } from '../../../context/ToastContext.jsx'
import { initials } from '../../../lib/formatters.js'
import { PLATFORM_LIST } from '../../../lib/platforms.js'
import Button from '../../../components/ui/Button.jsx'

const TABS = [
  { label: 'Profile', path: 'profile', icon: User },
  { label: 'Workspace', path: 'workspace', icon: Building2 },
  { label: 'Platforms', path: 'platforms', icon: Globe2 },
  { label: 'Appearance', path: 'appearance', icon: Palette },
  { label: 'Security', path: 'security', icon: Lock },
  { label: 'Notifications', path: 'notifications', icon: Bell },
]

/* ── Profile ── */
function ProfileSettings() {
  const { user, setUser } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', company: user?.company || '', timezone: user?.timezone || '' })
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const updated = await userService.updateProfile(form)
      setUser((prev) => ({ ...prev, ...updated }))
      toast.success('Settings Updated', 'Your profile details have been saved successfully.')
    } catch { toast.error('Update Failed', 'We could not save your profile changes at this time.') } finally { setIsLoading(false) }
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div><h2 className="text-base font-semibold text-primary">Profile</h2><p className="text-xs text-muted mt-0.5">Update your personal information</p></div>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center text-white text-xl font-bold">{initials(user?.name || 'U')}</div>
        <div>
          <p className="text-sm font-semibold text-primary">{user?.name}</p>
          <p className="text-xs text-muted">{user?.email}</p>
        </div>
      </div>
      <div className="space-y-4">
        {[{ name: 'name', label: 'Full Name' }, { name: 'company', label: 'Company / Brand' }, { name: 'timezone', label: 'Timezone' }].map((f) => (
          <div key={f.name} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary">{f.label}</label>
            <input name={f.name} value={form[f.name]} onChange={(e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))}
              className="w-full bg-surface-2 border border-subtle rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
          </div>
        ))}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-primary">Email</label>
          <input value={user?.email || ''} disabled className="w-full bg-surface-2 border border-subtle rounded-xl px-4 py-2.5 text-sm text-muted cursor-not-allowed" />
          <p className="text-xs text-muted">Email changes require verification</p>
        </div>
      </div>
      <Button onClick={handleSave} isLoading={isLoading}>Save Changes</Button>
    </div>
  )
}

/* ── Workspace ── */
function WorkspaceSettings() {
  const { activeWorkspace } = useWorkspace()
  const [name, setName] = useState(activeWorkspace?.name || '')
  const toast = useToast()
  return (
    <div className="space-y-6 max-w-lg">
      <div><h2 className="text-base font-semibold text-primary">Workspace</h2><p className="text-xs text-muted mt-0.5">Manage your workspace settings</p></div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-primary">Workspace Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)}
          className="w-full bg-surface-2 border border-subtle rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
      </div>
      <div className="p-4 rounded-xl bg-surface-2 border border-subtle">
        <p className="text-xs font-semibold text-primary mb-2">Danger zone</p>
        <p className="text-xs text-muted mb-3">Deleting a workspace is permanent and cannot be undone.</p>
        <Button variant="danger" size="sm" onClick={() => toast.warning('Action Required', 'Please contact workspace admin or support to delete this workspace.')}>Delete Workspace</Button>
      </div>
      <Button onClick={() => toast.success('Settings Updated', 'Your workspace configuration has been saved.')}>Save Changes</Button>
    </div>
  )
}

/* ── Platforms ── */
function PlatformConnections() {
  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    platformService.list().then((data) => { setConnections(data); setLoading(false) })
  }, [])

  const toggle = async (platformId, connected) => {
    try {
      if (connected) {
        await platformService.disconnect(platformId)
        toast.success('Platform Disconnected', 'Your social account has been unlinked from this workspace.')
      } else {
        await platformService.connect(platformId)
        toast.success('Platform Connected', 'Your account is now linked and ready for scheduling.')
      }
      setConnections((prev) => prev.map((c) => c.id === platformId ? { ...c, connected: !connected } : c))
    } catch {
      toast.error('Connection Failed', 'We could not update platform connection. Please try again.')
    }
  }

  return (
    <div className="space-y-5 max-w-lg">
      <div><h2 className="text-base font-semibold text-primary">Connected Platforms</h2><p className="text-xs text-muted mt-0.5">Manage your social media account connections</p></div>
      {loading ? <p className="text-sm text-muted">Loading...</p> : (
        <div className="space-y-3">
          {PLATFORM_LIST.map((platform) => {
            const conn = connections.find((c) => c.id === platform.id)
            return (
              <div key={platform.id} className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-subtle">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: platform.bg }}>
                  <platform.icon size={18} style={{ color: platform.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-primary">{platform.label}</p>
                  <p className="text-xs text-muted">{conn?.handle || 'Not connected'}</p>
                </div>
                <Button size="sm" variant={conn?.connected ? 'outline' : 'primary'} onClick={() => toggle(platform.id, conn?.connected)}>
                  {conn?.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ── Appearance ── */
function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="space-y-6 max-w-lg">
      <div><h2 className="text-base font-semibold text-primary">Appearance</h2><p className="text-xs text-muted mt-0.5">Customize how Social Sync looks</p></div>
      <div>
        <label className="text-sm font-medium text-primary mb-3 block">Theme</label>
        <div className="grid grid-cols-2 gap-3">
          {['dark', 'light'].map((t) => (
            <button key={t} onClick={() => setTheme(t)}
              className={`p-4 rounded-2xl border text-left transition-all ${theme === t ? 'border-accent bg-[var(--accent-glow)]' : 'border-subtle bg-surface hover:border-[var(--accent)]'}`}>
              <div className={`w-full h-14 rounded-xl mb-3 border border-subtle flex items-center justify-center ${t === 'dark' ? 'bg-[#0B0C10]' : 'bg-[#F8FAFC]'}`}>
                <div className="w-8 h-1.5 rounded-full bg-[#00D16C]" />
              </div>
              <p className={`text-sm font-semibold capitalize ${theme === t ? 'text-accent' : 'text-primary'}`}>{t} Mode</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Security ── */
function SecuritySettings() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleSave = async () => {
    if (form.next !== form.confirm) { toast.warning('Password Mismatch', 'The new passwords entered do not match.'); return }
    if (form.next.length < 8) { toast.warning('Password Too Short', 'Password must contain at least 8 characters.'); return }
    setIsLoading(true)
    try {
      await userService.changePassword(form)
      toast.success('Settings Updated', 'Your password has been changed successfully.')
      setForm({ current: '', next: '', confirm: '' })
    } catch { toast.error('Update Failed', 'Could not update your password at this time.') } finally { setIsLoading(false) }
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div><h2 className="text-base font-semibold text-primary">Security</h2><p className="text-xs text-muted mt-0.5">Manage your password and account security</p></div>
      <div className="space-y-4">
        {[{ name: 'current', label: 'Current Password' }, { name: 'next', label: 'New Password' }, { name: 'confirm', label: 'Confirm New Password' }].map((f) => (
          <div key={f.name} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary">{f.label}</label>
            <input type="password" name={f.name} value={form[f.name]}
              onChange={(e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))}
              placeholder="••••••••"
              className="w-full bg-surface-2 border border-subtle rounded-xl px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
          </div>
        ))}
      </div>
      <Button onClick={handleSave} isLoading={isLoading} icon={Lock}>Update Password</Button>
      <div className="p-4 rounded-2xl border border-subtle bg-surface flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Two-Factor Authentication</p>
          <p className="text-xs text-muted">Add an extra layer of security to your account</p>
        </div>
        <Button size="sm" variant="outline" onClick={() => toast.info('2FA setup coming soon')}>Enable</Button>
      </div>
    </div>
  )
}

/* ── Notification prefs ── */
function NotificationPreferences() {
  const [prefs, setPrefs] = useState({ postPublished: true, postFailed: true, teamInvite: true, weeklyReport: false, platformAlert: true, marketingEmails: false })
  const toast = useToast()
  const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }))

  const list = [
    { key: 'postPublished', label: 'Post published', desc: 'When a scheduled post goes live' },
    { key: 'postFailed', label: 'Post failed', desc: 'When a post fails to publish' },
    { key: 'teamInvite', label: 'Team invites', desc: 'When someone joins your workspace' },
    { key: 'weeklyReport', label: 'Weekly report', desc: 'Performance summary every Monday' },
    { key: 'platformAlert', label: 'Platform alerts', desc: 'When an account needs reconnection' },
    { key: 'marketingEmails', label: 'Product updates', desc: 'Tips, new features, and announcements' },
  ]

  return (
    <div className="space-y-5 max-w-lg">
      <div><h2 className="text-base font-semibold text-primary">Notification Preferences</h2><p className="text-xs text-muted mt-0.5">Choose what you'd like to be notified about</p></div>
      <div className="space-y-2">
        {list.map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-surface border border-subtle">
            <div>
              <p className="text-sm font-medium text-primary">{item.label}</p>
              <p className="text-xs text-muted">{item.desc}</p>
            </div>
            <button onClick={() => toggle(item.key)} role="switch" aria-checked={prefs[item.key]}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${prefs[item.key] ? 'bg-accent' : 'bg-surface-2 border border-subtle'}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${prefs[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        ))}
      </div>
      <Button onClick={() => toast.success('Settings Updated', 'Your notification preferences have been saved successfully.')}>Save Preferences</Button>
    </div>
  )
}

/* ── Main ── */
export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-sm text-muted mt-0.5">Manage your account, workspace, and preferences</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-52 shrink-0">
          <nav className="bg-surface border border-subtle rounded-2xl p-2 space-y-0.5">
            {TABS.map((tab) => (
              <NavLink key={tab.path} to={tab.path}
                className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-surface-2 text-primary' : 'text-secondary hover:bg-surface-2 hover:text-primary'}`}>
                <tab.icon size={15} className="shrink-0" />
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex-1 min-w-0 bg-surface border border-subtle rounded-2xl p-6">
          <Routes>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="workspace" element={<WorkspaceSettings />} />
            <Route path="platforms" element={<PlatformConnections />} />
            <Route path="appearance" element={<AppearanceSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="notifications" element={<NotificationPreferences />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
