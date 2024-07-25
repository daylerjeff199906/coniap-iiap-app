'use client'
import { Footer, NavBar } from '@/modules/core'
import Image from 'next/image'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="relative">
        <main>{children}</main>
        <article className="fixed z-50 bottom-0 right-0 h-full ">
          <section className="flex flex-col gap-2 items-center justify-center relative h-full">
            <Image
              src="/logo_coniap.gif"
              alt="logo"
              width={300}
              height={150}
              className="absolute left-0 z-40 h-28 w-full object-cover"
            />
            <Link
              href="/inscripcioness"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
              className="text-white lg:text-lg font-medium bg-danger-500 rounded-r-lg p-4 px-3 mt-48"
            >
              ¡ Inscribete !
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
