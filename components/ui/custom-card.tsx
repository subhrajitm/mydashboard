import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CustomCardProps {
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
}

export function CustomCard({
  title,
  icon,
  children,
  className,
  headerClassName,
  contentClassName,
}: CustomCardProps) {
  return (
    <Card 
      className={cn(
        "bg-gradient-to-br from-[#FF4F59]/5 to-[#FFAD28]/5 border border-[#FF4F59]/20 shadow-sm hover:border-[#FF4F59]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-md",
        className
      )}
    >
      {title && (
        <CardHeader className={cn("border-b border-[#FF4F59]/20", headerClassName)}>
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("p-6", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
} 