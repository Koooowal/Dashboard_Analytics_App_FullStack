type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  className?: string
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

const getColorFromName = (name: string): string => {
  const colors = [
    'bg-[var(--chart-1)]',
    'bg-[var(--chart-2)]',
    'bg-[var(--chart-3)]',
    'bg-[var(--chart-4)]',
    'bg-[var(--chart-5)]',
    'bg-[var(--chart-6)]',
  ]
  const index = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[index % colors.length]
}

export function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md',
  className = '',
}: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
      />
    )
  }

  if (name) {
    return (
      <div
        className={`flex items-center justify-center rounded-full font-medium text-white ${getColorFromName(name)} ${sizeClasses[size]} ${className}`}
      >
        {getInitials(name)}
      </div>
    )
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-[var(--bg-tertiary)] ${sizeClasses[size]} ${className}`}
    >
      <svg
        className="h-1/2 w-1/2 text-[var(--text-muted)]"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  )
}

interface AvatarGroupProps {
  avatars: { src?: string; name?: string }[]
  max?: number
  size?: AvatarSize
  className?: string
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = 'sm',
  className = '',
}: AvatarGroupProps) {
  const displayed = avatars.slice(0, max)
  const remaining = avatars.length - max

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {displayed.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          name={avatar.name}
          size={size}
          className="ring-2 ring-[var(--bg-primary)]"
        />
      ))}
      {remaining > 0 && (
        <div
          className={`flex items-center justify-center rounded-full bg-[var(--bg-tertiary)] font-medium text-[var(--text-secondary)] ring-2 ring-[var(--bg-primary)] ${sizeClasses[size]}`}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}
