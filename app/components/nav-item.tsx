import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface NavItemProps {
  item: {
    id: string
    label: string
    href: string
    icon: LucideIcon
    badge?: number
    showBadgeInCompact?: boolean
  }
  isExpanded: boolean
  pathname: string
}

const NavItem = memo(({ item, isExpanded, pathname }: NavItemProps) => {
  return (
    <Button
      variant={pathname === item.href ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start gap-3 transition-all duration-200 hover:bg-white/10 dark:hover:bg-gray-800/10",
        isExpanded ? "px-4" : "px-2"
      )}
      role="menuitem"
      aria-current={pathname === item.href ? "page" : undefined}
    >
      <div className="relative">
        <item.icon className="h-5 w-5" aria-hidden="true" />
        {item.badge && (isExpanded || item.showBadgeInCompact) && (
          <Badge 
            variant="secondary" 
            className={cn(
              "absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]",
              !isExpanded && "translate-x-1/2"
            )}
          >
            {item.badge}
          </Badge>
        )}
      </div>
      {isExpanded && <span>{item.label}</span>}
    </Button>
  )
})

NavItem.displayName = "NavItem"

export default NavItem 