"use client";

import * as React from "react";

export  function Input({
  type = "text",
  placeholder,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`flex h-9 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-1 text-base text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-400 ${className}`}
      {...props}
    />
  );
}
