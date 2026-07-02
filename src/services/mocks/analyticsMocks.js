const days = (n) =>
  Array.from({ length: n }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (n - i))
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })

export const mockAnalyticsSummary = {
  engagement: { value: 84230, delta: 12.4 },
  reach: { value: 612400, delta: 8.1 },
  impressions: { value: 1284000, delta: -3.2 },
  followerGrowth: { value: 4310, delta: 15.7 },
}

export const mockEngagementSeries = days(14).map((date, i) => ({
  date,
  engagement: 3000 + Math.round(Math.sin(i / 2) * 800 + i * 120 + Math.random() * 400),
}))

export const mockReachSeries = days(14).map((date, i) => ({
  date,
  reach: 18000 + Math.round(Math.cos(i / 3) * 2500 + i * 600 + Math.random() * 1200),
}))

export const mockFollowerGrowthSeries = days(14).map((date, i) => ({
  date,
  followers: 40000 + i * 280 + Math.round(Math.random() * 150),
}))

export const mockPlatformComparison = [
  { platform: 'Instagram', engagement: 32400, reach: 210000 },
  { platform: 'TikTok', engagement: 41200, reach: 268000 },
  { platform: 'Facebook', engagement: 12800, reach: 94000 },
  { platform: 'LinkedIn', engagement: 9100, reach: 41000 },
  { platform: 'X', engagement: 7600, reach: 38000 },
  { platform: 'Pinterest', engagement: 3200, reach: 22000 },
]

export const mockBestPostingTimes = [
  { day: 'Mon', hour: 9, score: 42 }, { day: 'Mon', hour: 13, score: 68 }, { day: 'Mon', hour: 19, score: 81 },
  { day: 'Tue', hour: 9, score: 51 }, { day: 'Tue', hour: 13, score: 74 }, { day: 'Tue', hour: 19, score: 88 },
  { day: 'Wed', hour: 9, score: 60 }, { day: 'Wed', hour: 13, score: 79 }, { day: 'Wed', hour: 19, score: 93 },
  { day: 'Thu', hour: 9, score: 55 }, { day: 'Thu', hour: 13, score: 82 }, { day: 'Thu', hour: 19, score: 95 },
  { day: 'Fri', hour: 9, score: 48 }, { day: 'Fri', hour: 13, score: 70 }, { day: 'Fri', hour: 19, score: 90 },
  { day: 'Sat', hour: 9, score: 35 }, { day: 'Sat', hour: 13, score: 58 }, { day: 'Sat', hour: 19, score: 72 },
  { day: 'Sun', hour: 9, score: 30 }, { day: 'Sun', hour: 13, score: 52 }, { day: 'Sun', hour: 19, score: 65 },
]
