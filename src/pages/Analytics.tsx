import { DashboardHeader, FilterBar } from '@/components/dashboard'
import {
  ChartCard,
  InteractiveAreaChart,
  InteractiveBarChart,
} from '@/components/charts'
import {
  useRevenueData,
  useCategorySales,
  useSalesByHour,
  useFilterSync,
} from '@/hooks'

export function Analytics() {
  useFilterSync()

  const { data: revenueData, isLoading: revenueLoading } = useRevenueData()
  const { data: categoryData, isLoading: categoryLoading } = useCategorySales()
  const { data: hourlyData, isLoading: hourlyLoading } = useSalesByHour()

  const hourlyChartData =
    hourlyData?.map((h) => ({
      hour: h.label,
      revenue: h.revenue,
      orders: h.orders,
    })) ?? []

  const categoryBarData =
    categoryData?.map((c) => ({
      category: c.category,
      revenue: c.revenue,
      orders: c.orders,
    })) ?? []

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Analytics"
        subtitle="Detailed analytics and insights for your business."
      />

      <FilterBar showSearch={false} showCategories />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Revenue Trend"
          subtitle="Revenue over the selected period"
          isLoading={revenueLoading}
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
          title="Revenue by Category"
          subtitle="Compare revenue across categories"
          isLoading={categoryLoading}
        >
          <InteractiveBarChart
            data={categoryBarData}
            bars={[{ dataKey: 'revenue', name: 'Revenue', color: '#22c55e' }]}
            xAxisKey="category"
            height={280}
            currencyFormat
            highlightOnHover
          />
        </ChartCard>
      </div>

      <ChartCard
        title="Hourly Sales Distribution"
        subtitle="Sales patterns throughout the day"
        isLoading={hourlyLoading}
        className="w-full"
      >
        <InteractiveBarChart
          data={hourlyChartData}
          bars={[
            { dataKey: 'revenue', name: 'Revenue', color: '#8b5cf6' },
            { dataKey: 'orders', name: 'Orders', color: '#06b6d4' },
          ]}
          xAxisKey="hour"
          height={300}
          highlightOnHover
        />
      </ChartCard>
    </div>
  )
}
