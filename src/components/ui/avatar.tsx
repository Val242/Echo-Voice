"use client";

import * as React from "react";

/**
 * Avatar UI Component (Tailwind-only)
 * Includes Avatar, AvatarImage, and AvatarFallback
 */

export function Avatar({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`relative flex size-10 shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-800 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarImage({
  src,
  alt,
  className = "",
  onError,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [error, setError] = React.useState(false);

  return !error ? (
    <img
      src={src}
      alt={alt || "Avatar"}
      onError={(e) => {
        setError(true);
        onError?.(e);
      }}
      className={`h-full w-full object-cover ${className}`}
      {...props}
    />
  ) : null;
}

export function AvatarFallback({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex size-full items-center justify-center rounded-full bg-gray-300 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium select-none ${className}`}
      {...props}
    >
      {children || "?"}
    </div>
  );
}
