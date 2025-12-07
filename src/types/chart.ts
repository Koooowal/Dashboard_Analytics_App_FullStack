export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

export interface LineChartData {
  name: string
  data: ChartDataPoint[]
}

export interface BarChartData {
  category: string
  values: { name: string; value: number }[]
}

export interface PieChartData {
  name: string
  value: number
  color?: string
}

export interface AreaChartData {
  name: string
  data: { date: string; value: number }[]
}

export type ChartType = 'line' | 'bar' | 'pie' | 'area' | 'donut'

export interface ChartConfig {
  type: ChartType
  title: string
  showLegend?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  animate?: boolean
  colors?: string[]
}

export interface TooltipPayload {
  name: string
  value: number
  color: string
  dataKey: string
}

export interface ChartMargins {
  top: number
  right: number
  bottom: number
  left: number
}
