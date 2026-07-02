import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Upload, FolderOpen, Image, Film, FileText,
  Trash2, Grid, List, X
} from 'lucide-react'
import { libraryService } from '../../../services/modules/libraryService.js'
import Button from '../../../components/ui/Button.jsx'
import EmptyState from '../../../components/ui/EmptyState.jsx'
import Skeleton from '../../../components/ui/Skeleton.jsx'
import { useDebounce } from '../../../hooks/useDebounce.js'
import { useToast } from '../../../context/ToastContext.jsx'

const TYPE_ICONS = { image: Image, video: Film, draft: FileText }
const TYPE_COLORS = { image: '#3B82F6', video: '#8B5CF6', draft: '#94A3B8' }

function AssetCard({ asset, view, onDelete }) {
  const Icon = TYPE_ICONS[asset.type] || FileText

  if (view === 'list') {
    return (
      <div className="flex items-center gap-4 p-3 rounded-xl table-row-interactive group">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border border-subtle" style={{ background: `${TYPE_COLORS[asset.type]}1a` }}>
          {asset.url ? (
            <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
          ) : (
            <Icon size={18} style={{ color: TYPE_COLORS[asset.type] }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-primary font-medium truncate">{asset.name}</p>
          <p className="text-xs text-muted">{asset.folder} · {asset.size}</p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-xs text-muted">{asset.uploadedAt}</p>
          <button onClick={() => onDelete(asset.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-500 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <motion.div layout className="group relative bg-surface border border-subtle rounded-2xl overflow-hidden hover:shadow-token-md transition-shadow cursor-pointer">
      <div className="aspect-square flex items-center justify-center overflow-hidden border-b border-subtle relative" style={{ background: `${TYPE_COLORS[asset.type]}0d` }}>
        {asset.url ? (
          <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <Icon size={36} style={{ color: TYPE_COLORS[asset.type] }} />
        )}
      </div>
      <div className="p-3">
        <p className="text-xs font-medium text-primary truncate">{asset.name}</p>
        <p className="text-[11px] text-muted mt-0.5">{asset.folder} · {asset.size}</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(asset.id) }}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-surface/90 backdrop-blur-sm rounded-lg hover:bg-red-500/10 hover:text-red-500 text-muted"
      >
        <Trash2 size={13} />
      </button>
    </motion.div>
  )
}

export default function ContentLibraryPage() {
  const [assets, setAssets] = useState([])
  const [folders, setFolders] = useState([])
  const [activeFolder, setActiveFolder] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [view, setView] = useState('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const debouncedSearch = useDebounce(searchTerm)
  const toast = useToast()

  useEffect(() => {
    Promise.all([libraryService.listFolders(), libraryService.listAssets({ folder: activeFolder })]).then(
      ([f, a]) => { setFolders(f); setAssets(a); setIsLoading(false) }
    )
  }, [activeFolder])

  const filtered = assets.filter((a) =>
    a.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    a.folder.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    try {
      const asset = await libraryService.upload(file)
      setAssets((prev) => [asset, ...prev])
      toast.success('File Uploaded!', 'Your media asset is now available in your content library.')
    } catch {
      toast.error('Upload Failed', 'Could not upload file. Please verify file size and format.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await libraryService.remove(id)
      setAssets((prev) => prev.filter((a) => a.id !== id))
      toast.success('Asset Deleted', 'The media asset has been removed from your library.')
    } catch {
      toast.error('Delete Failed', 'Could not delete media asset.')
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Content Library</h1>
          <p className="text-sm text-muted mt-0.5">Manage all your media assets and drafts</p>
        </div>
        <label>
          <input id="media-file-input" type="file" accept="image/*,video/*" className="hidden" onChange={handleUpload} />
          <Button icon={Upload} isLoading={isUploading} as="span">Upload Media</Button>
        </label>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Folder tree */}
        <div className="lg:w-48 shrink-0">
          <div className="bg-surface border border-subtle rounded-2xl p-4">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Folders</p>
            <div className="space-y-1">
              {folders.map((folder) => (
                <button
                  key={folder}
                  onClick={() => setActiveFolder(folder)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${activeFolder === folder ? 'bg-surface-2 text-accent font-medium' : 'text-secondary hover:bg-surface-2'}`}
                >
                  <FolderOpen size={14} className="shrink-0" />
                  <span className="truncate">{folder}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search assets..."
                className="w-full pl-9 pr-4 py-2.5 bg-surface border border-subtle rounded-xl text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"><X size={14} /></button>
              )}
            </div>
            <div className="flex bg-surface-2 border border-subtle rounded-xl overflow-hidden">
              <button onClick={() => setView('grid')} className={`p-2.5 ${view === 'grid' ? 'bg-surface text-primary shadow-sm' : 'text-muted'}`}><Grid size={15} /></button>
              <button onClick={() => setView('list')} className={`p-2.5 ${view === 'list' ? 'bg-surface text-primary shadow-sm' : 'text-muted'}`}><List size={15} /></button>
            </div>
          </div>

          {isLoading ? (
            view === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => <Skeleton key={i} variant="mediaCard" />)}
              </div>
            ) : (
              <div className="bg-surface border border-subtle rounded-2xl p-4 space-y-2">
                {[...Array(6)].map((_, i) => <Skeleton key={i} variant="tableRow" />)}
              </div>
            )
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={FolderOpen}
              title={searchTerm ? "No assets match your search" : "Your content library is empty"}
              description={searchTerm ? `We couldn't find any assets matching "${searchTerm}". Try adjusting your filters or search terms.` : "Upload images, videos, and drafts to organize your creative assets in one central library."}
              actionLabel={searchTerm ? "Clear Search" : "Upload Media"}
              actionIcon={searchTerm ? X : Upload}
              onAction={() => searchTerm ? setSearchTerm('') : document.getElementById('media-file-input')?.click()}
            />
          ) : view === 'grid' ? (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <AnimatePresence>
                {filtered.map((asset) => (
                  <motion.div key={asset.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                    <AssetCard asset={asset} view="grid" onDelete={handleDelete} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="bg-surface border border-subtle rounded-2xl p-4 space-y-1">
              {filtered.map((asset) => <AssetCard key={asset.id} asset={asset} view="list" onDelete={handleDelete} />)}
            </div>
          )}

          {!isLoading && (
            <p className="text-xs text-muted mt-4">{filtered.length} asset{filtered.length !== 1 ? 's' : ''}</p>
          )}
        </div>
      </div>
    </div>
  )
}
