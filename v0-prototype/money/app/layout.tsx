import type React from "react"
import type { Metadata } from "next"
import { Poppins, PT_Sans } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-pt-sans",
})

export const metadata: Metadata = {
  title: "MoolahVault - Family Finance",
  description: "Secure family finance management",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${ptSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
