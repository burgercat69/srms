import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'SRMS Student Cards - CS Honor Students',
  description: 'Interactive student card reveal system for SRMS CET CS students with dark humor twist',
  keywords: 'SRMS, CET, CS, students, cards, interactive, dark humor',
  authors: [{ name: 'TENKEFUMA (Yash)' }],
  creator: 'TENKEFUMA',
  openGraph: {
    title: 'SRMS Student Cards',
    description: 'Interactive student card reveal system with dark humor',
    type: 'website',
    url: 'https://burgercat69.github.io/srms',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SRMS Student Cards',
    description: 'Interactive student card reveal system with dark humor',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
