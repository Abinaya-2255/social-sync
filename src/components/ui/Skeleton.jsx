export default function Skeleton({ variant = 'text', className = '', count = 1 }) {
  const renderContent = (index) => {
    switch (variant) {
      case 'card':
      case 'dashboardCard':
      case 'kpi':
        return (
          <div className={`bg-surface border border-subtle rounded-2xl p-5 space-y-4 ${className}`}>
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-28 skeleton-shimmer rounded-md" />
              <div className="h-11 w-11 skeleton-shimmer rounded-2xl" />
            </div>
            <div className="space-y-2 pt-1">
              <div className="h-7 w-32 skeleton-shimmer rounded-lg" />
              <div className="h-3 w-20 skeleton-shimmer rounded-md" />
            </div>
          </div>
        )

      case 'chart':
        return (
          <div className={`bg-surface border border-subtle rounded-2xl p-6 space-y-5 ${className}`}>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-44 skeleton-shimmer rounded-md" />
                <div className="h-3 w-64 skeleton-shimmer rounded-md" />
              </div>
              <div className="h-8 w-24 skeleton-shimmer rounded-xl" />
            </div>
            <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 pb-2 border-b border-subtle/60 px-2">
              {[65, 40, 85, 55, 90, 45, 75, 60, 95, 50, 80, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-full skeleton-shimmer rounded-t-lg"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between px-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-2.5 w-10 skeleton-shimmer rounded" />
              ))}
            </div>
          </div>
        )

      case 'calendar':
        return (
          <div className={`bg-surface border border-subtle rounded-2xl p-6 space-y-4 ${className}`}>
            <div className="flex items-center justify-between pb-4 border-b border-subtle">
              <div className="h-6 w-36 skeleton-shimmer rounded-lg" />
              <div className="flex gap-2">
                <div className="h-9 w-20 skeleton-shimmer rounded-xl" />
                <div className="h-9 w-20 skeleton-shimmer rounded-xl" />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-3 pb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="h-3 w-8 mx-auto skeleton-shimmer rounded" />
              ))}
            </div>
            <div className="grid grid-cols-7 gap-3">
              {[...Array(28)].map((_, i) => (
                <div key={i} className="h-24 bg-surface-2/40 border border-subtle/50 rounded-xl p-2 space-y-2 flex flex-col justify-between">
                  <div className="h-3 w-5 skeleton-shimmer rounded self-end" />
                  {i % 3 === 0 && <div className="h-5 w-full skeleton-shimmer rounded-md" />}
                  {i % 5 === 0 && <div className="h-5 w-4/5 skeleton-shimmer rounded-md" />}
                </div>
              ))}
            </div>
          </div>
        )

      case 'mediaCard':
        return (
          <div className={`bg-surface border border-subtle rounded-2xl overflow-hidden ${className}`}>
            <div className="aspect-square w-full skeleton-shimmer" />
            <div className="p-3.5 space-y-2">
              <div className="h-3.5 w-3/4 skeleton-shimmer rounded-md" />
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-16 skeleton-shimmer rounded" />
                <div className="h-4 w-12 skeleton-shimmer rounded-md" />
              </div>
            </div>
          </div>
        )

      case 'tableRow':
      case 'table':
        return (
          <div className={`flex items-center justify-between p-3.5 rounded-xl bg-surface-2/60 border border-subtle/50 gap-4 ${className}`}>
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              <div className="w-9 h-9 rounded-xl skeleton-shimmer shrink-0" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="h-3.5 w-1/3 skeleton-shimmer rounded-md" />
                <div className="h-2.5 w-1/4 skeleton-shimmer rounded" />
              </div>
            </div>
            <div className="h-3 w-20 skeleton-shimmer rounded hidden sm:block" />
            <div className="h-6 w-16 skeleton-shimmer rounded-lg shrink-0" />
          </div>
        )

      case 'notificationItem':
        return (
          <div className={`flex items-start gap-4 px-5 py-4 border-b border-subtle last:border-0 ${className}`}>
            <div className="w-9 h-9 rounded-xl skeleton-shimmer shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="h-3.5 w-2/5 skeleton-shimmer rounded-md" />
                <div className="h-2.5 w-12 skeleton-shimmer rounded" />
              </div>
              <div className="h-3 w-4/5 skeleton-shimmer rounded-md" />
              <div className="h-3 w-3/5 skeleton-shimmer rounded-md" />
            </div>
          </div>
        )

      case 'teamMember':
        return (
          <div className={`flex items-center gap-3 p-3.5 rounded-xl bg-surface-2/40 border border-subtle/40 ${className}`}>
            <div className="w-10 h-10 rounded-full skeleton-shimmer shrink-0" />
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="h-3.5 w-32 skeleton-shimmer rounded-md" />
              <div className="h-2.5 w-44 skeleton-shimmer rounded" />
            </div>
            <div className="h-7 w-20 skeleton-shimmer rounded-xl shrink-0" />
          </div>
        )

      case 'timelineCard':
      case 'feedCard':
        return (
          <div className={`flex items-center justify-between p-3.5 rounded-xl bg-surface-2/60 border border-subtle/50 gap-4 ${className}`}>
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-lg skeleton-shimmer shrink-0" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="h-3.5 w-2/3 skeleton-shimmer rounded-md" />
                <div className="h-2.5 w-1/3 skeleton-shimmer rounded" />
              </div>
            </div>
            <div className="h-6 w-20 skeleton-shimmer rounded-full shrink-0" />
          </div>
        )

      case 'activityItem':
        return (
          <div className={`flex items-start gap-3 py-1 ${className}`}>
            <div className="w-7 h-7 rounded-full skeleton-shimmer shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-4/5 skeleton-shimmer rounded-md" />
              <div className="h-2.5 w-1/3 skeleton-shimmer rounded" />
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className={`space-y-6 max-w-lg ${className}`}>
            <div className="space-y-1.5">
              <div className="h-3.5 w-24 skeleton-shimmer rounded-md" />
              <div className="h-11 w-full skeleton-shimmer rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3.5 w-28 skeleton-shimmer rounded-md" />
              <div className="h-11 w-full skeleton-shimmer rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3.5 w-20 skeleton-shimmer rounded-md" />
              <div className="h-24 w-full skeleton-shimmer rounded-xl" />
            </div>
            <div className="h-10 w-32 skeleton-shimmer rounded-xl" />
          </div>
        )

      case 'profile':
        return (
          <div className={`space-y-6 ${className}`}>
            <div className="bg-surface border border-subtle rounded-2xl p-6 flex items-center gap-5">
              <div className="w-16 h-16 rounded-full skeleton-shimmer shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-5 w-48 skeleton-shimmer rounded-lg" />
                <div className="h-3.5 w-32 skeleton-shimmer rounded-md" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-surface-2 rounded-2xl p-4 space-y-2 text-center flex flex-col items-center justify-center">
                  <div className="h-6 w-16 skeleton-shimmer rounded-md" />
                  <div className="h-3 w-20 skeleton-shimmer rounded" />
                </div>
              ))}
            </div>
          </div>
        )

      case 'avatar':
        return <div className={`h-10 w-10 rounded-full skeleton-shimmer ${className}`} />

      case 'button':
        return <div className={`h-10 w-24 rounded-xl skeleton-shimmer ${className}`} />

      case 'title':
        return <div className={`h-5 w-2/3 skeleton-shimmer rounded-lg ${className}`} />

      case 'text':
      default: {
        const widths = ['w-full', 'w-11/12', 'w-4/5', 'w-3/4']
        const widthClass = count > 1 ? widths[index % widths.length] : 'w-full'
        return <div className={`h-3.5 ${widthClass} skeleton-shimmer rounded-md ${className}`} />
      }
    }
  }

  return (
    <div className={count > 1 ? 'space-y-3' : ''}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderContent(i)}</div>
      ))}
    </div>
  )
}
