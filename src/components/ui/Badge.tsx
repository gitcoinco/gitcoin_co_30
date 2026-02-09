interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "active";
  size?: "sm" | "md";
}

export default function Badge({
  children,
  variant = "default",
  size = "md",
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-medium rounded-full border";

  const variants = {
    default: "bg-gray-800 border-gray-800 text-gray-400",
    success: "bg-gray-25/10 border-gray-25/30 text-gray-25",
    warning:
      "bg-system-warning/20 border-system-warning/30 text-system-warning",
    error: "bg-system-error/20 border-system-error/30 text-system-error",
    info: "bg-gray-25/10 border-gray-25/30 text-gray-25",
    active: "bg-gray-25 border-gray-25 text-gray-900",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
