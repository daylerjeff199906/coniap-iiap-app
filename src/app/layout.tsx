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
        url: 'https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/logos%2Fmeta-coniap.webp?alt=media&token=1f0e7ef1-3ab3-479a-8e0e-dad09842e857',
        width: 430,
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
