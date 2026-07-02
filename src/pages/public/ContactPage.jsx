import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '../../components/ui/Button.jsx'
import { Mail, MapPin, MessageCircle, Clock, CheckCircle2 } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const yParallax = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }

  return (
    <div ref={containerRef} className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch min-h-[720px]">
        
        {/* Left Side: Contact Details & Interactive Form */}
        <div className="lg:col-span-6 flex flex-col justify-between py-2">
          <div>
            <motion.div {...fadeUp()}>
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Contact Social Sync
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-primary tracking-tight leading-tight mb-4">
                Let’s build something <span className="text-transparent bg-clip-text accent-gradient">extraordinary.</span>
              </h1>
              <p className="text-secondary text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
                Whether you’re scaling an agency, requesting custom enterprise infrastructure, or just exploring what AI can do for your workflow—our team is ready to talk.
              </p>
            </motion.div>

            {/* Quick Contact Badges */}
            <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
              {[
                { icon: Mail, label: 'Direct Email', value: 'hello@socialsync.app' },
                { icon: MessageCircle, label: 'Support Chat', value: '24 hr avg response' },
                { icon: MapPin, label: 'Headquarters', value: 'New York, USA' },
              ].map((item) => (
                <div key={item.label} className="p-3.5 rounded-xl bg-surface border border-subtle/80 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-accent text-xs font-semibold">
                    <item.icon size={14} />
                    <span>{item.label}</span>
                  </div>
                  <p className="text-xs text-primary font-medium truncate">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Form Section */}
          <motion.div {...fadeUp(0.2)} className="p-6 sm:p-8 rounded-3xl bg-surface border border-subtle shadow-token-lg relative overflow-hidden">
            {sent ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center shadow-lg shadow-accent/20">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Message Received</h3>
                <p className="text-secondary text-sm max-w-sm leading-relaxed">
                  Thank you for reaching out. A senior product specialist will review your note and respond within 24 hours.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSent(false)} className="mt-2">
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-primary uppercase tracking-wider">Your Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Jordan Smith"
                      className="px-3.5 py-2.5 rounded-xl bg-surface-2 border border-subtle text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-primary uppercase tracking-wider">Work Email</label>
                    <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="jordan@company.com"
                      className="px-3.5 py-2.5 rounded-xl bg-surface-2 border border-subtle text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-primary uppercase tracking-wider">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Enterprise inquiry / Agency plan"
                    className="px-3.5 py-2.5 rounded-xl bg-surface-2 border border-subtle text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-primary uppercase tracking-wider">How can we help?</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Share your workflow goals or questions..."
                    className="px-3.5 py-2.5 rounded-xl bg-surface-2 border border-subtle text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all resize-none" />
                </div>
                <Button type="submit" size="lg" className="w-full shadow-lg shadow-accent/15">
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Right Side: Full-Height Editorial Luxury Workspace Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 rounded-3xl overflow-hidden border border-subtle relative min-h-[460px] lg:min-h-full flex flex-col justify-end p-8 sm:p-12 shadow-token-lg group"
        >
          {/* Parallax Image Background */}
          <motion.div style={{ y: yParallax }} className="absolute -inset-10 z-0">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85"
              alt="Luxury office skyline at dusk"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
            />
          </motion.div>

          {/* Adaptive Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/60 to-transparent z-10 transition-colors duration-350" />
          <div className="absolute inset-0 bg-[radial-gradient(#00D16C_1px,transparent_1px)] [background-size:32px_32px] opacity-10 z-10" />

          {/* Floating Glass Editorial Quote Card */}
          <div className="relative z-20 max-w-md p-6 sm:p-7 rounded-2xl bg-surface/80 backdrop-blur-xl border border-subtle shadow-2xl space-y-4 transition-all duration-350">
            <div className="flex items-center gap-2 text-xs text-accent font-semibold uppercase tracking-widest">
              <Clock size={14} /> 24/7 Global Infrastructure
            </div>
            <p className="text-sm sm:text-base text-primary leading-relaxed italic font-light transition-colors duration-350">
              "Switching our 15 client accounts to Social Sync eliminated hours of weekly context switching. The platform feels handcrafted for modern high-performance creative teams."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-subtle">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Elena Rostova"
                className="w-10 h-10 rounded-full object-cover border border-subtle"
              />
              <div>
                <p className="text-sm font-semibold text-primary">Elena Rostova</p>
                <p className="text-xs text-muted">VP of Brand & Growth, Kite Digital</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
