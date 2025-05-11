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
        "custom-card",
        className
      )}
    >
      {title && (
        <CardHeader className={cn("custom-card-header", headerClassName)}>
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