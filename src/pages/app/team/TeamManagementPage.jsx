import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, UserPlus, MoreHorizontal,
  ShieldCheck, Eye, Edit3, Crown, Trash2, Clock
} from 'lucide-react'
import { teamService } from '../../../services/modules/teamService.js'
import { useToast } from '../../../context/ToastContext.jsx'
import { initials, timeAgo } from '../../../lib/formatters.js'
import { ROLES } from '../../../lib/constants.js'
import Button from '../../../components/ui/Button.jsx'
import Modal from '../../../components/ui/Modal.jsx'
import EmptyState from '../../../components/ui/EmptyState.jsx'
import Skeleton from '../../../components/ui/Skeleton.jsx'

const ROLE_ICONS = { Owner: Crown, Admin: ShieldCheck, Editor: Edit3, Viewer: Eye }
const ROLE_COLORS = { Owner: '#F59E0B', Admin: '#3B82F6', Editor: '#00D16C', Viewer: '#94A3B8' }

function RoleBadge({ role }) {
  const Icon = ROLE_ICONS[role] || Eye
  const color = ROLE_COLORS[role] || '#94A3B8'
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${color}1a`, color }}>
      <Icon size={11} />{role}
    </span>
  )
}

function Avatar({ name, src, online, size = 'md' }) {
  const dims = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm' }
  return (
    <div className="relative shrink-0">
      <div className={`${dims[size]} rounded-full accent-gradient flex items-center justify-center text-white font-bold overflow-hidden border border-subtle`}>
        {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials(name)}
      </div>
      {online !== undefined && (
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-surface ${online ? 'bg-emerald-500' : 'bg-slate-400'}`} />
      )}
    </div>
  )
}

function InviteModal({ open, onClose, onInvited }) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Editor')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async () => {
    if (!email.trim()) { toast.warning('Email Required', 'Please enter a valid email address.'); return }
    setIsLoading(true)
    try {
      const member = await teamService.invite({ email, role })
      onInvited(member)
      toast.success('Invitation Sent', `An invitation email has been delivered to ${email}.`)
      setEmail(''); setRole('Editor')
      onClose()
    } catch { toast.error('Invitation Failed', 'We could not deliver the invitation email at this time.') } finally { setIsLoading(false) }
  }

  return (
    <Modal open={open} onClose={onClose} title="Invite Team Member"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} isLoading={isLoading} icon={UserPlus}>Send Invite</Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-primary">Email address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="colleague@company.com"
            className="w-full bg-surface-2 border border-subtle rounded-xl px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-primary">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}
            className="w-full bg-surface-2 border border-subtle rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-[var(--accent)] appearance-none">
            {ROLES.filter((r) => r !== 'Owner').map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="p-3 rounded-xl bg-surface-2 text-xs text-muted">
          <p className="font-medium text-secondary mb-1">Role permissions</p>
          <p><strong className="text-primary">Admin</strong> — all features except billing</p>
          <p><strong className="text-primary">Editor</strong> — create, schedule, and publish content</p>
          <p><strong className="text-primary">Viewer</strong> — read-only access to calendar and analytics</p>
        </div>
      </div>
    </Modal>
  )
}

export default function TeamManagementPage() {
  const [members, setMembers] = useState([])
  const [activity, setActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(null)
  const toast = useToast()

  useEffect(() => {
    Promise.all([teamService.listMembers(), teamService.listActivity()]).then(([m, a]) => {
      setMembers(m); setActivity(a); setIsLoading(false)
    })
  }, [])

  const handleRoleChange = async (id, role) => {
    try {
      await teamService.updateRole(id, role)
      setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)))
      toast.success('Role Updated', 'The member permissions have been changed successfully.')
    } catch { toast.error('Update Failed', 'Could not update member role.') }
  }

  const handleRemove = async (id) => {
    try {
      await teamService.remove(id)
      setMembers((prev) => prev.filter((m) => m.id !== id))
      toast.success('Member Removed', 'Team member access has been revoked.')
      setOpenMenuId(null)
    } catch { toast.error('Removal Failed', 'Could not remove member from workspace.') }
  }

  const stats = [
    { label: 'Total Members', value: members.length },
    { label: 'Active', value: members.filter((m) => m.status === 'active').length },
    { label: 'Pending', value: members.filter((m) => m.status === 'pending').length },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Team</h1>
          <p className="text-sm text-muted mt-0.5">Manage members, roles, and collaboration</p>
        </div>
        <Button icon={UserPlus} onClick={() => setInviteOpen(true)}>Invite Member</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-surface border border-subtle rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">{isLoading ? '—' : s.value}</p>
            <p className="text-xs text-muted mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Member list */}
        <div className="lg:col-span-2 bg-surface border border-subtle rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-primary mb-4">Members</h3>
          {isLoading ? (
            <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} variant="teamMember" />)}</div>
          ) : members.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No team members yet"
              description="Invite colleagues and clients to collaborate on social scheduling and approvals."
              actionLabel="Invite Member"
              actionIcon={UserPlus}
              onAction={() => setInviteOpen(true)}
            />
          ) : (
            <div className="space-y-2">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl table-row-interactive group relative">
                  <Avatar name={member.name} src={member.avatar} online={member.online} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-primary truncate">{member.name}</p>
                      {member.status === 'pending' && (
                        <span className="text-[10px] text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded-full font-medium">Pending</span>
                      )}
                    </div>
                    <p className="text-xs text-muted truncate">{member.email}</p>
                  </div>
                  <RoleBadge role={member.role} />
                  {member.role !== 'Owner' && (
                    <div className="relative">
                      <button onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                        className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal size={16} />
                      </button>
                      {openMenuId === member.id && (
                        <div className="absolute right-0 top-8 z-20 w-44 bg-surface border border-subtle rounded-xl shadow-token-lg py-1">
                          {ROLES.filter((r) => r !== 'Owner' && r !== member.role).map((r) => (
                            <button key={r} onClick={() => { handleRoleChange(member.id, r); setOpenMenuId(null) }}
                              className="w-full text-left px-3 py-2 text-xs text-secondary dropdown-item-interactive">
                              Change to {r}
                            </button>
                          ))}
                          <div className="border-t border-subtle my-1" />
                          <button onClick={() => handleRemove(member.id)}
                            className="w-full text-left px-3 py-2 text-xs text-red-500 dropdown-item-interactive flex items-center gap-2">
                            <Trash2 size={12} /> Remove member
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity feed */}
        <div className="bg-surface border border-subtle rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-primary mb-4">Activity</h3>
          {isLoading ? (
            <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} variant="activityItem" />)}</div>
          ) : activity.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No recent activity"
              description="Member actions, invites, and review updates will show up here."
            />
          ) : (
            <div className="space-y-4">
              {activity.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <Avatar name={item.user} src={item.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-primary leading-relaxed">
                      <span className="font-medium">{item.user}</span>{' '}
                      <span className="text-secondary">{item.action}</span>
                    </p>
                    <p className="text-[11px] text-muted mt-0.5 flex items-center gap-1">
                      <Clock size={10} />{timeAgo(item.time)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)}
        onInvited={(m) => setMembers((prev) => [...prev, m])} />
    </div>
  )
}
