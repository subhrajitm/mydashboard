import { Suspense, lazy } from "react"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Skeleton } from "@/components/ui/skeleton"

// Lazy load components
const Header = lazy(() => import("@/components/header"))
const Notifications = lazy(() => import("@/components/notifications"))
const UserMenu = lazy(() => import("@/components/user-menu"))

// Loading components
const HeaderLoader = () => (
  <div className="h-16 border-b">
    <div className="container flex h-full items-center justify-between">
      <Skeleton className="h-8 w-32" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  </div>
)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Suspense fallback={<HeaderLoader />}>
            <Header />
          </Suspense>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
        <Suspense>
          <Notifications />
        </Suspense>
        <Suspense>
          <UserMenu />
        </Suspense>
      </div>
    </ThemeProvider>
  )
} 