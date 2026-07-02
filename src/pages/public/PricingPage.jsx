import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react'
import Button from '../../components/ui/Button.jsx'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
})

const PLANS = [
  {
    name: 'Creator', price: 19, desc: 'Perfect for individual creators and freelancers.', highlight: false,
    features: ['7 social accounts', '60 scheduled posts/month', 'AI Caption Generator', 'Hashtag Generator', 'Basic analytics (30 days)', '1 workspace', 'Email support'],
  },
  {
    name: 'Business', price: 49, desc: 'For growing businesses and small teams.', highlight: true,
    features: ['25 social accounts', 'Unlimited scheduled posts', 'Full AI Studio access', 'Advanced analytics (12 months)', '3 workspaces', 'Team (up to 3 members)', 'Content Library', 'Priority email support'],
  },
  {
    name: 'Agency', price: 99, desc: 'For agencies managing multiple clients at scale.', highlight: false,
    features: ['Unlimited social accounts', 'Unlimited scheduled posts', 'Full AI Studio access', 'Advanced analytics + reports', 'Unlimited workspaces', 'Team (up to 15 members)', 'White-label PDF reports', 'Dedicated account manager'],
  },
]

export default function PricingPage() {
  return (
    <div className="pb-24 lg:pb-32 overflow-hidden">
      
      {/* Luxury Editorial Hero Banner with Dark Gradient Overlay */}
      <div className="relative w-full h-[460px] sm:h-[540px] flex items-center justify-center text-center px-4 overflow-hidden border-b border-subtle">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=85"
            alt="Minimal setup showing analytics dashboard"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)]/80 via-[var(--bg-base)]/90 to-[var(--bg-base)] transition-colors duration-350" />
          <div className="absolute inset-0 bg-[radial-gradient(#00D16C_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
        </div>

        <motion.div {...fadeUp()} className="max-w-3xl mx-auto relative z-10 pb-16 sm:pb-20">
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <ShieldCheck size={14} /> Transparent Investment
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-primary tracking-tight leading-tight mb-4 transition-colors duration-350">
            Simple, honest pricing.
          </h1>
          <p className="text-secondary text-lg sm:text-xl font-light max-w-xl mx-auto transition-colors duration-350">
            Every plan includes a full 14-day trial. Zero setup fees, cancel anytime with a single click.
          </p>
        </motion.div>
      </div>

      {/* Overlapping Pricing Cards Section */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 relative z-20 -mt-24 sm:-mt-36 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              {...fadeUp(i * 0.08)}
              className={`p-8 rounded-3xl border flex flex-col transition-all duration-300 relative ${
                plan.highlight
                  ? 'border-accent bg-surface shadow-2xl shadow-accent/15 scale-[1.02]'
                  : 'border-subtle bg-surface/95 backdrop-blur-xl hover:border-subtle/80 shadow-token-lg'
              }`}
              style={plan.highlight ? { background: 'linear-gradient(150deg, rgba(0,209,108,0.08) 0%, var(--bg-surface) 60%)' } : {}}
            >
              {plan.highlight && (
                <div className="inline-block self-start px-3 py-1 rounded-full text-[11px] font-bold text-accent bg-accent/15 uppercase tracking-widest mb-4">
                  Most Popular
                </div>
              )}
              <h2 className="text-2xl font-bold text-primary tracking-tight">{plan.name}</h2>
              <p className="text-xs text-secondary mt-1 mb-6 font-light">{plan.desc}</p>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-primary tracking-tight">${plan.price}</span>
                <span className="text-sm text-muted font-medium">/month</span>
              </div>

              <ul className="space-y-3.5 flex-1 mb-8 border-t border-subtle pt-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-secondary font-light">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link to="/auth/signup" className="w-full">
                <Button
                  variant={plan.highlight ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full shadow-md"
                  iconRight={ArrowRight}
                >
                  Start 14-day free trial
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enterprise Callout Banner */}
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          {...fadeUp(0.2)}
          className="p-8 sm:p-12 rounded-3xl bg-surface border border-subtle flex flex-col sm:flex-row items-center justify-between gap-6 shadow-token-md"
        >
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">Need enterprise-grade custom infrastructure?</h3>
            <p className="text-secondary text-sm sm:text-base font-light max-w-xl">
              We offer bespoke contracts, dedicated single-tenant AWS regions, SOC2 Type II compliance reports, and custom SSO integration for organizations managing 50+ workspaces.
            </p>
          </div>
          <Link to="/contact" className="shrink-0 w-full sm:w-auto">
            <Button variant="outline" size="lg" iconRight={ArrowRight} className="w-full sm:w-auto">
              Contact Sales Engineering
            </Button>
          </Link>
        </motion.div>
      </div>

    </div>
  )
}
