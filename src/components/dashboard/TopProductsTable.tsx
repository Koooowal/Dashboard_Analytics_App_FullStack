import { TrendingUp, TrendingDown } from 'lucide-react'
import type { TopProduct } from '@/types'
import { formatCurrency, formatCompact } from '@/utils/formatters'

interface TopProductsTableProps {
  products: TopProduct[]
  isLoading?: boolean
}

export function TopProductsTable({
  products,
  isLoading = false,
}: TopProductsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-[var(--shadow-sm)]">
        <div className="border-b border-[var(--border-color)] px-5 py-4">
          <div className="h-5 w-32 animate-pulse rounded bg-[var(--bg-tertiary)]" />
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="h-10 w-10 animate-pulse rounded-lg bg-[var(--bg-tertiary)]" />
              <div className="flex-1">
                <div className="h-4 w-40 animate-pulse rounded bg-[var(--bg-tertiary)]" />
                <div className="mt-1 h-3 w-24 animate-pulse rounded bg-[var(--bg-tertiary)]" />
              </div>
              <div className="h-4 w-20 animate-pulse rounded bg-[var(--bg-tertiary)]" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-[var(--shadow-sm)]">
      <div className="border-b border-[var(--border-color)] px-6 py-5">
        <h3 className="text-base font-semibold text-[var(--text-primary)]">
          Top Products
        </h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Best performing products by revenue
        </p>
      </div>

      <div className="divide-y divide-[var(--border-color)]">
        {products.map((product, index) => {
          const isPositive = product.growth >= 0

          return (
            <div
              key={product.id}
              className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-[var(--bg-secondary)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-tertiary)] text-sm font-bold text-[var(--text-muted)]">
                #{index + 1}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                  {product.name}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {product.category} • {formatCompact(product.unitsSold)} sold
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {formatCurrency(product.revenue)}
                </p>
                <div
                  className={`flex items-center justify-end gap-1 text-xs ${
                    isPositive
                      ? 'text-[var(--color-success)]'
                      : 'text-[var(--color-danger)]'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  <span>
                    {isPositive ? '+' : ''}
                    {product.growth.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
