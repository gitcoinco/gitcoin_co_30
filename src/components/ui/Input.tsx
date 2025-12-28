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
            className="block text-sm font-medium text-light-white mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-2.5 rounded-lg border bg-charcoal
            text-light-white placeholder:text-muted-gray
            focus:outline-none focus:ring-2 focus:ring-light-white focus:border-transparent
            disabled:bg-dark-gray disabled:cursor-not-allowed
            transition-all duration-200
            ${error ? 'border-system-error' : 'border-dark-gray'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-system-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-muted-gray">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
