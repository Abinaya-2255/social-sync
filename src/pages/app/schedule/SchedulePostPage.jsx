import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Image, Video, Calendar, Clock, Send, Save,
  Sparkles, Hash, Eye, X, CheckCircle2, ChevronDown
} from 'lucide-react'
import { PLATFORM_LIST } from '../../../lib/platforms.js'
import { aiService } from '../../../services/modules/aiService.js'
import { postService } from '../../../services/modules/postService.js'
import { useToast } from '../../../context/ToastContext.jsx'
import Button from '../../../components/ui/Button.jsx'
import { PlatformBadge } from '../../../components/ui/Badge.jsx'
import EmojiPicker from '../../../components/forms/EmojiPicker.jsx'
import MediaUpload from '../../../components/forms/MediaUpload.jsx'

function PlatformSelector({ selected, onChange }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted mb-2">Publish to</p>
      <div className="flex flex-wrap gap-2">
        {PLATFORM_LIST.map((p) => {
          const isSelected = selected.includes(p.id)
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onChange(isSelected ? selected.filter((id) => id !== p.id) : [...selected, p.id])}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all duration-150 ${
                isSelected ? 'border-accent text-accent' : 'border-subtle text-secondary hover:border-[var(--accent)] hover:text-accent'
              }`}
              style={{ background: isSelected ? 'var(--accent-glow)' : undefined }}
            >
              <p.icon size={14} style={{ color: p.color }} />
              {p.label}
              {isSelected && <CheckCircle2 size={12} className="text-accent" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PreviewPanel({ caption, platforms, media }) {
  const [activePlatform, setActivePlatform] = useState(null)
  const displayPlatform = activePlatform || platforms[0]
  const platformConfig = PLATFORM_LIST.find((p) => p.id === displayPlatform)

  if (!platforms.length) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div>
          <Eye size={32} className="text-muted mx-auto mb-3" />
          <p className="text-sm text-muted">Select platforms to preview your post</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Platform tabs */}
      {platforms.length > 1 && (
        <div className="flex gap-1 flex-wrap mb-4">
          {platforms.map((pid) => (
            <button
              key={pid}
              onClick={() => setActivePlatform(pid)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                displayPlatform === pid ? 'bg-surface-2 text-primary' : 'text-muted hover:text-primary'
              }`}
            >
              {PLATFORM_LIST.find((p) => p.id === pid)?.label}
            </button>
          ))}
        </div>
      )}

      {/* Simulated post card */}
      <div className="bg-surface-2 rounded-2xl p-4 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full accent-gradient flex items-center justify-center text-white text-xs font-bold">S</div>
          <div>
            <p className="text-xs font-semibold text-primary">Your Brand</p>
            <p className="text-[11px] text-muted capitalize">{displayPlatform} · Now</p>
          </div>
        </div>

        {media && media.length > 0 && (
          <div className="w-full h-36 rounded-xl bg-surface border border-subtle flex items-center justify-center mb-3">
            <Image size={24} className="text-muted" />
          </div>
        )}

        <p className="text-xs text-primary leading-relaxed whitespace-pre-wrap break-words">
          {caption || <span className="text-muted italic">Your caption will appear here...</span>}
        </p>

        {platformConfig && caption.length > 0 && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-muted">{caption.length} / {platformConfig.charLimit.toLocaleString()}</span>
            {caption.length > platformConfig.charLimit && (
              <span className="text-[11px] text-red-500 font-medium">Over limit</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function SchedulePostPage() {
  const [caption, setCaption] = useState('')
  const [platforms, setPlatforms] = useState(['instagram'])
  const [media, setMedia] = useState([])
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false)
  const [isGeneratingHashtags, setIsGeneratingHashtags] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [aiCaptions, setAiCaptions] = useState([])
  const [aiHashtags, setAiHashtags] = useState([])
  const toast = useToast()
  const textareaRef = useRef(null)

  const handleGenerateCaption = async () => {
    setIsGeneratingCaption(true)
    try {
      const { suggestions } = await aiService.generateCaption({ prompt: caption })
      setAiCaptions(suggestions)
      toast.success('Captions Generated!', 'AI Assistant crafted tailored variations for your post.')
    } catch {
      toast.error('AI Generation Failed', 'We could not generate captions at this time. Please try again.')
    } finally {
      setIsGeneratingCaption(false)
    }
  }

  const handleGenerateHashtags = async () => {
    setIsGeneratingHashtags(true)
    try {
      const { hashtags } = await aiService.generateHashtags({ prompt: caption })
      setAiHashtags(hashtags)
      toast.success('Hashtags Generated!', 'Relevant high-reach hashtags added to your workflow.')
    } catch {
      toast.error('Hashtag Generation Failed', 'We could not generate hashtags. Please try again.')
    } finally {
      setIsGeneratingHashtags(false)
    }
  }

  const handlePublish = async (type) => {
    if (!platforms.length) {
      toast.warning('Select a Platform', 'Choose at least one social media channel before continuing.')
      return
    }
    setIsSubmitting(true)
    try {
      await postService.create({
        caption, platforms, media,
        scheduledAt: type === 'schedule' && scheduledDate ? `${scheduledDate}T${scheduledTime || '12:00'}:00` : null,
        publishNow: type === 'now',
        workspaceId: 'ws_1',
      })
      if (type === 'now') {
        toast.success('Published Successfully!', 'Your post has been sent directly to your selected channels.')
      } else if (type === 'draft') {
        toast.success('Draft Saved', 'Your post progress has been safely saved in your workspace.')
      } else {
        toast.success('Post Scheduled!', `Queued for publication on ${scheduledDate || 'selected date'} at ${scheduledTime || '12:00'}.`)
      }
      setCaption(''); setPlatforms(['instagram']); setMedia([]); setAiCaptions([]); setAiHashtags([])
    } catch {
      toast.error('Action Failed', 'We encountered an error processing your post. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-primary">Schedule Post</h1>
        <p className="text-sm text-muted mt-1">Create and schedule content across your platforms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Composer - 3 cols */}
        <div className="lg:col-span-3 space-y-4">
          {/* Platform selector */}
          <div className="bg-surface border border-subtle rounded-2xl p-5">
            <PlatformSelector selected={platforms} onChange={setPlatforms} />
          </div>

          {/* Caption editor */}
          <div className="bg-surface border border-subtle rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-primary">Caption</p>
              <div className="flex items-center gap-2">
                <EmojiPicker onSelect={(emoji) => setCaption((c) => c + emoji)} />
              </div>
            </div>
            <textarea
              ref={textareaRef}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your caption... or let AI help you below."
              rows={6}
              className="w-full resize-none bg-surface-2 border border-subtle rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent leading-relaxed"
            />
            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" variant="ghost" icon={Sparkles} onClick={handleGenerateCaption} isLoading={isGeneratingCaption}>
                AI Caption
              </Button>
              <Button size="sm" variant="ghost" icon={Hash} onClick={handleGenerateHashtags} isLoading={isGeneratingHashtags}>
                Hashtags
              </Button>
            </div>

            {/* AI caption suggestions */}
            {aiCaptions.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                <p className="text-xs font-medium text-muted">AI Suggestions — click to use</p>
                {aiCaptions.map((c, i) => (
                  <button key={i} onClick={() => { setCaption(c); setAiCaptions([]) }}
                    className="w-full text-left p-3 rounded-xl bg-surface-2 border border-subtle hover:border-accent text-xs text-secondary leading-relaxed transition-colors">
                    {c}
                  </button>
                ))}
              </motion.div>
            )}

            {/* AI hashtags */}
            {aiHashtags.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-xs font-medium text-muted mb-2">Suggested Hashtags — click to add</p>
                <div className="flex flex-wrap gap-1.5">
                  {aiHashtags.map((tag) => (
                    <button key={tag} onClick={() => setCaption((c) => c + ' ' + tag)}
                      className="text-xs px-2.5 py-1 rounded-full bg-surface-2 border border-subtle text-accent hover:bg-[var(--accent-glow)] transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Media upload */}
          <div className="bg-surface border border-subtle rounded-2xl p-5">
            <p className="text-sm font-semibold text-primary mb-4">Media</p>
            <MediaUpload value={media} onChange={setMedia} multiple />
          </div>

          {/* Scheduling */}
          <div className="bg-surface border border-subtle rounded-2xl p-5">
            <p className="text-sm font-semibold text-primary mb-4">Schedule</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted flex items-center gap-1.5"><Calendar size={12} />Date</label>
                <input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)}
                  className="bg-surface-2 border border-subtle rounded-xl px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted flex items-center gap-1.5"><Clock size={12} />Time</label>
                <input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)}
                  className="bg-surface-2 border border-subtle rounded-xl px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button onClick={() => handlePublish('now')} isLoading={isSubmitting} icon={Send}>Publish Now</Button>
            <Button variant="outline" onClick={() => handlePublish('schedule')} icon={Calendar} disabled={!scheduledDate}>
              Schedule
            </Button>
            <Button variant="ghost" onClick={() => handlePublish('draft')} icon={Save}>Save Draft</Button>
          </div>
        </div>

        {/* Preview panel - 2 cols */}
        <div className="lg:col-span-2">
          <div className="sticky top-20 bg-surface border border-subtle rounded-2xl p-5 min-h-[400px]">
            <div className="flex items-center gap-2 mb-4">
              <Eye size={16} className="text-muted" />
              <p className="text-sm font-semibold text-primary">Preview</p>
            </div>
            <PreviewPanel caption={caption} platforms={platforms} media={media} />
          </div>
        </div>
      </div>
    </div>
  )
}
