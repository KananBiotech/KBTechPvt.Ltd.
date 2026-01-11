import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Kanan Biotech Pvt. Ltd - Aquaculture Solutions",
  description: "Leading provider of fish health solutions, feed management, and aquaculture products for farmers.",
}

export const viewport = {
  themeColor: "#0369a1",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
