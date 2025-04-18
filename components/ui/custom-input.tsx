import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  className?: string
}

export function CustomInput({ icon, className, ...props }: CustomInputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}
      <Input
        className={cn(
          "border border-[#FF4F59]/20 transition-all duration-300 focus:border-[#FF4F59]/40 focus:ring-1 focus:ring-[#FF4F59]/20",
          icon ? "pl-10" : "",
          className
        )}
        {...props}
      />
    </div>
  )
}

export function SearchInput({ className, ...props }: CustomInputProps) {
  return (
    <CustomInput
      icon={<Search className="h-4 w-4" />}
      placeholder="Search..."
      className={className}
      {...props}
    />
  )
} 