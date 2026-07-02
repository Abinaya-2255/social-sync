export default function InfiniteTicker({ items = [], renderItem, speed = '36s', className = '' }) {
  return (
    <div className={`w-full overflow-hidden relative select-none ${className}`}>
      {/* Soft gradient edge fade masks */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-surface)] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-surface)] to-transparent z-10 pointer-events-none" />

      <div
        className="animate-ticker flex items-center gap-12 sm:gap-16"
        style={{ animationDuration: speed }}
      >
        {/* Render twice for infinite loop */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className="shrink-0 flex items-center">
            {renderItem ? renderItem(item, index) : item}
          </div>
        ))}
      </div>
    </div>
  )
}
