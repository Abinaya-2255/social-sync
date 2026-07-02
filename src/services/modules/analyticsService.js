import { axiosClient, USE_MOCKS } from '../api/axiosClient.js'
import { ENDPOINTS } from '../api/endpoints.js'
import { delay } from '../mocks/mockUtils.js'
import {
  mockAnalyticsSummary, mockEngagementSeries, mockReachSeries,
  mockFollowerGrowthSeries, mockPlatformComparison, mockBestPostingTimes,
} from '../mocks/analyticsMocks.js'

export const analyticsService = {
  async getSummary() {
    if (USE_MOCKS) {
      await delay(400)
      return mockAnalyticsSummary
    }
    const { data } = await axiosClient.get(ENDPOINTS.analytics.summary)
    return data
  },

  async getEngagement() {
    if (USE_MOCKS) {
      await delay(450)
      return mockEngagementSeries
    }
    const { data } = await axiosClient.get(ENDPOINTS.analytics.engagement)
    return data
  },

  async getReach() {
    if (USE_MOCKS) {
      await delay(450)
      return mockReachSeries
    }
    const { data } = await axiosClient.get(ENDPOINTS.analytics.reach)
    return data
  },

  async getGrowth() {
    if (USE_MOCKS) {
      await delay(450)
      return mockFollowerGrowthSeries
    }
    const { data } = await axiosClient.get(ENDPOINTS.analytics.growth)
    return data
  },

  async getPlatformComparison() {
    if (USE_MOCKS) {
      await delay(400)
      return mockPlatformComparison
    }
    const { data } = await axiosClient.get('/analytics/platform-comparison')
    return data
  },

  async getBestPostingTimes() {
    if (USE_MOCKS) {
      await delay(400)
      return mockBestPostingTimes
    }
    const { data } = await axiosClient.get(ENDPOINTS.analytics.bestTime)
    return data
  },
}
