import { motion } from 'framer-motion'
import {
  ArrowUpRight, ArrowDownRight, Heart, Eye, BarChart3, TrendingUp, Users,
  CalendarDays, Send, FileText, Sparkles, Link2, Megaphone, Bell, LineChart,
  FolderOpen, Bot, Briefcase
} from 'lucide-react'
import Card from './Card.jsx'
import AnimatedCounter from './AnimatedCounter.jsx'

const ICON_MAP = {
  Heart, Eye, BarChart3, TrendingUp, Users, CalendarDays, Send, FileText,
  Sparkles, Link2, Megaphone, Bell, LineChart, FolderOpen, Bot, Briefcase
}

export default function StatCard({ icon: IconProp, label, value, delta, onClick, index = 0 }) {
  const isPositive = delta >= 0
  const IconComponent = typeof IconProp === 'string' ? (ICON_MAP[IconProp] || BarChart3) : IconProp

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
    >
      <Card
        hover
        onClick={onClick}
        className={`group ${onClick ? 'cursor-pointer' : ''}`}
        as={onClick ? 'button' : 'div'}
      >
        <div className="flex items-start justify-between">
          {/* 44px rounded container with subtle green gradient (10-15% opacity) */}
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center border border-[#00D16C]/20 transition-all duration-300 group-hover:border-[#00D16C]/40 group-hover:scale-105 group-hover:brightness-125 shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 209, 108, 0.15) 0%, rgba(16, 185, 129, 0.10) 100%)',
              color: '#00D16C',
            }}
          >
            {IconComponent && <IconComponent size={22} className="transition-transform duration-300 group-hover:scale-110" />}
          </div>

          {delta !== undefined && (
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}
            >
              {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {Math.abs(delta).toFixed(1)}%
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-primary mt-4 text-left">
          {value ? <AnimatedCounter value={value} /> : '0'}
        </p>
        <p className="text-xs text-muted mt-1 text-left">{label}</p>
      </Card>
    </motion.div>
  )
}
