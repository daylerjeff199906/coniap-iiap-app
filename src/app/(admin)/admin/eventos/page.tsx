'use client'
import { ListEventsSection } from '@/components'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <section className="flex gap-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Eventos</h1>
        <Button
          color="primary"
          as={Link}
          href="/admin/eventos/nuevo"
        >
          Añadir evento
        </Button>
      </section>
      <section>
        <ListEventsSection />
      </section>
    </>
  )
}
