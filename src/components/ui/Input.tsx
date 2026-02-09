import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-25 mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-2.5 rounded-lg border bg-gray-950
            text-gray-25 placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-gray-25 focus:border-transparent
            disabled:bg-gray-800 disabled:cursor-not-allowed
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

Input.displayName = "Input";

export default Input;
