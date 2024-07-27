import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import 'st/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Texh Cell Xpress',
  description: 'Cell Phone Store Manager',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html >
  )
}
