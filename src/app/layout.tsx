import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RIA Compliance System',
  description: 'Compliance management system for RIAs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
