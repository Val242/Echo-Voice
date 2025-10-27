import * as React from "react";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors duration-200 select-none";

  const variants: Record<BadgeVariant, string> = {//Construct a type with a set of properties K of type T 
    default: "bg-sky-600 text-white border-transparent hover:bg-sky-700",
    secondary:
      "bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-gray-200 border-transparent hover:bg-gray-200 dark:hover:bg-slate-700",
    destructive:
      "bg-red-600 text-white border-transparent hover:bg-red-700",
    outline:
      "border border-gray-300 text-gray-800 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
