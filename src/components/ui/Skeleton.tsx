interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

const roundedClasses = {
  none: '',
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

export function Skeleton({
  className = '',
  width,
  height,
  rounded = 'md',
}: SkeletonProps) {
  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={`animate-pulse bg-[var(--bg-tertiary)] ${roundedClasses[rounded]} ${className}`}
      style={style}
    />
  )
}

export function SkeletonText({
  lines = 3,
  className = '',
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          width={i === lines - 1 ? '60%' : '100%'}
          rounded="sm"
        />
      ))}
    </div>
  )
}

export function SkeletonAvatar({
  size = 'md',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }

  return (
    <Skeleton rounded="full" className={`${sizeClasses[size]} ${className}`} />
  )
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 ${className}`}
    >
      <div className="flex items-center justify-between">
        <Skeleton height={16} width={100} />
        <Skeleton height={40} width={40} rounded="lg" />
      </div>
      <Skeleton height={32} width={120} className="mt-3" />
      <Skeleton height={16} width={80} className="mt-2" />
    </div>
  )
}

export function SkeletonChart({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-6 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <Skeleton height={20} width={150} />
          <Skeleton height={16} width={200} className="mt-2" />
        </div>
        <Skeleton height={32} width={100} rounded="lg" />
      </div>
      <Skeleton height={256} className="mt-6" rounded="lg" />
    </div>
  )
}

export function SkeletonTable({
  rows = 5,
  cols = 4,
  className = '',
}: {
  rows?: number
  cols?: number
  className?: string
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} height={16} className="flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              height={40}
              className="flex-1"
              rounded="lg"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonList({
  items = 5,
  className = '',
}: {
  items?: number
  className?: string
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <SkeletonAvatar size="sm" />
          <div className="flex-1 space-y-1.5">
            <Skeleton height={14} width="70%" />
            <Skeleton height={12} width="40%" />
          </div>
          <Skeleton height={20} width={60} rounded="full" />
        </div>
      ))}
    </div>
  )
}
