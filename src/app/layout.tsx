import './globals.css'
import type { Metadata } from 'next'
import { Darker_Grotesque } from 'next/font/google'

const dGrotesk = Darker_Grotesque({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rick & Morty memory game',
  description: 'React+Typescrit+NextJs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dGrotesk.className}>{children}</body>
    </html>
  )
}
