"use client";

import * as React from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    //ProgressProps inherits all standard HTML <div> props — like id, style, onClick, etc.
  value?: number;
}

export default function Progress({ className = "", value = 0, ...props }: ProgressProps) {
  return (
    <div
      className={`relative h-2 w-full overflow-hidden rounded-full bg-blue-500/20 ${className}`}
      {...props
/*This means:
“Take all the remaining props that were not explicitly destructured, and pass them to the <div> element. */
}
      
    >
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
