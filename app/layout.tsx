import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/context/cart-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingChatbot from "@/components/floating-chatbot"
import { getSupportQuestions } from "@/lib/db/support"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pink Pearls - Apparel Management System",
  description: "Manage your apparel products with ease",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supportQuestions = await getSupportQuestions()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              {children}
              <Footer />
              <FloatingChatbot questions={supportQuestions} />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
