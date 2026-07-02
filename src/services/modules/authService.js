import { axiosClient, USE_MOCKS } from '../api/axiosClient.js'
import { ENDPOINTS } from '../api/endpoints.js'
import { delay } from '../mocks/mockUtils.js'
import { mockUser } from '../mocks/userMocks.js'

export const authService = {
  async login({ email, password }) {
    if (USE_MOCKS) {
      await delay(600)
      if (!email || !password) throw { message: 'Invalid credentials', code: 'AUTH_INVALID', status: 401 }
      const token = 'mock_token_' + Date.now()
      localStorage.setItem('ss_token', token)
      return { user: mockUser, token }
    }
    const { data } = await axiosClient.post(ENDPOINTS.auth.login, { email, password })
    localStorage.setItem('ss_token', data.token)
    return data
  },

  async signup({ name, email, password }) {
    if (USE_MOCKS) {
      await delay(700)
      const token = 'mock_token_' + Date.now()
      localStorage.setItem('ss_token', token)
      return { user: { ...mockUser, name, email }, token }
    }
    const { data } = await axiosClient.post(ENDPOINTS.auth.signup, { name, email, password })
    localStorage.setItem('ss_token', data.token)
    return data
  },

  async forgotPassword({ email }) {
    if (USE_MOCKS) {
      await delay(600)
      return { message: `Password reset instructions sent to ${email}` }
    }
    const { data } = await axiosClient.post(ENDPOINTS.auth.forgotPassword, { email })
    return data
  },

  async logout() {
    localStorage.removeItem('ss_token')
    if (USE_MOCKS) {
      await delay(200)
      return { success: true }
    }
    const { data } = await axiosClient.post(ENDPOINTS.auth.logout)
    return data
  },

  async getSession() {
    const token = localStorage.getItem('ss_token')
    if (!token) return null
    if (USE_MOCKS) {
      await delay(300)
      return { user: mockUser, token }
    }
    const { data } = await axiosClient.get(ENDPOINTS.users.me)
    return { user: data, token }
  },
}
