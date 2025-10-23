import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  // Define variant styles
  const variantStyles: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100 active:bg-gray-200",
  };

  // Define size styles
  const sizeStyles: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
