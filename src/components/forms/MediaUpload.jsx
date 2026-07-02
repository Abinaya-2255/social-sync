import { useRef, useState, useCallback } from 'react'
import { UploadCloud, X, Film, Image as ImageIcon } from 'lucide-react'

export default function MediaUpload({ value, onChange, accept = 'image/*,video/*', multiple = false }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList).map((file) => ({
        file,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('video') ? 'video' : 'image',
        name: file.name,
      }))
      onChange?.(multiple ? [...(value || []), ...files] : files[0])
    },
    [onChange, value, multiple]
  )

  const onDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files)
  }

  const removeAt = (idx) => {
    if (multiple) onChange?.(value.filter((_, i) => i !== idx))
    else onChange?.(null)
  }

  const items = multiple ? value || [] : value ? [value] : []

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        className={`cursor-pointer rounded-2xl border-2 border-dashed transition-colors duration-150 flex flex-col items-center justify-center text-center py-10 px-6 ${
          isDragging ? 'border-accent bg-[var(--accent-glow)]' : 'border-subtle hover:border-accent bg-surface-2'
        }`}
      >
        <UploadCloud size={28} className="text-accent mb-3" />
        <p className="text-sm text-primary font-medium">Drag & drop media, or click to browse</p>
        <p className="text-xs text-muted mt-1">Supports JPG, PNG, MP4 — up to 100MB</p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files?.length && handleFiles(e.target.files)}
        />
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
          {items.map((item, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-surface-2 border border-subtle group">
              {item.type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center text-muted">
                  <Film size={22} />
                </div>
              ) : (
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeAt(i)
                }}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                aria-label="Remove media"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && (
        <div className="flex items-center gap-2 mt-3 text-xs text-muted">
          <ImageIcon size={14} /> No media attached yet
        </div>
      )}
    </div>
  )
}
