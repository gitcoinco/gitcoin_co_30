import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-25 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-4 py-2.5 rounded-lg border bg-gray-950
            text-gray-25 placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-gray-25 focus:border-transparent
            disabled:bg-gray-800 disabled:cursor-not-allowed
            resize-y min-h-[120px]
            transition-all duration-200
            ${error ? "border-system-error" : "border-gray-800"}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-system-error">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
