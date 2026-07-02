import { ChevronLeft, ChevronRight, ChevronRight as Sep } from 'lucide-react'
import { Link } from 'react-router-dom'
import Skeleton from './Skeleton.jsx'

export function Table({ columns, data, renderRow, emptyState, isLoading = false, skeletonRows = 5 }) {
  if (isLoading) {
    return (
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-subtle">
              {columns.map((col) => (
                <th key={col.key} className="text-left font-medium text-muted text-xs uppercase tracking-wide pb-3 pr-4 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(skeletonRows)].map((_, i) => (
              <tr key={i} className="border-b border-subtle/40">
                <td colSpan={columns.length} className="py-2.5 pr-4">
                  <Skeleton variant="tableRow" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  if (!data?.length) return emptyState || null
  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="border-b border-subtle">
            {columns.map((col) => (
              <th key={col.key} className="text-left font-medium text-muted text-xs uppercase tracking-wide pb-3 pr-4 whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => renderRow(row, i))}
        </tbody>
      </table>
    </div>
  )
}

export function Pagination({ page, totalPages, onPrev, onNext }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-subtle">
      <p className="text-xs text-muted">Page {page} of {totalPages}</p>
      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className="p-1.5 rounded-lg border border-subtle text-secondary disabled:opacity-40 hover:bg-surface-2"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="p-1.5 rounded-lg border border-subtle text-secondary disabled:opacity-40 hover:bg-surface-2"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.to ? (
            <Link to={item.to} className="text-muted hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-primary font-medium">{item.label}</span>
          )}
          {i < items.length - 1 && <Sep size={14} className="text-muted" />}
        </span>
      ))}
    </nav>
  )
}
