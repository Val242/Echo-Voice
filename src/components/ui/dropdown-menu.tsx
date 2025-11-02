"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

// =====================
// Root
// =====================
function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block">{children}</div>;
}

// =====================
// Trigger
// =====================
function DropdownMenuTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button className={`focus:outline-none ${className || ""}`}>
      {children}
    </button>
  );
}

// =====================
// Content
// =====================
function DropdownMenuContent({
  children,
  side = "bottom",
  className,
}: {
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  const sideClasses =
    side === "top"
      ? "bottom-full mb-2"
      : side === "left"
      ? "right-full mr-2"
      : side === "right"
      ? "left-full ml-2"
      : "top-full mt-2";

  return (
    <div
      className={`absolute z-50 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${sideClasses} animate-in fade-in-0 zoom-in-95 ${className || ""
        }`}
    >
      {children}
    </div>
  );
}

// =====================
// Item
// =====================
function DropdownMenuItem({
  children,
  onClick,
  variant = "default",
  inset,
  disabled,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive";
  inset?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const variantClasses =
    variant === "destructive"
      ? "text-destructive focus:bg-destructive/10"
      : "focus:bg-accent focus:text-accent-foreground";
  const insetClasses = inset ? "pl-8" : "";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative flex w-full select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-left outline-none transition-colors ${variantClasses} ${insetClasses} ${disabled ? "pointer-events-none opacity-50" : ""
        } ${className || ""}`}
    >
      {children}
    </button>
  );
}

// =====================
// Checkbox Item
// =====================
function DropdownMenuCheckboxItem({
  checked,
  children,
  onClick,
  className,
}: {
  checked?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex w-full select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground ${className || ""
        }`}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <CheckIcon className="h-4 w-4" />}
      </span>
      {children}
    </button>
  );
}

// =====================
// Radio Group Context
// =====================
type RadioGroupContextType = {
  value: string;
  onChange: (val: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

// =====================
// Radio Group
// =====================
function DropdownMenuRadioGroup({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (val: string) => void;
  children: React.ReactNode;
}) {
  return (
    <RadioGroupContext.Provider value={{ value, onChange: onValueChange }}>
      <div role="radiogroup" className="flex flex-col">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

// =====================
// Radio Item
// =====================
function DropdownMenuRadioItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(RadioGroupContext);
  if (!context) return null;

  const checked = context.value === value;

  return (
    <button
      onClick={() => context.onChange(value)}
      className={`relative flex w-full select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground ${className || ""
        }`}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <CircleIcon className="h-2 w-2 fill-current" />}
      </span>
      {children}
    </button>
  );
}

// =====================
// Label
// =====================
function DropdownMenuLabel({
  inset,
  children,
  className,
}: {
  inset?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`px-2 py-1.5 text-sm font-medium text-muted-foreground ${inset ? "pl-8" : ""
        } ${className || ""}`}
    >
      {children}
    </div>
  );
}

// =====================
// Separator
// =====================
function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={`bg-border -mx-1 my-1 h-px ${className || ""}`} />;
}

// =====================
// Shortcut
// =====================
function DropdownMenuShortcut({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`ml-auto text-xs tracking-widest text-muted-foreground ${className || ""
        }`}
    >
      {children}
    </span>
  );
}

// =====================
// Submenu
// =====================
function DropdownMenuSub({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <DropdownMenuItem>
        {label}
        <ChevronRightIcon className="ml-auto h-4 w-4" />
      </DropdownMenuItem>
      {open && (
        <div className="absolute left-full top-0 z-50 ml-1 w-40 rounded-md border bg-popover p-1 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}

// =====================
// Exports
// =====================
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
};
