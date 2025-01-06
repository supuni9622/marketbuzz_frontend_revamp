'use client'

import { Inter } from "next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import { usePathname } from 'next/navigation'
import AuthProvider from "@/providers/AuthProvider"
import { MainLayout } from "@/components/layout/MainLayout"
import "./globals.css"
import "react-toastify/dist/ReactToastify.css"

// Initialize Google Tag Manager
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GTM_ID) {
  const TagManager = require('react-gtm-module').default
  TagManager.initialize({
    gtmId: process.env.NEXT_PUBLIC_GTM_ID
  })
}

const inter = Inter({ subsets: ["latin"] })

// Create a client
const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isBasicView = pathname === '/login' || pathname === '/admin/switch'

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {isBasicView ? (
              children
            ) : (
              <MainLayout>
                {children}
              </MainLayout>
            )}
          </AuthProvider>
        </QueryClientProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
