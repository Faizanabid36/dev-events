import * as React from "react"

import { cn } from "@/libs/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-sm text-white/80 transition-colors outline-none placeholder:text-white/20 focus-visible:border-white/20 focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-40 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white/60",
        className
      )}
      {...props}
    />
  )
}

export { Input }
