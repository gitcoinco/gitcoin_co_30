import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || props.name

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-4 py-2.5 rounded-lg border bg-white
            text-text-primary placeholder:text-text-secondary/50
            focus:outline-none focus:ring-2 focus:ring-gitcoin-green focus:border-transparent
            disabled:bg-lichenpunk-warmGray disabled:cursor-not-allowed
            resize-y min-h-[120px]
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

Textarea.displayName = 'Textarea'

export default Textarea
