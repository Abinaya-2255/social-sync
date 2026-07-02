import { motion } from 'framer-motion'
import AnimatedCounter from '../../components/ui/AnimatedCounter.jsx'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
})

const TEAM = [
  { name: 'Maya Thornton', role: 'Co-founder & CEO', bio: 'Former head of product at a leading social media analytics company.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
  { name: 'Carlos Rivera', role: 'Co-founder & CTO', bio: 'Built scalable infrastructure for platforms with 50M+ users.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { name: 'Aisha Okafor', role: 'Head of Design', bio: 'Previously led UX at a top-10 SaaS productivity company.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { name: 'Sam Wu', role: 'Head of AI', bio: 'ML researcher with experience in NLP for content generation at scale.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
]

export default function AboutPage() {
  return (
    <div className="py-16 lg:py-24 overflow-hidden">
      
      {/* Editorial Hero Header */}
      <div className="max-w-5xl mx-auto px-4 text-center mb-20 lg:mb-28">
        <motion.div {...fadeUp()}>
          <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-4">Our Story</p>
          <h1 className="text-5xl lg:text-7xl font-bold text-primary tracking-tight leading-tight mb-6">
            We built the operating system <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text accent-gradient">we always needed.</span>
          </h1>
          <p className="text-secondary text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto font-light">
            Social Sync was born from frustration. Our founders spent years managing social media across 5 different tools, losing hours every week to copy-pasting, context-switching, and chasing performance data across siloed dashboards.
          </p>
        </motion.div>
      </div>

      {/* Alternating Editorial Sections */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-28 lg:space-y-36 mb-32">
        
        {/* Mission Section (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div {...fadeUp()} className="lg:col-span-7 rounded-3xl overflow-hidden border border-subtle shadow-token-lg relative group aspect-[16/10]">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85"
              alt="Team collaborative strategy session"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/60 via-transparent to-transparent transition-colors duration-350" />
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="lg:col-span-5 space-y-5">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">01 · Our Mission</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              Effortless social orchestration for modern teams.
            </h2>
            <p className="text-secondary text-base lg:text-lg leading-relaxed font-light">
              To give every creator, agency, and enterprise a single intelligent workspace that makes cross-platform publishing feel instantaneous—allowing high-growth teams to spend less time managing software and more time crafting narratives that move the needle.
            </p>
          </motion.div>
        </div>

        {/* Vision Section (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div {...fadeUp(0.1)} className="lg:col-span-5 space-y-5 order-2 lg:order-1">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">02 · Our Vision</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              A workspace where AI amplifies human creativity.
            </h2>
            <p className="text-secondary text-base lg:text-lg leading-relaxed font-light">
              We envision a future where software anticipates your workflow. From contextual tone optimization to best-time predictive publishing, every surface in Social Sync is built with deep AI automation designed to eliminate busywork without sacrificing editorial voice.
            </p>
          </motion.div>
          <motion.div {...fadeUp()} className="lg:col-span-7 rounded-3xl overflow-hidden border border-subtle shadow-token-lg relative group aspect-[16/10] order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85"
              alt="Minimal architectural luxury office space"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/60 via-transparent to-transparent transition-colors duration-350" />
          </motion.div>
        </div>

        {/* Culture Section (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div {...fadeUp()} className="lg:col-span-7 rounded-3xl overflow-hidden border border-subtle shadow-token-lg relative group aspect-[16/10]">
            <img
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=85"
              alt="Creative team design sprint"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/60 via-transparent to-transparent transition-colors duration-350" />
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="lg:col-span-5 space-y-5">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">03 · Our Culture</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              Obsessed with craftsmanship, speed, and simplicity.
            </h2>
            <p className="text-secondary text-base lg:text-lg leading-relaxed font-light">
              We are designers, engineers, and product thinkers who reject cluttered interfaces and slow web applications. Every interaction, animation, and layout decision is held to the highest standard of simplicity and speed.
            </p>
          </motion.div>
        </div>

      </div>

      {/* Dramatic Full-Width Background Statistics Banner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-32">
        <motion.div
          {...fadeUp()}
          className="rounded-3xl relative overflow-hidden border border-subtle py-20 lg:py-28 px-6 sm:px-12 shadow-token-lg text-center"
        >
          {/* Dramatic Background Image */}
          <div className="absolute inset-0 -z-10">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85"
              alt="Modern skyscraper architecture upward view"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[var(--bg-surface)]/85 backdrop-blur-[2px] transition-colors duration-350" />
            <div className="absolute inset-0 bg-[radial-gradient(#00D16C_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-4 inline-block">By The Numbers</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-primary mb-12 tracking-tight transition-colors duration-350">
              Powering global creative output at scale.
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { stat: '12K+', label: 'Teams & creators syncing daily' },
                { stat: '50M+', label: 'Posts published seamlessly' },
                { stat: '99.9%', label: 'Platform API uptime SLA' },
              ].map((item) => (
                <div
                  key={item.stat}
                  className="p-8 rounded-2xl bg-surface/60 backdrop-blur-md border border-subtle hover:border-accent/40 transition-all duration-350"
                >
                  <p className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text accent-gradient mb-2"><AnimatedCounter value={item.stat} /></p>
                  <p className="text-sm text-secondary font-medium transition-colors duration-350">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div {...fadeUp()} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Leadership Team</h2>
          <p className="text-secondary text-lg font-light max-w-xl mx-auto">
            Backed by leaders from world-class SaaS, design, and AI organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              {...fadeUp(i * 0.08)}
              className="group p-5 rounded-2xl bg-surface border border-subtle hover:border-subtle/80 hover:shadow-token-md transition-all flex flex-col"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 border border-subtle bg-surface-2 relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <p className="font-bold text-primary text-base">{member.name}</p>
              <p className="text-xs font-semibold text-accent mb-2.5">{member.role}</p>
              <p className="text-xs text-secondary leading-relaxed font-light">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
