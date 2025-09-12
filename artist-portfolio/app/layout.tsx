import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import WalletContextProvider from "@/app/components/wallet-context-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletContextProvider>
          {children}
          <Toaster />
        </WalletContextProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
