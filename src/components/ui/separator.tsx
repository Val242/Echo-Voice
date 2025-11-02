"use client";

import React from "react";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}) {
  const baseClasses =
    "bg-border shrink-0 " +
    (orientation === "horizontal"
      ? "h-px w-full"
      : "h-full w-px");

  return (
    <div
      data-slot="separator-root"
      aria-hidden={decorative}
      className={`${baseClasses} ${className || ""}`}
      {...props}
    />
  );
}

export { Separator };
