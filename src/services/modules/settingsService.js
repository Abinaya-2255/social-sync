import { axiosClient, USE_MOCKS } from '../api/axiosClient.js'
import { ENDPOINTS } from '../api/endpoints.js'
import { delay } from '../mocks/mockUtils.js'

let _settings = {
  theme: 'dark',
  language: 'English (US)',
  twoFactorEnabled: false,
  emailNotifications: true,
  pushNotifications: false,
}

export const settingsService = {
  async get() {
    if (USE_MOCKS) {
      await delay(300)
      return _settings
    }
    const { data } = await axiosClient.get(ENDPOINTS.settings.get)
    return data
  },

  async update(payload) {
    if (USE_MOCKS) {
      await delay(400)
      _settings = { ..._settings, ...payload }
      return _settings
    }
    const { data } = await axiosClient.put(ENDPOINTS.settings.update, payload)
    return data
  },
}
