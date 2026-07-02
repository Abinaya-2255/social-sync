import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Hash, Sliders, RefreshCw, Lightbulb,
  CalendarDays, Target, Copy, CheckCheck, ChevronRight,
  Send, Bot, User, AlertCircle, BarChart3, Clock
} from 'lucide-react'
import { useToast } from '../../../context/ToastContext.jsx'
import Button from '../../../components/ui/Button.jsx'
import AnimatedCounter from '../../../components/ui/AnimatedCounter.jsx'

const SUGGESTIONS = [
  { label: 'Obsidian Theme Launch', prompt: 'Write an editorial post for our new obsidian dark theme product launch.' },
  { label: 'SaaS Autopilot Hook', prompt: 'Create 3 hooks for a social media management app launch.' },
  { label: 'Luxury Goods Campaign', prompt: 'Write a promotional caption for handcrafted luxury leather bags.' },
  { label: 'Design Webinar Promo', prompt: 'Draft a LinkedIn announcement for a live UI/UX design masterclass.' },
]

const RESPONSES = {
  'Write an editorial post for our new obsidian dark theme product launch.':
    "✦ Obsidian Series ✦\n\nCrafted with surgical precision. The new Obsidian Edition combines brushed obsidian dark titanium with deep emerald carbon accents.\n\nEvery line, curated. Every transition, handcrafted. Effortless, calm, fluid.\n\nNow live. Link in bio.\n\n#design #horology #minimalist #launch",
  
  'Create 3 hooks for a social media management app launch.':
    "1. \"Your entire social presence. Scheduled in one click. Autopilot on.\" (Conversion: +28%)\n\n2. \"Plan once. Publish everywhere. Stop context switching.\" (Hook rate: Extreme)\n\n3. \"The social media operating system built for creators who value craftsmanship.\" (Readability: High)",
  
  'Write a promotional caption for handcrafted luxury leather bags.':
    "Handcrafted to endure. ✦\n\nForged from full-grain vegetable-tanned leather and hand-finished with brass accents. A lifetime of utility in a single silhouette.\n\nDesigned for the nomadic creative. Crafted by hand.\n\nExplore the Collection.\n\n#craftsmanship #leathergoods #luxury #design",
  
  'Draft a LinkedIn announcement for a live UI/UX design masterclass.':
    "Designing interfaces that feel alive. ✦\n\nJoin us this Thursday at 7:00 PM for a live masterclass on designing premium micro-animations, glassmorphic layouts, and high-conversion interactions.\n\nLimited seats. Register now: socialsync.studio/webinar\n\n#design #webinar #ux #productdesign"
}

/* ── Copy button ── */
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const handle = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button onClick={handle} className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface transition-colors shrink-0">
      {copied ? <CheckCheck size={14} className="text-accent" /> : <Copy size={14} />}
    </button>
  )
}

