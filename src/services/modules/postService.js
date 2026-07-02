import { axiosClient, USE_MOCKS } from '../api/axiosClient.js'
import { ENDPOINTS } from '../api/endpoints.js'
import { delay } from '../mocks/mockUtils.js'
import { mockPosts } from '../mocks/postMocks.js'
import { POST_STATUS } from '../../lib/constants.js'

let _posts = [...mockPosts]

export const postService = {
  async list({ workspaceId } = {}) {
    if (USE_MOCKS) {
      await delay(400)
      return workspaceId ? _posts.filter((p) => p.workspaceId === workspaceId) : _posts
    }
    const { data } = await axiosClient.get(ENDPOINTS.posts.list, { params: { workspaceId } })
    return data
  },

  async create(payload) {
    if (USE_MOCKS) {
      await delay(500)
      const newPost = {
        id: 'post_' + Date.now(),
        status: payload.publishNow ? POST_STATUS.PUBLISHED : payload.scheduledAt ? POST_STATUS.SCHEDULED : POST_STATUS.DRAFT,
        ...payload,
      }
      _posts = [newPost, ..._posts]
      return newPost
    }
    const { data } = await axiosClient.post(ENDPOINTS.posts.create, payload)
    return data
  },

  async update(id, payload) {
    if (USE_MOCKS) {
      await delay(400)
      _posts = _posts.map((p) => (p.id === id ? { ...p, ...payload } : p))
      return _posts.find((p) => p.id === id)
    }
    const { data } = await axiosClient.put(ENDPOINTS.posts.detail(id), payload)
    return data
  },

  async remove(id) {
    if (USE_MOCKS) {
      await delay(300)
      _posts = _posts.filter((p) => p.id !== id)
      return { success: true }
    }
    await axiosClient.delete(ENDPOINTS.posts.detail(id))
    return { success: true }
  },

  async publishNow(id) {
    if (USE_MOCKS) {
      await delay(600)
      _posts = _posts.map((p) => (p.id === id ? { ...p, status: POST_STATUS.PUBLISHED } : p))
      return _posts.find((p) => p.id === id)
    }
    const { data } = await axiosClient.post(ENDPOINTS.posts.publishNow(id))
    return data
  },
}
