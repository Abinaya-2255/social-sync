import { axiosClient, USE_MOCKS } from '../api/axiosClient.js'
import { ENDPOINTS } from '../api/endpoints.js'
import { delay } from '../mocks/mockUtils.js'
import { mockPlatformConnections } from '../mocks/platformMocks.js'

let _connections = [...mockPlatformConnections]

export const platformService = {
  async list() {
    if (USE_MOCKS) {
      await delay(350)
      return _connections
    }
    const { data } = await axiosClient.get(ENDPOINTS.platforms.list)
    return data
  },

  async connect(platformId) {
    if (USE_MOCKS) {
      await delay(700)
      _connections = _connections.map((c) =>
        c.id === platformId ? { ...c, connected: true, handle: `@your${platformId}` } : c
      )
      return _connections.find((c) => c.id === platformId)
    }
    const { data } = await axiosClient.post(ENDPOINTS.platforms.connect, { platformId })
    return data
  },

  async disconnect(platformId) {
    if (USE_MOCKS) {
      await delay(400)
      _connections = _connections.map((c) =>
        c.id === platformId ? { ...c, connected: false, handle: null } : c
      )
      return { success: true }
    }
    await axiosClient.post(ENDPOINTS.platforms.disconnect(platformId))
    return { success: true }
  },
}
