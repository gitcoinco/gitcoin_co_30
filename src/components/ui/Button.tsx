import { ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', href, external, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gitcoin-green disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-gitcoin-green text-text-primary hover:bg-gitcoin-softCyan',
      secondary: 'border-2 border-lichenpunk-lichen text-lichenpunk-lichen hover:bg-lichenpunk-lichen hover:text-white',
      ghost: 'text-text-secondary hover:text-text-primary hover:bg-lichenpunk-warmGray/50',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
