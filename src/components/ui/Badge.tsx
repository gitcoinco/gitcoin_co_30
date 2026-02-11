interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "active";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  const baseStyles = "items-center font-medium font-mono rounded-full leading-none w-fit";

  const variants = {
    default: "bg-gray-700 text-gray-100",
    success: "bg-teal-500 text-teal-900",
    info: "bg-teal-500 text-teal-900",
    active: "bg-teal-500 text-teal-900",
    warning:
      "bg-system-warning/20 border border-system-warning/30 text-system-warning",
    error: "bg-system-error/20 border-system-error/30 text-system-error",
  };

  const sizes = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span className={`${className} ${baseStyles} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
