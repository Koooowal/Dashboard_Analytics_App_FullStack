import { TrendingUp, TrendingDown, Minus, Trophy } from 'lucide-react'
import type { UserRanking } from '@/services/userService'
import { formatCurrency } from '@/utils/formatters'

interface TopPerformersProps {
  performers: UserRanking[]
  isLoading?: boolean
}

const RANK_COLORS = ['#f59e0b', '#94a3b8', '#cd7f32']

export function TopPerformers({
  performers,
  isLoading = false,
}: TopPerformersProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-[var(--shadow-sm)]">
        <div className="border-b border-[var(--border-color)] px-5 py-4">
          <div className="h-5 w-32 animate-pulse rounded bg-[var(--bg-tertiary)]" />
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="h-10 w-10 animate-pulse rounded-full bg-[var(--bg-tertiary)]" />
              <div className="flex-1">
                <div className="h-4 w-32 animate-pulse rounded bg-[var(--bg-tertiary)]" />
                <div className="mt-1 h-3 w-20 animate-pulse rounded bg-[var(--bg-tertiary)]" />
              </div>
              <div className="h-4 w-16 animate-pulse rounded bg-[var(--bg-tertiary)]" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] px-6 py-5">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            Top Performers
          </h3>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Best performing team members
          </p>
        </div>
        <Trophy size={20} className="text-[var(--color-warning)]" />
      </div>

      <div className="divide-y divide-[var(--border-color)]">
        {performers.map((performer) => {
          const TrendIcon =
            performer.trend === 'up'
              ? TrendingUp
              : performer.trend === 'down'
                ? TrendingDown
                : Minus

          const trendColor =
            performer.trend === 'up'
              ? 'text-[var(--color-success)]'
              : performer.trend === 'down'
                ? 'text-[var(--color-danger)]'
                : 'text-[var(--text-muted)]'

          return (
            <div
              key={performer.user.id}
              className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-[var(--bg-secondary)]"
            >
              <div className="relative">
                <img
                  src={performer.user.avatar}
                  alt={performer.user.name}
                  className="h-10 w-10 rounded-full bg-[var(--bg-tertiary)]"
                />
                {performer.rank <= 3 && (
                  <div
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: RANK_COLORS[performer.rank - 1] }}
                  >
                    {performer.rank}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                  {performer.user.name}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {performer.user.department} • {performer.user.role}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {formatCurrency(performer.user.performance.revenue)}
                </p>
                <div
                  className={`flex items-center justify-end gap-1 ${trendColor}`}
                >
                  <TrendIcon size={12} />
                  <span className="text-xs">Top {performer.percentile}%</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
