"use client";
import React from "react";
import { useTheme } from "../ThemeProvider"; // import your ThemeProvider hook

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const { theme } = useTheme(); // get the current theme ("light" or "dark")

  // Define base styles for each variant, adapted for light/dark mode
  const variantStyles: Record<string, string> = {
    primary:
      theme === "dark"
        ? "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
        : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",

    secondary:
      theme === "dark"
        ? "bg-gray-700 text-gray-100 hover:bg-gray-600 active:bg-gray-500"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",

    danger:
      theme === "dark"
        ? "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
        : "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",

    ghost:
      theme === "dark"
        ? "bg-transparent text-gray-100 hover:bg-gray-800 active:bg-gray-700"
        : "bg-transparent text-gray-800 hover:bg-gray-100 active:bg-gray-200",

    outline:
      theme === "dark"
        ? "dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
        : "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
  };

  // Define size styles
  const sizeStyles: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${variantStyles[variant]} ${sizeStyles[size]} ${className} flex items-center justify-center gap-2`}
      {...props}
    >
      {children}
    </button>
  );
};
