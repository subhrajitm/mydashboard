import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Inter } from "next/font/google"
import { Chatbot } from "@/components/chatbot"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Warrity Dashboard',
  description: 'A modern financial dashboard for managing warranty metrics and invoices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 overflow-y-auto bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl">
                <div className="h-full p-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
