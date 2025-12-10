import { DollarSign, ShoppingCart, Users, Activity } from 'lucide-react'
import {
  ChartCard,
  InteractiveAreaChart,
  InteractivePieChart,
  InteractiveBarChart,
} from '@/components/charts'
import {
  DashboardHeader,
  FilterBar,
  MetricCard,
  TopProductsTable,
  TopPerformers,
} from '@/components/dashboard'
import {
  useDashboardStats,
  useRevenueData,
  useCategorySales,
  useActivity,
  useFilterSync,
  useTopProducts,
  useTopPerformers,
} from '@/hooks'
import { formatCurrency } from '@/utils/formatters'
import { formatRelativeTime } from '@/utils/dateHelpers'

export function Dashboard() {
  useFilterSync()

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
  const { data: topProducts, isLoading: productsLoading } = useTopProducts(5)
  const { data: topPerformers, isLoading: performersLoading } =
    useTopPerformers(5)

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

  const pieData =
    categoryData?.map((cat) => ({
      name: cat.category,
      value: cat.revenue,
      color: cat.color,
    })) ?? []

  const ordersData =
    revenueData?.map((d) => ({
      label: d.label,
      orders: d.orders,
      revenue: d.revenue,
    })) ?? []

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Dashboard"
        subtitle="Welcome back! Here's an overview of your analytics."
      />

      <FilterBar showSearch={false} showCategories />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            format={metric.format}
            icon={metric.icon}
            color={metric.color}
            isLoading={statsLoading}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
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
            height={320}
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
            height={360}
            donut
            currencyFormat
            totalLabel="Total Revenue"
          />
        </ChartCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Orders Trend"
            subtitle="Orders and revenue over time"
            isLoading={revenueLoading}
          >
            <InteractiveBarChart
              data={ordersData}
              bars={[{ dataKey: 'orders', name: 'Orders', color: '#22c55e' }]}
              xAxisKey="label"
              height={320}
              highlightOnHover
            />
          </ChartCard>
        </div>

        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-[var(--shadow-sm)]">
          <div className="border-b border-[var(--border-color)] px-6 py-5">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              Recent Activity
            </h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Latest updates and events
            </p>
          </div>
          <div className="max-h-[360px] divide-y divide-[var(--border-color)] overflow-y-auto">
            {activityData?.slice(0, 8).map((activity) => (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                      activity.type === 'sale'
                        ? 'bg-[var(--color-success)]'
                        : activity.type === 'order'
                          ? 'bg-[var(--color-primary)]'
                          : activity.type === 'user'
                            ? 'bg-[var(--color-warning)]'
                            : 'bg-[var(--color-danger)]'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-[var(--text-primary)]">
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

      <div className="grid gap-6 xl:grid-cols-2">
        <TopProductsTable
          products={topProducts ?? []}
          isLoading={productsLoading}
        />
        <TopPerformers
          performers={topPerformers ?? []}
          isLoading={performersLoading}
        />
      </div>
    </div>
  )
}
