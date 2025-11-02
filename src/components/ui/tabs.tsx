"use client";

import React, { useState } from "react";

// =====================
// Tabs Root
// =====================
function Tabs({
  defaultValue,
  onValueChange,
  children,
  className,
}: {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(defaultValue || "");
  
  const handleChange = (value: string) => {
    setActive(value);
    onValueChange?.(value);
  };

  // Provide active value to children via props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child as React.ReactElement<any>, { active, onChange: handleChange });
  });

  return (
    <div className={`flex flex-col gap-2 ${className || ""}`}>
      {childrenWithProps}
    </div>
  );
}

// =====================
// Tabs List
// =====================
function TabsList({
  children,
  className,
  active,
  onChange,
}: {
  children: React.ReactNode;
  className?: string;
  active?: string;
  onChange?: (value: string) => void;
}) {
  // Pass down active & onChange to TabTrigger automatically
  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child as React.ReactElement<any>, { active, onChange });
  });

  return (
    <div
      className={`bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] ${className || ""
        }`}
    >
      {childrenWithProps}
    </div>
  );
}

// =====================
// Tabs Trigger
// =====================
function TabsTrigger({
  value,
  children,
  active,
  onChange,
  className,
}: {
  value: string;
  children: React.ReactNode;
  active?: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  const isActive = active === value;

  return (
    <button
      onClick={() => onChange?.(value)}
      className={`inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 
        ${isActive ? "bg-card text-foreground dark:text-foreground" : "text-muted-foreground dark:text-muted-foreground"}
        ${className || ""}`}
    >
      {children}
    </button>
  );
}

// =====================
// Tabs Content
// =====================
function TabsContent({
  value,
  active,
  children,
  className,
}: {
  value: string;
  active?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (active !== value) return null;

  return (
    <div className={`flex-1 outline-none ${className || ""}`}>
      {children}
    </div>
  );
}

// =====================
// Exports
// =====================
export { Tabs, TabsList, TabsTrigger, TabsContent };
