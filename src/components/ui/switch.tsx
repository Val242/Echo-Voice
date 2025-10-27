"use client";

import * as React from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string; // optional value prop
}



export default function Switch({ className = "", value, checked, ...props }: SwitchProps) {
  return (
    <label className={`relative inline-flex items-center w-14 h-8 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        value={value} // <-- our custom value prop
        {...props}
      />
      <div className="w-14 h-8 bg-gray-200 peer-checked:bg-sky-500 rounded-full transition-colors"></div>
      <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow" />
    </label>
  );
}
