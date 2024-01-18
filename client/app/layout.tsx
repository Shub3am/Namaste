import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Namaste!',
  description: 'India\'s Own Privacy-Centric Chat App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400`}>{children}</body>
    </html>
  )
}
