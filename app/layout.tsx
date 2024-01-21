import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Particles from "../components/Particles";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ari',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          {children}
          <video className="background-video" autoPlay loop muted>
            <source src="/train.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Particles className="absolute inset-0 z-[-1] animate-fade-in" quantity={100} />
        </div>
      </body>
    </html>
  )
}
