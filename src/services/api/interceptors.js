import { axiosClient } from './axiosClient.js'

// Injects auth token + active workspace id into every request, and
// normalizes every error into a single { message, code, status } shape.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ss_token')
  const workspaceId = localStorage.getItem('ss_active_workspace')
  if (token) config.headers.Authorization = `Bearer ${token}`
  if (workspaceId) config.headers['X-Workspace-Id'] = workspaceId
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = {
      message: error?.response?.data?.message || error.message || 'Unexpected error occurred',
      code: error?.response?.data?.code || 'UNKNOWN_ERROR',
      status: error?.response?.status || 0,
    }
    return Promise.reject(normalized)
  }
)
