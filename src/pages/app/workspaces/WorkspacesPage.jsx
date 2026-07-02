import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Plus, Users, Globe, CheckCircle2, ArrowRight, Settings, Link2, CalendarDays } from 'lucide-react'
import { useWorkspace } from '../../../context/WorkspaceContext.jsx'
import { workspaceService } from '../../../services/modules/workspaceService.js'
import { useToast } from '../../../context/ToastContext.jsx'
import Button from '../../../components/ui/Button.jsx'
import Modal from '../../../components/ui/Modal.jsx'
import EmptyState from '../../../components/ui/EmptyState.jsx'

function WorkspaceCard({ workspace, onSwitch, isActive }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className={`bg-surface border rounded-2xl p-5 space-y-4 transition-all duration-200 hover:shadow-token-md ${isActive ? 'border-accent shadow-token-sm' : 'border-subtle'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center border border-[#00D16C]/20 shrink-0"
            style={{ background: 'linear-gradient(135deg, rgba(0, 209, 108, 0.15) 0%, rgba(16, 185, 129, 0.10) 100%)', color: '#00D16C' }}>
            <Building2 size={22} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary">{workspace.name}</h3>
            <span className="text-[11px] text-muted capitalize">{workspace.plan} Plan</span>
          </div>
        </div>
        {isActive && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-accent"
            style={{ background: 'var(--accent-glow)' }}>
            <CheckCircle2 size={10} /> Active
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Members', value: workspace.members, icon: Users },
          { label: 'Accounts', value: workspace.accounts, icon: Link2 },
          { label: 'Posts', value: workspace.posts || '0', icon: CalendarDays },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-3 rounded-xl bg-surface-2 border border-subtle/50 flex flex-col items-center justify-center">
            <stat.icon size={14} className="text-accent mb-1 opacity-80" />
            <p className="text-lg font-bold text-primary">{stat.value}</p>
            <p className="text-[10px] text-muted mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {!isActive && (
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onSwitch(workspace.id)}>
            Switch to this workspace
          </Button>
        )}
        <Button variant="ghost" size="sm" icon={Settings} className={isActive ? 'flex-1' : ''}>
          {isActive ? 'Manage' : ''}
        </Button>
      </div>
    </motion.div>
  )
}

function CreateWorkspaceModal({ open, onClose, onCreated }) {
  const [name, setName] = useState('')
  const [plan, setPlan] = useState('Creator')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const PLANS = ['Creator', 'Business', 'Agency']

  const handleCreate = async () => {
    if (!name.trim()) { toast.error('Enter a workspace name'); return }
    setIsLoading(true)
    try {
      const ws = await workspaceService.create({ name, plan })
      onCreated(ws)
      toast.success(`Workspace "${name}" created`)
      setName(''); setPlan('Creator')
      onClose()
    } catch { toast.error('Failed to create workspace') } finally { setIsLoading(false) }
  }

  return (
    <Modal open={open} onClose={onClose} title="Create Workspace"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreate} isLoading={isLoading} icon={Plus}>Create Workspace</Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-primary">Workspace name</label>
          <input value={name} onChange={(e) => setName(e.target.value)}
            placeholder="e.g. My Brand, Client Name..."
            className="w-full bg-surface-2 border border-subtle rounded-xl px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-primary">Plan</label>
          <div className="grid grid-cols-3 gap-2">
            {PLANS.map((p) => (
              <button key={p} onClick={() => setPlan(p)}
                className={`p-3 rounded-xl border text-xs font-medium transition-all ${plan === p ? 'border-accent text-accent bg-[var(--accent-glow)]' : 'border-subtle text-secondary hover:border-[var(--accent)]'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted p-3 rounded-xl bg-surface-2">
          Each workspace has its own content calendar, analytics, connected accounts, and team members — completely isolated from each other.
        </p>
      </div>
    </Modal>
  )
}

export default function WorkspacesPage() {
  const { workspaces, activeWorkspace, switchWorkspace, addWorkspace } = useWorkspace()
  const [createOpen, setCreateOpen] = useState(false)
  const toast = useToast()

  const handleSwitch = async (id) => {
    try {
      await switchWorkspace(id)
      toast.success('Workspace switched')
    } catch { toast.error('Failed to switch workspace') }
  }

  const handleCreated = (ws) => addWorkspace(ws)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Workspaces</h1>
          <p className="text-sm text-muted mt-0.5">Manage your brands, clients, and projects</p>
        </div>
        <Button icon={Plus} onClick={() => setCreateOpen(true)}>New Workspace</Button>
      </div>

      {/* Cinematic Production Summary Banner */}
      <div className="rounded-3xl overflow-hidden relative border border-subtle shadow-token-lg p-6 sm:p-8 flex items-center justify-between gap-6 flex-wrap group">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85"
            alt="Workspaces Architecture"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface)]/95 to-[var(--bg-surface)]/80 transition-colors duration-350" />
        </div>

        <div className="flex items-center gap-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl accent-gradient flex items-center justify-center shadow-lg shadow-accent/25 shrink-0">
            <Building2 size={26} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">Production Environment</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-primary tracking-tight mt-0.5 transition-colors duration-350">
              {workspaces.length} Multi-Tenant Workspace{workspaces.length !== 1 ? 's' : ''}
            </p>
            <p className="text-xs text-muted mt-1 transition-colors duration-350">
              Currently active: <span className="text-accent font-semibold">{activeWorkspace?.name}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10 bg-surface/80 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-subtle transition-colors duration-350">
          <div className="flex -space-x-2 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Lead" className="inline-block h-8 w-8 rounded-full ring-2 ring-surface object-cover" />
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Lead" className="inline-block h-8 w-8 rounded-full ring-2 ring-surface object-cover" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Lead" className="inline-block h-8 w-8 rounded-full ring-2 ring-surface object-cover" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-primary">12 Team Admins</p>
            <p className="text-[11px] text-emerald-500 font-medium">● All systems synced</p>
          </div>
        </div>
      </div>

      {/* Workspace cards */}
      {workspaces.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No workspaces found"
          description="Create your first workspace to organize brands, team members, and connected social accounts."
          actionLabel="New Workspace"
          actionIcon={Plus}
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {workspaces.map((ws) => (
            <WorkspaceCard
              key={ws.id}
              workspace={ws}
              isActive={ws.id === activeWorkspace?.id}
              onSwitch={handleSwitch}
            />
          ))}

          {/* Add workspace card */}
          <motion.button
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: workspaces.length * 0.05 }}
            onClick={() => setCreateOpen(true)}
            className="border-2 border-dashed border-subtle rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-center hover:border-accent hover:bg-[var(--accent-glow)] transition-all duration-200 min-h-[200px] group"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-2 group-hover:bg-[var(--accent-glow)] flex items-center justify-center transition-colors">
              <Plus size={22} className="text-muted group-hover:text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-secondary group-hover:text-primary">New Workspace</p>
              <p className="text-xs text-muted mt-0.5">Add a brand or client</p>
            </div>
          </motion.button>
        </div>
      )}

      <CreateWorkspaceModal open={createOpen} onClose={() => setCreateOpen(false)} onCreated={handleCreated} />
    </div>
  )
}
