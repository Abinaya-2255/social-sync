import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Mail, Building2, Globe, Clock, Link2, Shield, LogOut } from 'lucide-react'
import { InstagramIcon, LinkedinIcon, XIcon } from '../../../lib/PlatformIcons.jsx'
import { useAuth } from '../../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { userService } from '../../../services/modules/userService.js'
import { useToast } from '../../../context/ToastContext.jsx'
import { initials, formatDate } from '../../../lib/formatters.js'
import Button from '../../../components/ui/Button.jsx'
import Skeleton from '../../../components/ui/Skeleton.jsx'

function StatPill({ label, value }) {
  return (
    <div className="text-center p-4 bg-surface-2 rounded-2xl">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-xs text-muted mt-1">{label}</p>
    </div>
  )
}

export default function ProfilePage() {
  const { user, setUser, logout } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    company: user?.company || '',
    timezone: user?.timezone || '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  if (!user) return <Skeleton variant="profile" />

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const updated = await userService.updateProfile(form)
      setUser((prev) => ({ ...prev, ...updated }))
      toast.success('Profile updated')
      setIsEditing(false)
    } catch { toast.error('Update failed') } finally { setIsSaving(false) }
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    // Navigate away from the protected route BEFORE clearing auth state.
    navigate('/', { replace: true })
    await logout()
    setIsLoggingOut(false)
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Profile</h1>
        <p className="text-sm text-muted mt-0.5">Manage your account details and preferences</p>
      </div>

      {/* Profile card */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-subtle rounded-2xl p-6">
        <div className="flex items-start gap-5 flex-wrap">
          {/* Avatar */}
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 rounded-2xl accent-gradient flex items-center justify-center text-white text-2xl font-bold overflow-hidden border border-subtle">
              {user?.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : initials(user?.name || 'U')}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={18} className="text-white" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <input name="name" value={form.name} onChange={handleChange}
                  className="w-full bg-surface-2 border border-subtle rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                <input name="company" value={form.company} onChange={handleChange}
                  placeholder="Company / Brand"
                  className="w-full bg-surface-2 border border-subtle rounded-xl px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                <input name="timezone" value={form.timezone} onChange={handleChange}
                  placeholder="Timezone"
                  className="w-full bg-surface-2 border border-subtle rounded-xl px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
                <div className="flex gap-2">
                  <Button onClick={handleSave} isLoading={isSaving} size="sm">Save</Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-primary">{user?.name}</h2>
                <p className="text-sm text-muted">{user?.role} · {user?.company}</p>
                <div className="flex flex-wrap gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-xs text-secondary"><Mail size={13} />{user?.email}</span>
                  {user?.timezone && <span className="flex items-center gap-1.5 text-xs text-secondary"><Clock size={13} />{user?.timezone}</span>}
                  {user?.company && <span className="flex items-center gap-1.5 text-xs text-secondary"><Building2 size={13} />{user?.company}</span>}
                </div>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsEditing(true)}>Edit Profile</Button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Posts Published', value: '147' },
          { label: 'Connected Accounts', value: '5' },
          { label: 'Workspaces', value: '3' },
          { label: 'Days Active', value: '42' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <StatPill {...s} />
          </motion.div>
        ))}
      </div>

      {/* Social links */}
      <div className="bg-surface border border-subtle rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-primary mb-4">Social Links</h3>
        <div className="space-y-3">
          {[
            { icon: InstagramIcon, label: 'Instagram', placeholder: '@yourhandle', color: '#E1306C' },
            { icon: LinkedinIcon, label: 'LinkedIn', placeholder: 'linkedin.com/in/yourname', color: '#0A66C2' },
            { icon: XIcon, label: 'X (Twitter)', placeholder: '@yourhandle', color: '#0F1419' },
            { icon: Link2, label: 'Website', placeholder: 'https://yourwebsite.com', color: '#94A3B8' },
          ].map((social) => (
            <div key={social.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${social.color}1a` }}>
                <social.icon size={16} style={{ color: social.color }} />
              </div>
              <input placeholder={social.placeholder}
                className="flex-1 bg-surface-2 border border-subtle rounded-xl px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
            </div>
          ))}
        </div>
        <Button className="mt-4" size="sm" onClick={() => toast.success('Social links saved')}>Save Links</Button>
      </div>

      {/* Danger zone */}
      <div className="bg-surface border border-subtle rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-primary">Account Actions</h3>
        <div className="flex items-center justify-between p-4 rounded-xl bg-surface-2">
          <div>
            <p className="text-sm font-medium text-primary">Sign out</p>
            <p className="text-xs text-muted">Log out of your current session</p>
          </div>
          <Button variant="outline" size="sm" icon={LogOut} isLoading={isLoggingOut} onClick={handleLogout}>
            Sign out
          </Button>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/20 bg-red-500/5">
          <div>
            <p className="text-sm font-medium text-red-500">Delete account</p>
            <p className="text-xs text-muted">Permanently delete your account and all data</p>
          </div>
          <Button variant="danger" size="sm" onClick={() => toast.error('Please contact support to delete your account')}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
