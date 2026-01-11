interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'active'
  size?: 'sm' | 'md'
}

export default function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full border'

  const variants = {
    default: 'bg-dark-gray border-dark-gray text-gray-400',
    success: 'bg-light-white/10 border-light-white/30 text-light-white',
    warning: 'bg-system-warning/20 border-system-warning/30 text-system-warning',
    error: 'bg-system-error/20 border-system-error/30 text-system-error',
    info: 'bg-light-white/10 border-light-white/30 text-light-white',
    active: 'bg-light-white border-light-white text-void-black',
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
