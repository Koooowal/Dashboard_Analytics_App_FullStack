import { X } from 'lucide-react'
import type { TimeFrame } from '@/types'

interface FilterPillsProps {
  categories: string[]
  timeFrame: TimeFrame
  searchQuery: string
  dateRangeLabel: string
  onRemoveCategory: (category: string) => void
  onClearCategories: () => void
  onClearSearch: () => void
  onClearAll: () => void
}

const TIME_FRAME_LABELS: Record<TimeFrame, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
}

export function FilterPills({
  categories,
  timeFrame,
  searchQuery,
  dateRangeLabel,
  onRemoveCategory,
  onClearCategories,
  onClearSearch,
  onClearAll,
}: FilterPillsProps) {
  const hasFilters = categories.length > 0 || searchQuery

  if (!hasFilters) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-[var(--text-muted)]">Active filters:</span>

      {searchQuery && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-sm text-[var(--color-primary)]">
          Search: "{searchQuery}"
          <button
            onClick={onClearSearch}
            className="rounded-full p-0.5 hover:bg-[var(--color-primary)]/20"
          >
            <X size={14} />
          </button>
        </span>
      )}

      {categories.map((category) => (
        <span
          key={category}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--chart-2)]/10 px-3 py-1 text-sm text-[var(--chart-2)]"
        >
          {category}
          <button
            onClick={() => onRemoveCategory(category)}
            className="rounded-full p-0.5 hover:bg-[var(--chart-2)]/20"
          >
            <X size={14} />
          </button>
        </span>
      ))}

      {categories.length > 1 && (
        <button
          onClick={onClearCategories}
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:underline"
        >
          Clear categories
        </button>
      )}

      <span className="mx-2 text-[var(--border-color)]">|</span>

      <span className="text-sm text-[var(--text-muted)]">
        {TIME_FRAME_LABELS[timeFrame]} • {dateRangeLabel}
      </span>

      <button
        onClick={onClearAll}
        className="ml-2 text-sm font-medium text-[var(--color-danger)] hover:underline"
      >
        Clear all
      </button>
    </div>
  )
}
