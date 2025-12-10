import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
} from 'lucide-react'
import {
  ChartCard,
  InteractiveAreaChart,
  InteractivePieChart,
  InteractiveBarChart,
} from '@/components/charts'
import {
  useDashboardStats,
  useRevenueData,
  useCategorySales,
  useActivity,
} from '@/hooks'
import { formatCurrency, formatCompact } from '@/utils/formatters'
import { formatRelativeTime } from '@/utils/dateHelpers'

export function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const {
    data: revenueData,
    isLoading: revenueLoading,
    refetch: refetchRevenue,
  } = useRevenueData()
  const {
    data: categoryData,
    isLoading: categoryLoading,
    refetch: refetchCategory,
  } = useCategorySales()
  const { data: activityData } = useActivity(8)

  const metrics = [
    {
      title: 'Total Revenue',
      value: stats?.totalRevenue ?? 0,
      change: stats?.revenueGrowth ?? 0,
      format: 'currency' as const,
      icon: DollarSign,
      color: 'var(--color-primary)',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders ?? 0,
      change: stats?.ordersGrowth ?? 0,
      format: 'number' as const,
      icon: ShoppingCart,
      color: 'var(--color-success)',
    },
    {
      title: 'Total Customers',
      value: stats?.totalCustomers ?? 0,
      change: stats?.customersGrowth ?? 0,
      format: 'number' as const,
      icon: Users,
      color: 'var(--color-warning)',
    },
    {
      title: 'Conversion Rate',
      value: stats?.conversionRate ?? 0,
      change: 2.4,
      format: 'percentage' as const,
      icon: Activity,
      color: 'var(--chart-5)',
    },
  ]

  const formatMetricValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value)
      case 'percentage':
        return `${value.toFixed(1)}%`
      default:
        return formatCompact(value)
    }
  }

  const pieData =
    categoryData?.map((cat) => ({
      name: cat.category,
      value: cat.revenue,
      color: cat.color,
    })) ?? []

  const barData =
    categoryData?.map((cat) => ({
      category: cat.category,
      orders: cat.orders,
      revenue: cat.revenue,
    })) ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Welcome back! Here&apos;s an overview of your analytics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const isPositive = metric.change >= 0

          return (
            <div
              key={metric.title}
              className={`rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 shadow-[var(--shadow-sm)] transition-all hover:shadow-[var(--shadow-md)] ${statsLoading ? 'animate-pulse' : ''}`}
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
                {statsLoading
                  ? '—'
                  : formatMetricValue(metric.value, metric.format)}
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
                <span className="text-sm text-[var(--text-muted)]">
                  vs last month
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Revenue Overview"
          subtitle="Daily revenue for the selected period"
          isLoading={revenueLoading}
          onRefresh={() => refetchRevenue()}
        >
          <InteractiveAreaChart
            data={revenueData ?? []}
            areas={[{ dataKey: 'revenue', name: 'Revenue', color: '#3b82f6' }]}
            xAxisKey="label"
            height={280}
            currencyFormat
            showAverage
          />
        </ChartCard>

        <ChartCard
          title="Sales by Category"
          subtitle="Revenue distribution across categories"
          isLoading={categoryLoading}
          onRefresh={() => refetchCategory()}
        >
          <InteractivePieChart
            data={pieData}
            height={320}
            donut
            currencyFormat
            totalLabel="Total Revenue"
          />
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Orders by Category"
            subtitle="Number of orders per category"
            isLoading={categoryLoading}
          >
            <InteractiveBarChart
              data={barData}
              bars={[{ dataKey: 'orders', name: 'Orders', color: '#22c55e' }]}
              xAxisKey="category"
              height={280}
              highlightOnHover
            />
          </ChartCard>
        </div>

        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-[var(--shadow-sm)]">
          <div className="border-b border-[var(--border-color)] px-5 py-4">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              Recent Activity
            </h3>
            <p className="mt-0.5 text-sm text-[var(--text-muted)]">
              Latest updates and events
            </p>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {activityData?.slice(0, 6).map((activity) => (
              <div key={activity.id} className="px-5 py-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full ${
                      activity.type === 'sale'
                        ? 'bg-[var(--color-success)]'
                        : activity.type === 'order'
                          ? 'bg-[var(--color-primary)]'
                          : activity.type === 'user'
                            ? 'bg-[var(--color-warning)]'
                            : 'bg-[var(--color-danger)]'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--text-primary)] truncate">
                      {activity.message}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <span>{formatRelativeTime(activity.timestamp)}</span>
                      {activity.value && (
                        <>
                          <span>•</span>
                          <span className="font-medium text-[var(--color-success)]">
                            {formatCurrency(activity.value)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
