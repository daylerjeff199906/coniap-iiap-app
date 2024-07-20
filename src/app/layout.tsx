import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import 'filepond/dist/filepond.min.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CONIAP | Congreso Internacional de la Amazonía Peruana',
  icons: 'favicon.ico',
  description:
    'III Congreso Internacional sobre Amazonía Peruana realizado por el Instituto de Investigaciones de la Amazonía Peruana',
  openGraph: {
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/logos%2Flogo_coniap.webp?alt=media&token=a173778f-a7cf-4ca0-b3c9-24269c571889',
        width: 720,
        height: 430,
        alt: 'CONIAP | Congreso Internacional sobre Amazonía Peruana',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
