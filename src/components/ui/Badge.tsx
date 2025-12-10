import type { ReactNode } from 'react'

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  icon?: ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
  primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  success: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  danger: 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]',
  info: 'bg-[var(--color-info)]/10 text-[var(--color-info)]',
}

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-[var(--text-muted)]',
  primary: 'bg-[var(--color-primary)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  danger: 'bg-[var(--color-danger)]',
  info: 'bg-[var(--color-info)]',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {dot && (
        <span className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'away' | 'busy'
  showLabel?: boolean
  className?: string
}

const statusConfig: Record<
  StatusBadgeProps['status'],
  { color: string; label: string }
> = {
  online: { color: 'bg-[var(--color-success)]', label: 'Online' },
  offline: { color: 'bg-[var(--text-muted)]', label: 'Offline' },
  away: { color: 'bg-[var(--color-warning)]', label: 'Away' },
  busy: { color: 'bg-[var(--color-danger)]', label: 'Busy' },
}

export function StatusBadge({
  status,
  showLabel = false,
  className = '',
}: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className={`h-2 w-2 rounded-full ${config.color}`} />
      {showLabel && (
        <span className="text-xs text-[var(--text-muted)]">{config.label}</span>
      )}
    </span>
  )
}

interface TrendBadgeProps {
  value: number
  showIcon?: boolean
  className?: string
}

export function TrendBadge({
  value,
  showIcon = true,
  className = '',
}: TrendBadgeProps) {
  const isPositive = value >= 0
  const variant = isPositive ? 'success' : 'danger'
  const icon = isPositive ? '↑' : '↓'

  return (
    <Badge variant={variant} size="sm" className={className}>
      {showIcon && <span>{icon}</span>}
      {Math.abs(value).toFixed(1)}%
    </Badge>
  )
}
