'use client'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <main className="section-home h-screen max-h-[50vh]">
        <section className="flex flex-col justify-center items-center gap-6 h-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Muchas gracias por inscribirte en el evento
          </h1>
          <Button
            as={Link}
            href="/"
            radius="full"
            variant="ghost"
            color="primary"
            size="lg"
          >
            Volver al inicio
          </Button>
        </section>
      </main>
    </>
  )
}
