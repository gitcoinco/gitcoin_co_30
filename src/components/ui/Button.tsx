import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      href,
      external,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "font-mono flex-shrink-0 cursor-pointer inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed";

    const transitionStyle = { transition: "all 400ms ease" };

    const variants = {
      primary: "bg-teal-500 text-gray-900 hover:bg-iris-500",
      secondary:
        "border border-teal-500 text-teal-500 hover:text-iris-500 hover:border-iris-500 bg-gray-900/70 !focus:ring-iris-500 hover:shadow-[0_2px_10px_rgba(161,149,240,0.6)] bg-bottom bg-no-repeat bg-[length:100%_0%] hover:bg-[length:100%_30%] bg-[image:linear-gradient(to_top,rgba(161,149,240,0.7),transparent)]",
      tertiary:
        "border border-gray-600 text-gray-300 hover:border-iris-500 hover:text-iris-500",
      ghost: "text-sm text-teal-500 hover:text-teal-100",
    };

    const sizes = {
      xs: "px-2 py-1 text-xs rounded-lg",
      sm: "px-3 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-xl",
      lg: "px-8 py-4 text-lg rounded-xl",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
            style={transitionStyle}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName} style={transitionStyle}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        style={transitionStyle}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
