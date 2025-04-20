import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/data/hooks/useNotifications"
import { cn } from "@/lib/utils"

export default function Header() {
  const { unreadCount } = useNotifications()

  return (
    <header className="h-16 border-b">
      <div className="container flex h-full items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => {
            // TODO: Implement mobile menu toggle
          }}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => {
              // TODO: Implement notifications toggle
            }}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </Button>
          {/* UserMenu will be rendered as a portal */}
        </div>
      </div>
    </header>
  )
} 