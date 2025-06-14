import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#FF4F59] text-white shadow-sm hover:bg-[#FF4F59]/90 hover:shadow-[0_0_20px_rgba(255,79,89,0.3)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(0,0,0,0.05)]",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/10 dark:border-gray-700/10 shadow-sm hover:bg-white/30 dark:hover:bg-gray-800/30 hover:shadow-[0_0_20px_rgba(255,79,89,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,173,40,0.1)]",
      },
      size: {
        default: "h-9 px-3 py-1.5",
        sm: "h-7 rounded-md px-2 text-xs",
        lg: "h-10 rounded-md px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
