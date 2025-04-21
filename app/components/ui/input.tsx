import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl px-3 py-1.5 text-sm ring-offset-white/10 dark:ring-offset-gray-800/10 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 dark:focus-visible:ring-gray-800/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:bg-white/30 dark:hover:bg-gray-800/30 hover:shadow-[0_0_15px_rgba(255,79,89,0.1)] dark:hover:shadow-[0_0_15px_rgba(255,173,40,0.1)] focus:shadow-[0_0_20px_rgba(255,79,89,0.2)] dark:focus:shadow-[0_0_20px_rgba(255,173,40,0.2)]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
