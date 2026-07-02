import { axiosClient, USE_MOCKS } from '../api/axiosClient.js'
import { ENDPOINTS } from '../api/endpoints.js'
import { delay } from '../mocks/mockUtils.js'
import {
  mockAICaptions, mockAIHashtags, mockAIIdeas, mockWeeklyPlan, mockAudienceSuggestions,
} from '../mocks/aiAndLibraryMocks.js'

export const aiService = {
  async generateCaption({ prompt } = {}) {
    if (USE_MOCKS) {
      await delay(900)
      return { suggestions: mockAICaptions, prompt }
    }
    const { data } = await axiosClient.post(ENDPOINTS.ai.caption, { prompt })
    return data
  },

  async generateHashtags({ prompt } = {}) {
    if (USE_MOCKS) {
      await delay(700)
      return { hashtags: mockAIHashtags, prompt }
    }
    const { data } = await axiosClient.post(ENDPOINTS.ai.hashtags, { prompt })
    return data
  },

  async optimizeTone({ text, tone } = {}) {
    if (USE_MOCKS) {
      await delay(800)
      return { result: `[${tone || 'Professional'} tone] ${text || 'Your optimized caption will appear here.'}` }
    }
    const { data } = await axiosClient.post(ENDPOINTS.ai.tone, { text, tone })
    return data
  },

  async rewriteCaption({ text } = {}) {
    if (USE_MOCKS) {
      await delay(800)
      return { result: `${text ? text.split(' ').reverse().join(' ') : 'Your rewritten caption will appear here.'}` }
    }
    const { data } = await axiosClient.post(ENDPOINTS.ai.rewrite, { text })
    return data
  },

  async getContentIdeas() {
    if (USE_MOCKS) {
      await delay(700)
      return mockAIIdeas
    }
    const { data } = await axiosClient.get(ENDPOINTS.ai.ideas)
    return data
  },

  async getWeeklyPlan() {
    if (USE_MOCKS) {
      await delay(700)
      return mockWeeklyPlan
    }
    const { data } = await axiosClient.get(ENDPOINTS.ai.planner)
    return data
  },

  async getAudienceSuggestions() {
    if (USE_MOCKS) {
      await delay(600)
      return mockAudienceSuggestions
    }
    const { data } = await axiosClient.get(ENDPOINTS.ai.audience)
    return data
  },
}
