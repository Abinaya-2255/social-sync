import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Compass, AlertTriangle, WifiOff, Lock,
  Search, ArrowLeft, Home, RefreshCw
} from 'lucide-react'
import Button from '../../components/ui/Button.jsx'

const CONFIG = {
  '404': {
    code: '404',
    title: 'Lost in orbit',
    desc: 'The coordinate you followed does not exist, or this page has been moved to another quadrant.',
    icon: Compass,
    ctaText: 'Back to safety',
    ctaLink: '/'
  },
  '500': {
    code: '500',
    title: 'System disruption',
    desc: 'Our central server encountered an unexpected signature block anomaly. We are debugging it now.',
    icon: AlertTriangle,
    ctaText: 'Retry operation',
    action: () => window.location.reload()
  },
  'network': {
    code: 'OFFLINE',
    title: 'Connection severed',
    desc: 'Unable to establish a secure handshake with Social Sync services. Check your connection.',
    icon: WifiOff,
    ctaText: 'Reconnect',
    action: () => window.location.reload()
  },
  'permission': {
    code: '403',
    title: 'Access restricted',
    desc: 'Your security clearance key is insufficient to access this workspace. Contact your administrator.',
    icon: Lock,
    ctaText: 'Switch Workspaces',
    ctaLink: '/app'
  },
  'search': {
    code: 'EMPTY',
    title: 'No matches found',
    desc: 'We audited our repository database but found no assets matching your criteria.',
    icon: Search,
    ctaText: 'Clear search filters',
    ctaLink: '/app/search'
  }
}

export default function ErrorPage({ type = '404' }) {
  const navigate = useNavigate()
  const cfg = CONFIG[type] || CONFIG['404']
  const Icon = cfg.icon

  return (
    <div className="min-h-screen flex items-center justify-center bg-base px-4 py-12 relative overflow-hidden text-left">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full bg-surface border border-subtle rounded-3xl p-8 sm:p-10 shadow-token-lg text-center space-y-6 relative z-10"
      >
        {/* Error Code Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-subtle text-xs font-semibold text-accent uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {cfg.code} Error
        </div>

        {/* Floating animated icon container */}
        <div className="flex items-center justify-center">
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-2xl border border-accent/20 bg-accent/10 flex items-center justify-center text-accent"
          >
            <Icon size={30} className="animate-pulse" />
          </motion.div>
        </div>

        {/* Typography */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">{cfg.title}</h1>
          <p className="text-sm text-secondary leading-relaxed">{cfg.desc}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {cfg.ctaLink ? (
            <Link to={cfg.ctaLink}>
              <Button icon={Home}>{cfg.ctaText}</Button>
            </Link>
          ) : (
            <Button icon={RefreshCw} onClick={cfg.action}>{cfg.ctaText}</Button>
          )}
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate(-1)}>
            Go back
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
