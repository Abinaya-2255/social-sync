import { axiosClient, USE_MOCKS } from '../api/axiosClient.js'
import { ENDPOINTS } from '../api/endpoints.js'
import { delay } from '../mocks/mockUtils.js'
import { mockWorkspaces } from '../mocks/miscMocks.js'

let _workspaces = [...mockWorkspaces]

export const workspaceService = {
  async list() {
    if (USE_MOCKS) {
      await delay(350)
      return _workspaces
    }
    const { data } = await axiosClient.get(ENDPOINTS.workspaces.list)
    return data
  },

  async create(payload) {
    if (USE_MOCKS) {
      await delay(500)
      const ws = { id: 'ws_' + Date.now(), members: 1, accounts: 0, active: false, ...payload }
      _workspaces = [..._workspaces, ws]
      return ws
    }
    const { data } = await axiosClient.post(ENDPOINTS.workspaces.create, payload)
    return data
  },

  async switchTo(id) {
    if (USE_MOCKS) {
      await delay(300)
      _workspaces = _workspaces.map((w) => ({ ...w, active: w.id === id }))
      localStorage.setItem('ss_active_workspace', id)
      return _workspaces.find((w) => w.id === id)
    }
    localStorage.setItem('ss_active_workspace', id)
    const { data } = await axiosClient.get(ENDPOINTS.workspaces.detail(id))
    return data
  },
}
