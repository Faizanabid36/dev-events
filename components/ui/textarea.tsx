import * as React from "react"

import { cn } from "@/libs/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full min-h-20 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-sm text-white/80 transition-colors outline-none placeholder:text-white/20 focus-visible:border-white/20 focus-visible:ring-0 disabled:opacity-40 disabled:pointer-events-none resize-none",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
