import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-2.5 rounded-lg border bg-white
            text-text-primary placeholder:text-text-secondary/50
            focus:outline-none focus:ring-2 focus:ring-gitcoin-green focus:border-transparent
            disabled:bg-lichenpunk-warmGray disabled:cursor-not-allowed
            ${error ? 'border-system-error' : 'border-lichenpunk-warmGray'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-system-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-text-secondary">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