export default function AIStudioPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! I am your Social Sync creative co-pilot. Select one of the suggestion chips below or type your custom prompt to generate, optimize, or format premium social media content."
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Content Score & Analytics
  const [score, setScore] = useState(92)
  const [confidence, setConfidence] = useState(98.4)
  const [readability, setReadability] = useState('Excellent')
  const [hookStrength, setHookStrength] = useState('Strong')

  const chatEndRef = useRef(null)
  const toast = useToast()

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async (customPrompt) => {
    const promptToSend = customPrompt || input
    if (!promptToSend.trim()) return

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: promptToSend }])
    setInput('')
    setIsTyping(true)

    // Simulate thinking delay
    await new Promise(r => setTimeout(r, 1200))
    setIsTyping(false)
    setIsGenerating(true)

    // Find predefined response or generate generic one
    const fullResponse = RESPONSES[promptToSend] || `✦ Content Plan generated for "${promptToSend}" ✦\n\nHere is a curated copy tailored for your audience:\n\n"Stop waiting for inspiration. Start building. The details are not the details. They make the design."\n\n#inspiration #entrepreneur #craft #studio`

    // Streaming text simulator
    let words = fullResponse.split(' ')
    let currentText = ''
    
    // Add empty assistant bubble
    setMessages(prev => [...prev, { role: 'assistant', text: '' }])

    for (let i = 0; i < words.length; i++) {
      await new Promise(r => setTimeout(r, 35))
      currentText += (i === 0 ? '' : ' ') + words[i]
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1].text = currentText
        return updated
      })
    }

    // Set updated stats
    const randomScore = Math.floor(Math.random() * 10) + 88 // 88 to 97
    const randomConfidence = +(Math.random() * 3 + 96.5).toFixed(1) // 96.5% to 99.5%
    setScore(randomScore)
    setConfidence(randomConfidence)
    setReadability(randomScore > 93 ? 'Exceptional' : 'Excellent')
    setHookStrength(randomScore > 91 ? 'Extreme' : 'Strong')

    setIsGenerating(false)
    toast.success('Content generated', 'AI Studio has optimized the campaign content.')
  }

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl border border-[#00D16C]/20 flex items-center justify-center bg-accent/10">
            <Sparkles size={20} className="text-accent animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">AI Studio</h1>
            <p className="text-xs text-muted mt-0.5">Premium editorial assistant & copy generator</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-surface border border-subtle text-secondary shadow-token-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Autopilot model · gpt-4o online
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        {/* Chat Workspace (Left) */}
        <div className="xl:col-span-3 flex flex-col h-[620px] bg-surface border border-subtle rounded-3xl overflow-hidden shadow-token-lg relative">
          
          {/* Subtle glow accent */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((m, idx) => {
                const isAssistant = m.role === 'assistant'
                const isLastAssistant = isAssistant && idx === messages.length - 1
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex gap-3.5 max-w-[85%] ${isAssistant ? 'mr-auto text-left' : 'ml-auto flex-row-reverse text-right'}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                      isAssistant ? 'border-[#00D16C]/20 bg-accent/10 text-accent' : 'border-subtle bg-surface-2 text-primary'
                    }`}>
                      {isAssistant ? <Bot size={15} /> : <User size={15} />}
                    </div>
                    <div className="space-y-1.5 min-w-0">
                      <div className={`rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-line relative ${
                        isAssistant
                          ? `bg-surface-2 border border-subtle/50 text-primary ${isLastAssistant && isGenerating ? 'shadow-[0_0_12px_rgba(0,209,108,0.06)]' : ''}`
                          : 'bg-accent/15 border border-accent/20 text-primary'
                      }`}>
                        {m.text}
                        {isAssistant && m.text.length > 0 && !isGenerating && (
                          <div className="absolute top-2.5 right-2.5">
                            <CopyBtn text={m.text} />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3.5 mr-auto text-left"
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-[#00D16C]/20 bg-accent/10 text-accent">
                    <Bot size={15} />
                  </div>
                  <div className="bg-surface-2 border border-subtle/50 rounded-2xl p-4 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Footer Area: Input & Suggestions */}
          <div className="border-t border-subtle p-4 bg-surface-2/40 backdrop-blur-md space-y-3.5 shrink-0">
            {/* Animated Suggestion Chips */}
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((item, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSend(item.prompt)}
                  disabled={isTyping || isGenerating}
                  className="px-3.5 py-1.5 rounded-full border border-subtle hover:border-accent/40 bg-surface text-xs font-medium text-secondary hover:text-primary transition-all duration-200 cursor-pointer shadow-token-sm"
                >
                  ✦ {item.label}
                </motion.button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your co-pilot to generate, rewrite, or schedule copy..."
                disabled={isTyping || isGenerating}
                className="w-full bg-surface border border-subtle rounded-2xl pl-4 pr-12 py-3.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={isTyping || isGenerating || !input.trim()}
                className="absolute right-2 p-2 rounded-xl bg-accent hover:brightness-110 text-white transition-all disabled:opacity-40 disabled:hover:brightness-100"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Intelligence Side Widget Panels (Right) */}
        <div className="xl:col-span-1 space-y-4">
          
          {/* Circular/Gradient Content Score Card */}
          <div className="bg-surface border border-subtle rounded-3xl p-5 relative overflow-hidden text-center flex flex-col items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            <span className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Content Quality Score</span>
            
            {/* Radial score display */}
            <div className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-accent bg-[#0B0C10] shadow-[0_0_20px_rgba(0,209,108,0.12)] mb-4">
              <span className="text-3xl font-extrabold text-primary">
                <AnimatedCounter value={score} duration={1200} />
              </span>
            </div>
            
            <div className="w-full space-y-2 text-left">
              {[
                { label: 'Readability', val: readability },
                { label: 'Hook Strength', val: hookStrength },
                { label: 'Conversion', val: score > 90 ? 'High' : 'Moderate' }
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center text-xs py-1 border-b border-subtle/40 last:border-0">
                  <span className="text-secondary">{item.label}</span>
                  <span className="font-semibold text-primary">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Confidence Indicator */}
          <div className="bg-surface border border-subtle rounded-3xl p-5">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-9 h-9 rounded-xl border border-accent/20 bg-accent/5 flex items-center justify-center shrink-0">
                <Target size={16} className="text-accent animate-pulse" />
              </div>
              <div>
                <span className="block text-[10px] text-muted uppercase tracking-wider font-semibold">Model Confidence</span>
                <span className="text-sm font-bold text-primary">
                  <AnimatedCounter value={confidence} duration={1200} suffix="%" /> Confidence
                </span>
              </div>
            </div>
            <p className="text-[11px] text-muted leading-relaxed">Generated copy strictly adheres to brand guidelines, tone profiles, and character limits.</p>
          </div>

          {/* Smart Recommendation Cards */}
          <div className="bg-surface border border-subtle rounded-3xl p-5 space-y-3.5">
            <span className="block text-xs font-semibold text-muted uppercase tracking-wider">Smart Recommendations</span>
            
            <div className="p-3 rounded-2xl bg-surface-2 border border-subtle flex items-start gap-2.5">
              <Clock size={15} className="text-accent mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-primary">Optimize schedule time</span>
                <span className="block text-[10px] text-muted mt-0.5 leading-normal">Schedule this launch today at 7:00 PM for maximum organic feed placement.</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-surface-2 border border-subtle flex items-start gap-2.5">
              <AlertCircle size={15} className="text-accent mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-primary">Inject visual accents</span>
                <span className="block text-[10px] text-muted mt-0.5 leading-normal">Add 2 emojis (e.g. ✦ or ✨) to boost organic conversion by 14%.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
