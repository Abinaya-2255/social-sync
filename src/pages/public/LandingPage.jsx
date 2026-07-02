import {
  InstagramIcon, FacebookIcon, LinkedinIcon, XIcon,
  YoutubeIcon, TikTokIcon, PinterestIcon,
} from '../../lib/PlatformIcons.jsx'
import { motion } from 'framer-motion'
import {
  ArrowRight, Zap, BarChart3, Calendar, Sparkles, Users,
  CheckCircle2, Star, Globe
} from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import { Link } from 'react-router-dom'
import InfiniteTicker from '../../components/ui/InfiniteTicker.jsx'
import AnimatedCounter from '../../components/ui/AnimatedCounter.jsx'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
})

function HeroFloatingShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-20 max-w-5xl mx-auto px-4 sm:px-6 h-[460px] sm:h-[580px] w-full flex items-center justify-center"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[320px] bg-accent/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Layered Composition Container */}
      <div className="relative w-full h-full flex items-center justify-center">

        {/* DEVICE 1: LAPTOP MOCKUP (Back & Center) */}
        <div className="absolute w-[80%] md:w-[70%] aspect-[16/10] bg-[#1E2028] rounded-2xl border border-white/10 shadow-2xl p-2.5 transition-transform duration-500 hover:scale-[1.01] z-10">
          <div className="w-full h-full bg-[#0B0C10] rounded-xl border border-subtle/10 overflow-hidden flex flex-col relative">
            {/* Browser Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-subtle/10 bg-[#1A1C23] shrink-0">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] font-semibold text-muted px-2.5 py-0.5 rounded-full bg-carbon/50 border border-subtle/5">app.socialsync.studio</span>
              <div className="w-10 h-2 bg-[#262933] rounded-full" />
            </div>
            {/* Dashboard Content Mockup */}
            <div className="flex-1 p-3 grid grid-cols-3 gap-2.5 text-left overflow-hidden">
              <div className="col-span-2 bg-[#1A1C23] rounded-xl border border-subtle/10 p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-muted uppercase tracking-wider">Weekly Reach</span>
                    <p className="text-sm font-bold text-white mt-0.5">+48,290 <span className="text-[9px] text-emerald-500 font-semibold ml-1">↑ 12%</span></p>
                  </div>
                  <span className="text-[8px] bg-accent/15 text-accent px-1.5 py-0.5 rounded font-bold">LIVE</span>
                </div>
                {/* SVG mock sparkline */}
                <div className="h-16 w-full flex items-end gap-1 pt-2">
                  {[20, 40, 30, 50, 45, 70, 60, 90, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-accent/20 rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="bg-[#1A1C23] rounded-xl border border-subtle/10 p-2.5 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-subtle/10 pb-1.5">
                  <span className="text-[9px] font-bold text-white">Queue</span>
                  <span className="text-[8px] text-accent font-semibold">Active</span>
                </div>
                <div className="space-y-1.5">
                  <div className="p-1 rounded bg-[#20232C] border border-subtle/5 flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded bg-[#E1306C]/10 flex items-center justify-center text-[7px]" style={{ color: '#E1306C' }}>IG</div>
                    <span className="text-[8px] font-medium text-white truncate flex-1">Promo Drop</span>
                  </div>
                  <div className="p-1 rounded bg-[#20232C] border border-subtle/5 flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded bg-[#0A66C2]/10 flex items-center justify-center text-[7px]" style={{ color: '#0A66C2' }}>LN</div>
                    <span className="text-[8px] font-medium text-white truncate flex-1">Scaling remote</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DEVICE 2: TABLET MOCKUP (Overlapping Left) */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-0 sm:left-4 bottom-8 w-[40%] md:w-[35%] aspect-[3/4] bg-[#2E313D] rounded-xl border border-white/10 shadow-2xl p-2 z-20"
        >
          <div className="w-full h-full bg-[#0B0C10] rounded-lg overflow-hidden border border-subtle/10 flex flex-col relative text-left">
            <div className="h-4 bg-[#1A1C23] border-b border-subtle/10 flex items-center justify-center relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-black/60 absolute left-2" />
              <div className="w-6 h-1 bg-[#262933] rounded-full" />
            </div>
            <div className="flex-1 p-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold text-white">Content Library</span>
                <span className="text-[7px] text-muted">148 assets</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80',
                  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=150&q=80',
                  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=150&q=80',
                  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=150&q=80'
                ].map((url, i) => (
                  <div key={i} className="aspect-square rounded-md overflow-hidden border border-subtle/10 bg-[#1A1C23]">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* DEVICE 3: PHONE MOCKUP (Overlapping Right) */}
        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-0 sm:right-6 bottom-4 w-[24%] md:w-[20%] aspect-[9/19] bg-[#2E313D] rounded-2xl border border-white/10 shadow-2xl p-1.5 z-30"
        >
          <div className="w-full h-full bg-[#0B0C10] rounded-[14px] overflow-hidden border border-subtle/10 flex flex-col relative text-left">
            {/* Phone Notch */}
            <div className="h-4 bg-[#1A1C23] flex items-center justify-center shrink-0 relative">
              <div className="w-10 h-2 bg-black rounded-full mt-0.5" />
            </div>
            <div className="flex-1 p-2 space-y-2 text-[8px] flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="block font-bold text-white">Create Post</span>
                <div className="p-1 rounded bg-[#1A1C23] border border-subtle/5 text-muted leading-relaxed">
                  Generate caption...
                </div>
                <div className="h-12 rounded bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-[7px] font-bold">
                  ✦ AI Studio Ready
                </div>
              </div>
              <div className="w-full py-1 bg-accent text-white rounded text-center font-bold text-[7px] cursor-pointer">
                Queue Post
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Card: AI recommendation (Top Right Overlay) */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:flex absolute top-12 right-20 glass-panel rounded-2xl p-3 shadow-token-lg border border-accent/30 items-center gap-3 z-40 max-w-[220px] text-left"
        >
          <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
            <Sparkles size={14} className="text-accent" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-accent uppercase tracking-wider">AI Optimizer</p>
            <p className="text-[10px] text-primary font-medium leading-snug">Best window: Today 7:00 PM (+38% viral reach)</p>
          </div>
        </motion.div>

        {/* Floating Card: Follower Counter (Top Left Overlay) */}
        <motion.div
          animate={{ y: [6, -6, 6] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:flex absolute top-20 left-12 glass-panel rounded-2xl p-3 shadow-token-lg border border-subtle items-center gap-3 z-40 max-w-[180px] text-left"
        >
          <div className="w-7 h-7 rounded-lg bg-[#E1306C]/15 flex items-center justify-center shrink-0">
            <InstagramIcon size={14} style={{ color: '#E1306C' }} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-primary"><AnimatedCounter value={142850} /></span>
              <span className="text-[9px] font-semibold text-emerald-500">↑ 3.4%</span>
            </div>
            <p className="text-[9px] text-muted">Instagram Followers · Live</p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}

const FEATURES = [
  { icon: Calendar, title: 'Visual Content Calendar', desc: 'Plan months ahead with an intuitive drag-and-drop calendar. Switch between monthly, weekly, and daily views.' },
  { icon: Sparkles, title: 'AI Caption & Hashtag Generator', desc: 'Generate on-brand captions and targeted hashtags with a single click. Trained on what works.' },
  { icon: BarChart3, title: 'Deep Analytics', desc: 'Track engagement, reach, impressions, and follower growth across every platform from one unified dashboard.' },
  { icon: Zap, title: 'Publish Everywhere at Once', desc: 'Schedule one post to Instagram, LinkedIn, TikTok, and 4 more platforms simultaneously.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Invite editors, assign roles, leave comments, and manage multiple client workspaces seamlessly.' },
  { icon: Globe, title: 'Multi-Workspace Support', desc: 'Manage unlimited brands or clients from a single account. Context-switch in one click.' },
]

const PLATFORMS = [
  { icon: InstagramIcon, name: 'Instagram', color: '#E1306C' },
  { icon: FacebookIcon, name: 'Facebook', color: '#1877F2' },
  { icon: LinkedinIcon, name: 'LinkedIn', color: '#0A66C2' },
  { icon: XIcon, name: 'X (Twitter)', color: '#0F1419' },
  { icon: YoutubeIcon, name: 'YouTube', color: '#FF0000' },
  { icon: TikTokIcon, name: 'TikTok', color: '#00D16C' },
  { icon: PinterestIcon, name: 'Pinterest', color: '#BD081C' },
]

const TESTIMONIALS = [
  { name: 'Alicia Moreno', role: 'Social Media Manager, Apex Creative', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', lifestyleImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85', text: 'Social Sync completely transformed how our agency handles content. We went from 3 tools to one, and saved 12 hours a week.', rating: 5 },
  { name: 'James Park', role: 'Founder, Brew & Bloom', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', lifestyleImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85', text: "The AI caption generator alone is worth every penny. It sounds like us, not a robot. Our engagement went up 40% in the first month.", rating: 5 },
  { name: 'Priya Nair', role: 'Content Creator, 180K followers', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', lifestyleImg: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1200&q=85', text: 'I finally feel in control of my content strategy. The calendar view makes it so easy to see gaps and stay consistent.', rating: 5 },
]

const PRICING = [
  {
    name: 'Creator',
    price: 19,
    desc: 'Perfect for individual creators and freelancers.',
    features: ['7 social accounts', '60 scheduled posts/mo', 'AI caption generator', 'Basic analytics', '1 workspace'],
    cta: 'Start free trial',
    highlight: false,
  },
  {
    name: 'Business',
    price: 49,
    desc: 'For growing businesses and small teams.',
    features: ['25 social accounts', 'Unlimited scheduling', 'Full AI Studio', 'Advanced analytics', '3 workspaces', 'Team (3 members)'],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Agency',
    price: 99,
    desc: 'For agencies managing multiple clients.',
    features: ['Unlimited accounts', 'Unlimited scheduling', 'Full AI Studio', 'White-label reports', 'Unlimited workspaces', 'Team (15 members)', 'Priority support'],
    cta: 'Contact sales',
    highlight: false,
  },
]

const FAQS = [
  { q: 'How many platforms does Social Sync support?', a: 'Social Sync supports Instagram, Facebook, LinkedIn, X (Twitter), Pinterest, TikTok, and YouTube. New platforms are added regularly.' },
  { q: 'Can I manage multiple clients or brands?', a: 'Yes. Every plan includes multi-workspace support so you can keep each client or brand completely separate with its own content and analytics.' },
  { q: 'Is there a free trial?', a: 'Absolutely. Every plan comes with a 14-day free trial, no credit card required.' },
  { q: 'How does the AI assistant work?', a: 'Our AI Studio uses large language models to generate captions, hashtags, content ideas, and weekly plans tailored to your brand voice and platform guidelines.' },
]

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-24 lg:py-32">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #00D16C, transparent)' }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-subtle text-xs font-medium text-muted mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            AI-powered social media management
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-5xl lg:text-7xl font-bold text-primary leading-tight mb-6">
            Plan once.{' '}
            <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Publish everywhere.
            </span>
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="text-lg lg:text-xl text-secondary max-w-2xl mx-auto mb-10">
            The all-in-one social media operating system for creators, agencies, and businesses. Schedule, create, analyze, and grow — from a single intelligent workspace.
          </motion.p>
          <motion.div {...fadeUp(0.2)} className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/auth/signup">
              <Button size="lg" iconRight={ArrowRight}>Start for free</Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline">See all features</Button>
            </Link>
          </motion.div>
          <motion.p {...fadeUp(0.25)} className="text-xs text-muted mt-4">14-day free trial · No credit card required</motion.p>

          <HeroFloatingShowcase />

          {/* Platform row */}
          <motion.div {...fadeUp(0.3)} className="mt-16 flex items-center justify-center gap-4 flex-wrap">
            {PLATFORMS.map((p) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.name}
                  whileHover={{ y: -3, scale: 1.04 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2.5 bg-surface border border-subtle hover:border-subtle/80 rounded-2xl px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary shadow-token-sm hover:shadow-token-md transition-all cursor-default group"
                >
                  <Icon size={16} className="text-secondary group-hover:text-primary transition-colors duration-200 shrink-0" />
                  <span className="text-xs font-semibold">{p.name}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y border-subtle bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-medium text-muted uppercase tracking-widest mb-8">Trusted by <AnimatedCounter value={12000} suffix="+" /> creators and innovative teams</p>
          <InfiniteTicker
            items={['Apex Creative', 'Bloom Agency', 'Studio North', 'NovaBrand', 'Sprout Co.', 'Kite Digital', 'Veloce Labs', 'Arc Media', 'Hyperion Studios', 'Monolith App']}
            speed="32s"
            renderItem={(name) => (
              <span className="text-sm font-semibold tracking-wide text-muted/60 hover:text-primary transition-colors cursor-default">{name}</span>
            )}
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">Everything you need</p>
            <h2 className="text-4xl font-bold text-primary mb-4">Your complete social operating system</h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">From creating content to analyzing results, Social Sync handles every step of your social media workflow.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.05)} className="p-6 rounded-2xl bg-surface border border-subtle hover:shadow-token-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--accent-glow)' }}>
                  <f.icon size={20} className="text-accent" />
                </div>
                <h3 className="font-semibold text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-surface border-y border-subtle">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">Simple workflow</p>
            <h2 className="text-4xl font-bold text-primary mb-4">From idea to published in minutes</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Create', desc: 'Write or generate captions with AI, upload media, and select platforms.' },
              { step: '02', title: 'Schedule', desc: 'Pick the best time or let AI recommend optimal posting windows.' },
              { step: '03', title: 'Publish', desc: 'Posts go live automatically across all selected platforms simultaneously.' },
              { step: '04', title: 'Analyze', desc: 'Track performance and get AI-powered recommendations to improve.' },
            ].map((item, i) => (
              <motion.div key={item.step} {...fadeUp(i * 0.07)} className="text-center">
                <div className="w-12 h-12 rounded-2xl accent-gradient flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm">{item.step}</span>
                </div>
                <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features callout */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl p-8 lg:p-14 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,209,108,0.08) 0%, rgba(16,185,129,0.04) 100%)', border: '1px solid rgba(0,209,108,0.2)' }}>
            <div className="max-w-xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ background: 'rgba(0,209,108,0.15)', color: '#00D16C' }}>
                <Sparkles size={12} />
                Powered by AI
              </div>
              <h2 className="text-4xl font-bold text-primary mb-4">Your AI content team, always on standby</h2>
              <p className="text-secondary mb-8">Generate platform-perfect captions, trending hashtags, weekly content plans, and audience insights — all from the AI Studio.</p>
              <ul className="space-y-3 mb-8">
                {['Caption Generator', 'Hashtag Optimizer', 'Tone Rewriter', 'Weekly Content Planner', 'Audience Insights'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-primary">
                    <CheckCircle2 size={16} className="text-accent shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <Link to="/auth/signup"><Button iconRight={ArrowRight}>Try AI Studio free</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Magazine Testimonials */}
      <section className="py-28 px-4 bg-surface border-y border-subtle overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-20">
            <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">Editorial Spotlight</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4 tracking-tight">Loved by industry leaders</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp(i * 0.08)}
                className="p-8 sm:p-10 rounded-3xl bg-surface/95 backdrop-blur-2xl border border-subtle shadow-token-lg flex flex-col justify-between space-y-6 hover:border-subtle/80 transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg text-primary leading-relaxed font-light italic">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-subtle">
                  {t.avatar && (
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-subtle shrink-0" />
                  )}
                  <div>
                    <p className="font-bold text-primary text-base">{t.name}</p>
                    <p className="text-xs font-semibold text-accent">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-4xl font-bold text-primary mb-4">Simple, transparent pricing</h2>
            <p className="text-secondary">Start free for 14 days. No credit card required.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((plan, i) => (
              <motion.div key={plan.name} {...fadeUp(i * 0.07)}
                className={`p-6 rounded-2xl border flex flex-col transition-all duration-300 relative overflow-hidden ${plan.highlight ? 'border-accent shadow-token-lg scale-[1.02]' : 'border-subtle bg-surface hover:border-subtle/80'}`}
                style={plan.highlight ? { background: 'linear-gradient(135deg, rgba(0,209,108,0.08) 0%, var(--bg-surface) 60%)', boxShadow: '0 0 36px rgba(0, 209, 108, 0.15)' } : {}}
              >
                {plan.highlight && (
                  <div className="text-xs font-semibold text-accent mb-3 uppercase tracking-widest">Most Popular</div>
                )}
                <h3 className="text-lg font-bold text-primary">{plan.name}</h3>
                <p className="text-xs text-muted mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">${plan.price}</span>
                  <span className="text-sm text-muted">/month</span>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-secondary">
                      <CheckCircle2 size={14} className="text-accent shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link to="/auth/signup">
                  <Button variant={plan.highlight ? 'primary' : 'outline'} className="w-full">{plan.cta}</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-surface border-t border-subtle">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Frequently asked questions</h2>
          </motion.div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)} className="p-5 rounded-2xl border border-subtle bg-base">
                <p className="font-semibold text-primary mb-2">{faq.q}</p>
                <p className="text-sm text-secondary">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic Closing CTA Section */}
      <section className="py-20 px-4 mb-16">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative border border-subtle shadow-token-lg py-24 px-6 sm:px-16 text-center group">
          {/* Background Cinematic Visual */}
          <div className="absolute inset-0 -z-10">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=85"
              alt="Creative team workspace"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/85 to-[#0B0C10]/75" />
            <div className="absolute inset-0 bg-[radial-gradient(#00D16C_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
          </div>

          {/* Floating CTA Card */}
          <motion.div {...fadeUp()} className="max-w-3xl mx-auto p-8 sm:p-14 rounded-3xl bg-surface/85 backdrop-blur-2xl border border-white/10 shadow-2xl relative z-10">
            <div className="w-14 h-14 rounded-2xl accent-gradient flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/25">
              <Zap size={26} className="text-white" />
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4">
              Ready to orchestrate your social growth?
            </h2>
            <p className="text-white/80 text-lg sm:text-xl font-light mb-8 max-w-xl mx-auto leading-relaxed">
              Join over 12,000 creative teams publishing faster, smarter, and everywhere with Social Sync.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/auth/signup"><Button size="lg" iconRight={ArrowRight} className="shadow-lg shadow-accent/20">Start 14-Day Free Trial</Button></Link>
              <Link to="/pricing"><Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">Compare Plans</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
