import { delay } from '../mocks/mockUtils.js'
import { mockLibraryAssets, mockFolders } from '../mocks/aiAndLibraryMocks.js'

let _assets = [...mockLibraryAssets]

export const libraryService = {
  async listAssets({ folder } = {}) {
    await delay(400)
    if (!folder || folder === 'All') return _assets
    return _assets.filter((a) => a.folder === folder)
  },
  async listFolders() {
    await delay(150)
    return mockFolders
  },
  async upload(file) {
    await delay(800)
    const asset = {
      id: 'm_' + Date.now(),
      type: file?.type?.startsWith('video') ? 'video' : 'image',
      name: file?.name || 'new-upload.jpg',
      folder: 'Drafts',
      size: '—',
      uploadedAt: new Date().toISOString().slice(0, 10),
    }
    _assets = [asset, ..._assets]
    return asset
  },
  async remove(id) {
    await delay(250)
    _assets = _assets.filter((a) => a.id !== id)
    return { success: true }
  },
}
