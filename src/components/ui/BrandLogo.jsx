import { APP_NAME } from '../../lib/constants.js'

export default function BrandLogo({ size = 32, showText = true, className = '', textClassName = 'font-bold text-primary text-base tracking-tight' }) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Refined Geometric Vector Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Dark Obsidian container with subtle green glow border */}
        <rect width="36" height="36" rx="10" fill="#0B0C10" stroke="#00D16C" strokeWidth="1.2" strokeOpacity="0.35" />
        {/* Sync / Pulse geometric node */}
        <path
          d="M12 18C12 13.582 15.582 10 20 10C24.418 10 28 13.582 28 18"
          stroke="#00D16C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M24 18C24 22.418 20.418 26 16 26C11.582 26 8 22.418 8 18"
          stroke="#00D16C"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
        <circle cx="20" cy="18" r="3" fill="#00D16C" />
        <circle cx="16" cy="18" r="3" fill="#00D16C" fillOpacity="0.45" />
      </svg>

      {showText && (
        <span className={textClassName}>
          {APP_NAME}
        </span>
      )}
    </div>
  )
}
