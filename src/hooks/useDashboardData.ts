import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services'
import { useFilterStore } from '@/store'

export function useDashboardStats() {
  const { dateRange, categories } = useFilterStore()

  return useQuery({
    queryKey: ['dashboardStats', dateRange, categories],
    queryFn: () => dashboardService.getStats(dateRange, categories),
  })
}

export function useRevenueData() {
  const { dateRange, timeFrame, categories } = useFilterStore()

  return useQuery({
    queryKey: ['revenueData', dateRange, timeFrame, categories],
    queryFn: () =>
      dashboardService.getRevenueData(dateRange, timeFrame, categories),
  })
}

export function useCategorySales() {
  const { dateRange, categories } = useFilterStore()

  return useQuery({
    queryKey: ['categorySales', dateRange, categories],
    queryFn: () => dashboardService.getCategorySales(dateRange, categories),
  })
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => dashboardService.getUsers(),
  })
}

export function useTopUsers(limit = 5) {
  return useQuery({
    queryKey: ['topUsers', limit],
    queryFn: () => dashboardService.getTopUsers(limit),
  })
}

export function useActivity(limit = 10) {
  return useQuery({
    queryKey: ['activity', limit],
    queryFn: () => dashboardService.getActivity(limit),
  })
}

export function useTopProducts(limit = 5) {
  const { dateRange, categories } = useFilterStore()

  return useQuery({
    queryKey: ['topProducts', limit, dateRange, categories],
    queryFn: () =>
      dashboardService.getTopProducts(limit, dateRange, categories),
  })
}
