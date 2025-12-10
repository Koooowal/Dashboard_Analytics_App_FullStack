import type { ReactNode } from 'react'
import { RefreshCw, Download, Maximize2 } from 'lucide-react'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  isLoading?: boolean
  error?: string | null
  onRefresh?: () => void
  onExport?: () => void
  onExpand?: () => void
  actions?: ReactNode
  className?: string
}

export function ChartCard({
  title,
  subtitle,
  children,
  isLoading = false,
  error = null,
  onRefresh,
  onExport,
  onExpand,
  actions,
  className = '',
}: ChartCardProps) {
  return (
    <div
      className={`rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[var(--border-color)] px-5 py-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-sm text-[var(--text-muted)]">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1">
          {actions}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw
                size={16}
                className={isLoading ? 'animate-spin' : ''}
              />
            </button>
          )}
          {onExport && (
            <button
              onClick={onExport}
              className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
              title="Export"
            >
              <Download size={16} />
            </button>
          )}
          {onExpand && (
            <button
              onClick={onExpand}
              className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
              title="Expand"
            >
              <Maximize2 size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="p-5">
        {error ? (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <p className="text-sm text-[var(--color-danger)]">{error}</p>
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="mt-3 text-sm text-[var(--color-primary)] hover:underline"
              >
                Try again
              </button>
            )}
          </div>
        ) : isLoading ? (
          <ChartSkeleton />
        ) : (
          children
        )}
      </div>
    </div>
  )
}

const SKELETON_HEIGHTS = [45, 72, 58, 85, 63, 48, 78, 55, 68, 42, 75, 60]

function ChartSkeleton() {
  return (
    <div className="h-64 animate-pulse">
      <div className="flex h-full items-end justify-between gap-2 px-4">
        {SKELETON_HEIGHTS.map((height, i) => (
          <div
            key={i}
            className="w-full rounded-t bg-[var(--bg-tertiary)]"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  )
}
