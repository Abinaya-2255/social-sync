import { axiosClient, USE_MOCKS } from '../api/axiosClient.js'
import { ENDPOINTS } from '../api/endpoints.js'
import { delay } from '../mocks/mockUtils.js'
import { mockUser } from '../mocks/userMocks.js'

export const userService = {
  async getProfile() {
    if (USE_MOCKS) {
      await delay(300)
      return mockUser
    }
    const { data } = await axiosClient.get(ENDPOINTS.users.me)
    return data
  },

  async updateProfile(payload) {
    if (USE_MOCKS) {
      await delay(500)
      return { ...mockUser, ...payload }
    }
    const { data } = await axiosClient.put(ENDPOINTS.users.updateProfile, payload)
    return data
  },

  async changePassword(payload) {
    if (USE_MOCKS) {
      await delay(500)
      return { success: true }
    }
    const { data } = await axiosClient.put(ENDPOINTS.users.changePassword, payload)
    return data
  },
}
