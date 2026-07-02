import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  { q: 'How many platforms does Social Sync support?', a: 'Social Sync currently supports Instagram, Facebook, LinkedIn, X (Twitter), Pinterest, TikTok, and YouTube. We regularly add new platforms — request yours via the contact page.' },
  { q: 'Is there a free trial?', a: 'Yes! Every plan includes a 14-day free trial with no credit card required. You get full access to all features during the trial period.' },
  { q: 'Can I manage multiple brands or clients?', a: 'Absolutely. Every plan supports multiple workspaces. Each workspace is completely isolated with its own content calendar, analytics, connected accounts, and team members.' },
  { q: 'What happens after my free trial?', a: 'After your 14-day trial, you can choose any paid plan. If you don\'t subscribe, your account will be paused — your data is kept safe for 30 days so you can reactivate anytime.' },
  { q: 'How does the AI content assistant work?', a: 'AI Studio uses large language models (LLMs) to generate captions, hashtags, content ideas, tone variations, and weekly plans. It learns from successful content patterns and adapts to your brand voice over time.' },
  { q: 'Can I publish directly to social platforms?', a: 'Yes. Once you connect your social accounts via OAuth, Social Sync publishes directly — no manual copy-pasting. You\'ll receive real-time status notifications for every post.' },
  { q: 'How is billing handled?', a: 'All plans are billed monthly or annually (save 20% annually). You can upgrade, downgrade, or cancel from your account settings at any time.' },
  { q: 'Is my data secure?', a: 'Yes. We use industry-standard encryption (TLS 1.3 in transit, AES-256 at rest), OAuth 2.0 for all platform connections, and we never store your social media credentials directly.' },
  { q: 'What team roles are available?', a: 'Social Sync offers four roles: Owner (full access), Admin (all features except billing), Editor (create and schedule content), and Viewer (read-only access to analytics and calendar).' },
  { q: 'Do you offer a discount for non-profits or students?', a: 'Yes. Contact our team at hello@socialsync.app with verification and we\'ll apply a 50% discount to any plan.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-subtle rounded-2xl overflow-hidden bg-surface">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
        <span className="font-semibold text-primary text-sm">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-muted shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <p className="px-5 pb-5 text-sm text-secondary leading-relaxed border-t border-subtle pt-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="text-center mb-14">
        <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">FAQ</p>
        <h1 className="text-5xl font-bold text-primary mb-4">Frequently asked questions</h1>
        <p className="text-secondary">Can't find what you're looking for? <a href="/contact" className="text-accent hover:underline">Contact our team</a>.</p>
      </div>
      <div className="space-y-3">
        {FAQS.map((faq) => <FAQItem key={faq.q} {...faq} />)}
      </div>
    </div>
  )
}
