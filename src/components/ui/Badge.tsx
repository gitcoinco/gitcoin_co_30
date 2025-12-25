interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'active'
  size?: 'sm' | 'md'
}

export default function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full'

  const variants = {
    default: 'bg-lichenpunk-warmGray text-lichenpunk-lichen',
    success: 'bg-gitcoin-green/20 text-lichenpunk-lichen',
    warning: 'bg-system-warning/20 text-system-warning',
    error: 'bg-system-error/20 text-system-error',
    info: 'bg-system-info/20 text-system-info',
    active: 'bg-gitcoin-green text-text-primary',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  )
}
