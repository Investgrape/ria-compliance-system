import './globals.css'

export const metadata = {
  title: 'RIA Compliance System',
  description: 'Modern compliance management for RIAs',
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