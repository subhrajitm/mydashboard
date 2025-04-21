import { Bell, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/data/hooks/useNotifications"
import { formatDate } from "@/data/utils/formatters"
import { cn } from "@/lib/utils"

export default function Notifications() {
  const { notifications, loading, error, markAsRead, markAllAsRead } = useNotifications()

  if (loading) {
    return <div className="p-4">Loading notifications...</div>
  }

  if (error) {
    return <div className="p-4 text-destructive">Error: {error}</div>
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
        <Bell className="h-8 w-8" />
        <p className="mt-2">No notifications</p>
      </div>
    )
  }

  return (
    <div className="w-80">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-medium">Notifications</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => markAllAsRead()}
          disabled={notifications.every((n) => n.read)}
        >
          Mark all as read
        </Button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "flex items-start gap-3 border-b p-4",
              !notification.read && "bg-muted/50"
            )}
          >
            <div className="flex-1">
              <p className="font-medium">{notification.title}</p>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatDate(notification.createdAt)}
              </p>
            </div>
            {!notification.read && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => markAsRead(notification.id)}
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 