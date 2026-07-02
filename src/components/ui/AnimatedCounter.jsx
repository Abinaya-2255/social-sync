import { useState, useEffect } from 'react'

export default function AnimatedCounter({ value, duration = 1500, prefix = '', suffix = '', className = '' }) {
  // Extract number from string if needed (e.g., "12,000+" -> 12000, suffix "+")
  const numVal = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, ''))
  const strVal = String(value)
  const inferredSuffix = suffix || (strVal.includes('+') ? '+' : strVal.includes('%') ? '%' : strVal.includes('k') || strVal.includes('K') ? 'K' : strVal.includes('M') ? 'M' : '')
  const inferredPrefix = prefix || (strVal.includes('$') ? '$' : '')

  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isNaN(numVal) || numVal === 0) {
      setCount(numVal || 0)
      return
    }

    let startTimestamp = null
    let animationFrameId = null

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easedProgress * numVal))

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step)
      } else {
        setCount(numVal)
      }
    }

    animationFrameId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(animationFrameId)
  }, [numVal, duration])

  const formattedCount = typeof count === 'number' ? count.toLocaleString() : count

  return (
    <span className={className}>
      {inferredPrefix}{formattedCount}{inferredSuffix}
    </span>
  )
}
