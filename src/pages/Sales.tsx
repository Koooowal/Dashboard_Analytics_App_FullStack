import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
} from 'lucide-react'
import { DashboardHeader, FilterBar } from '@/components/dashboard'
import {
  ChartCard,
  InteractiveAreaChart,
  InteractivePieChart,
} from '@/components/charts'
import {
  useSalesSummary,
  useSalesComparison,
  useRevenueByTimeFrame,
  useCategorySalesData,
  useFilterSync,
} from '@/hooks'
import { formatCurrency, formatCompact } from '@/utils/formatters'

export function Sales() {
  useFilterSync()

  const { data: summary, isLoading: summaryLoading } = useSalesSummary()
  const { data: comparison } = useSalesComparison()
  const { data: revenueData, isLoading: revenueLoading } =
    useRevenueByTimeFrame()
  const { data: categoryData, isLoading: categoryLoading } =
    useCategorySalesData()

  const metrics = [
    {
      title: 'Total Revenue',
      value: summary?.totalRevenue ?? 0,
      change: comparison?.changes.revenue ?? 0,
      icon: DollarSign,
      color: 'var(--color-primary)',
    },
    {
      title: 'Total Orders',
      value: summary?.totalOrders ?? 0,
      change: comparison?.changes.orders ?? 0,
      icon: Package,
      color: 'var(--color-success)',
    },
    {
      title: 'Avg Order Value',
      value: summary?.avgOrderValue ?? 0,
      change: comparison?.changes.avgOrderValue ?? 0,
      icon: Users,
      color: 'var(--color-warning)',
    },
  ]

  const pieData =
    categoryData?.map((cat) => ({
      name: cat.category,
      value: cat.revenue,
      color: cat.color,
    })) ?? []

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Sales"
        subtitle="Track and manage your sales performance."
      />

      <FilterBar showSearch showCategories />

      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => {
          const isPositive = metric.change >= 0
          return (
            <div
              key={metric.title}
              className={`rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 shadow-[var(--shadow-sm)] ${summaryLoading ? 'animate-pulse' : ''}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[var(--text-muted)]">
                  {metric.title}
                </p>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${metric.color} 15%, transparent)`,
                  }}
                >
                  <metric.icon size={20} style={{ color: metric.color }} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-[var(--text-primary)]">
                {summaryLoading
                  ? '—'
                  : metric.title.includes('Revenue') ||
                      metric.title.includes('Value')
                    ? formatCurrency(metric.value)
                    : formatCompact(metric.value)}
              </p>
              <div className="mt-2 flex items-center gap-1">
                {isPositive ? (
                  <TrendingUp
                    size={16}
                    className="text-[var(--color-success)]"
                  />
                ) : (
                  <TrendingDown
                    size={16}
                    className="text-[var(--color-danger)]"
                  />
                )}
                <span
                  className={`text-sm font-medium ${
                    isPositive
                      ? 'text-[var(--color-success)]'
                      : 'text-[var(--color-danger)]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {metric.change.toFixed(1)}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Revenue Over Time"
          subtitle="Track revenue trends"
          isLoading={revenueLoading}
        >
          <InteractiveAreaChart
            data={revenueData ?? []}
            areas={[{ dataKey: 'revenue', name: 'Revenue', color: '#3b82f6' }]}
            xAxisKey="label"
            height={300}
            currencyFormat
            showAverage
          />
        </ChartCard>

        <ChartCard
          title="Sales by Category"
          subtitle="Revenue distribution"
          isLoading={categoryLoading}
        >
          <InteractivePieChart
            data={pieData}
            height={340}
            donut
            currencyFormat
            totalLabel="Total Sales"
          />
        </ChartCard>
      </div>
    </div>
  )
}
