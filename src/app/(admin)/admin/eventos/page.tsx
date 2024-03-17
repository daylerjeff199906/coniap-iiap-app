'use client'
import { ListEventsSection } from '@/components'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { UpdateEvento } from './updateEvento'

export default function Page() {
  const searchParams = useSearchParams()
  const isEdit = searchParams.get('edit') !== null
  return (
    <>
      <section className="flex gap-4 justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isEdit ? 'Editar evento' : 'Eventos'}
        </h1>
        {!isEdit && (
          <Button
            color="primary"
            as={Link}
            href="/admin/eventos/nuevo"
          >
            Añadir evento
          </Button>
        )}
      </section>
      {isEdit ? (
        <>
          <UpdateEvento />
        </>
      ) : (
        <section className="py-6">
          <ListEventsSection />
        </section>
      )}
    </>
  )
}
