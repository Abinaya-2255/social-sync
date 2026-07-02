import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Calendar, Sparkles, BarChart3, Zap, Users, ArrowRight
} from 'lucide-react'
import Button from '../../components/ui/Button.jsx'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
})

const ALL_FEATURES = [
  {
    category: 'Content Creation',
    tagline: 'Multi-platform publishing reimagined',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=85',
    icon: Zap,
    color: '#00D16C',
    items: [
      { title: 'Multi-Platform Composer', desc: "Write once and adapt content automatically for every platform's character limits and format." },
      { title: 'AI Caption Generator', desc: 'Generate engaging, on-brand captions powered by GPT — instantly.' },
      { title: 'Hashtag Optimizer', desc: 'Get data-driven hashtag recommendations tailored to your niche and audience.' },
      { title: 'Emoji Picker', desc: 'Quick-access emoji picker built directly into the composer.' },
      { title: 'Media Library', desc: 'Organize all your images and videos in folders for fast access during scheduling.' },
    ],
  },
  {
    category: 'Scheduling & Calendar',
    tagline: 'Visual timeline orchestration',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=85',
    icon: Calendar,
    color: '#3B82F6',
    items: [
      { title: 'Drag & Drop Calendar', desc: 'Move scheduled posts between days effortlessly with a visual monthly, weekly, or daily calendar.' },
      { title: 'Best Time Recommendations', desc: 'AI identifies your optimal posting windows based on audience engagement patterns.' },
      { title: 'Queue Management', desc: 'Set up a posting queue and Social Sync auto-fills your ideal time slots.' },
      { title: 'Publish Now or Schedule Later', desc: 'Flexibility to post immediately or set an exact future date and time.' },
    ],
  },
  {
    category: 'AI Studio',
    tagline: 'Your autonomous creative co-pilot',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
    icon: Sparkles,
    color: '#8B5CF6',
    items: [
      { title: 'Tone Optimizer', desc: 'Adjust your caption\'s tone — professional, casual, witty, inspirational — in one click.' },
      { title: 'Caption Rewriter', desc: 'Instantly get fresh variations of any caption you\'ve already written.' },
      { title: 'Content Ideas Engine', desc: 'Never run out of ideas. Get weekly content theme suggestions based on your niche.' },
      { title: 'Weekly Planner', desc: 'Let AI plan your entire week of content with balanced formats across platforms.' },
      { title: 'Audience Insights', desc: 'Discover untapped audience segments to target for faster growth.' },
    ],
  },
  {
    category: 'Analytics & Reporting',
    tagline: 'Actionable intelligence at a glance',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85',
    icon: BarChart3,
    color: '#F59E0B',
    items: [
      { title: 'Cross-Platform Dashboard', desc: 'See all your metrics in one place: engagement, reach, impressions, and follower growth.' },
      { title: 'Platform Comparison', desc: 'Identify which platforms drive the most value for your brand.' },
      { title: 'Best Posting Times Heatmap', desc: 'Visual heatmap showing exactly when your audience is most active.' },
      { title: 'Weekly & Monthly Reports', desc: 'Export beautiful reports to share with clients or stakeholders.' },
    ],
  },
  {
    category: 'Team Workspaces',
    tagline: 'Built for enterprise collaboration',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=85',
    icon: Users,
    color: '#EC4899',
    items: [
      { title: 'Role-Based Access', desc: 'Assign Owner, Admin, Editor, or Viewer roles with granular permissions.' },
      { title: 'Comments & Approvals', desc: 'Leave feedback on posts before they go live. Keep revision history clean.' },
      { title: 'Activity Feed', desc: 'Real-time log of every action taken by every team member.' },
      { title: 'Multi-Client Workspaces', desc: 'Each client or brand lives in its own isolated workspace with separate analytics.' },
    ],
  },
]

export default function FeaturesPage() {
  return (
    <div className="py-20 lg:py-28 overflow-hidden">
      
      {/* Editorial Hero */}
      <div className="max-w-5xl mx-auto px-4 text-center mb-24">
        <motion.div {...fadeUp()}>
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-4">Architecture of Power</p>
          <h1 className="text-5xl sm:text-7xl font-bold text-primary tracking-tight leading-tight mb-6">
            Everything you need. <br />
            <span className="text-transparent bg-clip-text accent-gradient">Nothing you don’t.</span>
          </h1>
          <p className="text-secondary text-lg sm:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Every feature is purpose-built to eliminate context switching, automate repetitive scheduling tasks, and elevate editorial standards across your entire organization.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/auth/signup"><Button size="lg" iconRight={ArrowRight}>Start 14-day free trial</Button></Link>
            <Link to="/pricing"><Button size="lg" variant="outline">Explore pricing</Button></Link>
          </div>
        </motion.div>
      </div>

      {/* Feature Showcase Sections with Overlapping Imagery & Cards */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-32 lg:space-y-40 mb-28">
        {ALL_FEATURES.map((section, si) => (
          <div key={section.category} className="space-y-8">
            
            {/* Category Title Bar */}
            <motion.div {...fadeUp()} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-subtle pb-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${section.color}1a` }}>
                    <section.icon size={16} style={{ color: section.color }} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: section.color }}>
                    {section.category}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">{section.tagline}</h2>
              </div>
            </motion.div>

            {/* Large Luxury Visual Banner */}
            <motion.div
              {...fadeUp(0.1)}
              className="w-full h-[360px] sm:h-[480px] rounded-3xl overflow-hidden border border-subtle shadow-token-lg relative group"
            >
              <img
                src={section.image}
                alt={section.category}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/40 to-transparent transition-colors duration-350" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <span className="text-xs font-mono text-muted uppercase tracking-widest hidden sm:inline transition-colors duration-350">
                  System Module // {si + 1}.0
                </span>
              </div>
            </motion.div>

            {/* Overlapping Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10 -mt-16 sm:-mt-24 px-2 sm:px-6">
              {section.items.map((item, ii) => (
                <motion.div
                  key={item.title}
                  {...fadeUp(ii * 0.06)}
                  className="p-6 rounded-2xl bg-surface/90 backdrop-blur-xl border border-subtle shadow-token-lg hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-bold text-primary text-base mb-2.5 flex items-center justify-between">
                      {item.title}
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: section.color }} />
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
