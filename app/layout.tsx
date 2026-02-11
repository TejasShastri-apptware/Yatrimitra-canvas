import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Floor Plan Designer',
  description: 'Simple floor plan canvas with drawing tools',
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
