import { delay } from '../mocks/mockUtils.js'
import { mockTeamMembers, mockActivity, mockComments } from '../mocks/miscMocks.js'
import { USE_MOCKS } from '../api/axiosClient.js'

let _members = [...mockTeamMembers]

export const teamService = {
  async listMembers() {
    await delay(350)
    return _members
  },
  async invite({ email, role }) {
    await delay(500)
    const member = { id: 't_' + Date.now(), name: email.split('@')[0], email, role, avatar: null, status: 'pending' }
    _members = [..._members, member]
    return member
  },
  async updateRole(id, role) {
    await delay(300)
    _members = _members.map((m) => (m.id === id ? { ...m, role } : m))
    return _members.find((m) => m.id === id)
  },
  async remove(id) {
    await delay(300)
    _members = _members.filter((m) => m.id !== id)
    return { success: true }
  },
  async listActivity() {
    await delay(300)
    return mockActivity
  },
  async listComments() {
    await delay(250)
    return mockComments
  },
}

// USE_MOCKS retained for parity with other modules / future real backend swap
void USE_MOCKS
