import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  onClick?: () => void
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
}

export function Card({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick,
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-[var(--shadow-sm)] transition-all ${paddingClasses[padding]} ${hover ? 'cursor-pointer hover:shadow-[var(--shadow-md)] hover:border-[var(--border-color-hover)]' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
  className?: string
}

export function CardHeader({
  title,
  subtitle,
  action,
  className = '',
}: CardHeaderProps) {
  return (
    <div className={`flex items-start justify-between ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-sm text-[var(--text-muted)]">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`mt-4 ${className}`}>{children}</div>
}

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: ReactNode
  iconColor?: string
  trend?: 'up' | 'down' | 'neutral'
  loading?: boolean
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  iconColor = 'var(--color-primary)',
  trend,
  loading = false,
}: MetricCardProps) {
  if (loading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 rounded bg-[var(--bg-tertiary)]" />
            <div className="h-10 w-10 rounded-lg bg-[var(--bg-tertiary)]" />
          </div>
          <div className="mt-3 h-8 w-32 rounded bg-[var(--bg-tertiary)]" />
          <div className="mt-2 h-4 w-20 rounded bg-[var(--bg-tertiary)]" />
        </div>
      </Card>
    )
  }

  const trendColor =
    trend === 'up'
      ? 'text-[var(--color-success)]'
      : trend === 'down'
        ? 'text-[var(--color-danger)]'
        : 'text-[var(--text-muted)]'

  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'

  return (
    <Card hover>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--text-muted)]">{title}</p>
        {icon && (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${iconColor}15` }}
          >
            <span style={{ color: iconColor }}>{icon}</span>
          </div>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-[var(--text-primary)]">
        {value}
      </p>
      {change !== undefined && (
        <div className="mt-2 flex items-center gap-1">
          <span className={`text-sm font-medium ${trendColor}`}>
            {trendIcon} {Math.abs(change).toFixed(1)}%
          </span>
          <span className="text-sm text-[var(--text-muted)]">
            {changeLabel}
          </span>
        </div>
      )}
    </Card>
  )
}

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
  className?: string
  loading?: boolean
}

export function ChartCard({
  title,
  subtitle,
  children,
  action,
  className = '',
  loading = false,
}: ChartCardProps) {
  if (loading) {
    return (
      <Card padding="lg" className={className}>
        <div className="animate-pulse">
          <div className="flex items-start justify-between">
            <div>
              <div className="h-5 w-32 rounded bg-[var(--bg-tertiary)]" />
              <div className="mt-2 h-4 w-48 rounded bg-[var(--bg-tertiary)]" />
            </div>
            <div className="h-8 w-24 rounded bg-[var(--bg-tertiary)]" />
          </div>
          <div className="mt-6 h-64 rounded-lg bg-[var(--bg-tertiary)]" />
        </div>
      </Card>
    )
  }

  return (
    <Card padding="lg" className={className}>
      <CardHeader title={title} subtitle={subtitle} action={action} />
      <CardContent>{children}</CardContent>
    </Card>
  )
}
