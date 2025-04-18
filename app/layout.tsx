import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import { Inter } from "next/font/google"
import { Chatbot } from "@/components/chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Financial Dashboard',
  description: 'A modern financial dashboard for managing warranty metrics and invoices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            {/* Enhanced glassy background effect */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
              {/* Base gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-gray-900/30" />
              
              {/* Animated diagonal patterns */}
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#FF4F59/8_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern" />
              <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,#FFAD28/8_50%,transparent_52%)] bg-[length:200px_200px] animate-pattern" style={{ animationDelay: '1s' }} />
              
              {/* Subtle noise texture */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')] opacity-20" />
              
              {/* Enhanced glowing highlights */}
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#FF4F59]/15 to-transparent blur-3xl" />
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#FFAD28]/15 to-transparent blur-3xl" />
              
              {/* Reflective edges */}
              <div className="absolute inset-0 border border-white/30 rounded-3xl" />
            </div>

            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 pl-[288px] pr-8 pt-8 pb-8">
                <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg rounded-3xl border border-white/30 p-8 shadow-lg shadow-black/5 h-full">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
        <Chatbot />
      </body>
    </html>
  )
}
