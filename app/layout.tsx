import type { Metadata } from 'next'
import './globals.css'
import DashboardLayout from './components/dashboard-layout'

export const metadata: Metadata = {
  title: 'Financial Dashboard',
  description: 'A modern financial dashboard for warranty and invoice management',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  )
}
