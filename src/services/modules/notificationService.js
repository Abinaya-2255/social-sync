import { axiosClient, USE_MOCKS } from '../api/axiosClient.js'
import { ENDPOINTS } from '../api/endpoints.js'
import { delay } from '../mocks/mockUtils.js'
import { mockNotifications } from '../mocks/miscMocks.js'

let _notifications = [...mockNotifications]

export const notificationService = {
  async list() {
    if (USE_MOCKS) {
      await delay(300)
      return _notifications
    }
    const { data } = await axiosClient.get(ENDPOINTS.notifications.list)
    return data
  },

  async markRead(id) {
    if (USE_MOCKS) {
      await delay(200)
      _notifications = _notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      return { success: true }
    }
    await axiosClient.post(ENDPOINTS.notifications.markRead(id))
    return { success: true }
  },

  async markAllRead() {
    if (USE_MOCKS) {
      await delay(250)
      _notifications = _notifications.map((n) => ({ ...n, read: true }))
      return { success: true }
    }
    await axiosClient.post('/notifications/read-all')
    return { success: true }
  },
}
