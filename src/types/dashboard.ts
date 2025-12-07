export interface DashboardMetric {
  id: string
  title: string
  value: number
  previousValue?: number
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  unit?: string
  icon?: string
}

export interface DateRange {
  startDate: Date
  endDate: Date
}

export type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface FilterState {
  dateRange: DateRange
  timeFrame: TimeFrame
  categories: string[]
  searchQuery: string
}

export interface DashboardState {
  isLoading: boolean
  error: string | null
  filters: FilterState
  selectedMetric: string | null
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'viewer'
  performance?: UserPerformance
}

export interface UserPerformance {
  sales: number
  revenue: number
  conversionRate: number
  avgOrderValue: number
}
