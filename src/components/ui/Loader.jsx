export default function Loader({ size = 24, label, fullScreen = false, className = '' }) {
  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-surface border border-subtle flex items-center justify-center shadow-token-md overflow-hidden p-3">
          <div className="w-full h-full rounded-lg skeleton-shimmer" />
        </div>
        <div className="absolute -inset-2 rounded-3xl bg-[var(--accent)]/15 -z-10 blur-xl animate-pulse" />
      </div>
      {label && <p className="text-xs font-medium text-secondary animate-pulse">{label}</p>}
    </div>
  )

  if (fullScreen) {
    return <div className="fixed inset-0 flex items-center justify-center bg-base z-50">{content}</div>
  }
  return content
}
