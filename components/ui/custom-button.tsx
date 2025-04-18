import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface CustomButtonProps {
  children: ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  icon?: ReactNode
  iconPosition?: "left" | "right"
  onClick?: () => void
  disabled?: boolean
}

export function CustomButton({
  children,
  variant = "default",
  size = "default",
  className,
  icon,
  iconPosition = "left",
  onClick,
  disabled,
}: CustomButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "transition-all duration-300 hover:scale-[1.02]",
        variant === "default" && "bg-gradient-to-r from-[#FF4F59] to-[#FFAD28] text-white hover:opacity-90",
        className
      )}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </Button>
  )
} 