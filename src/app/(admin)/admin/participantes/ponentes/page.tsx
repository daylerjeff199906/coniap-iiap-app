'use client'
import { UpdateSpeaker } from '@/components'
import { ListSpeakersSection } from '@/modules/admin'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  const isEdit = searchParams.get('edit') !== null
  const isView = searchParams.get('view') !== null
  const isEditOrView = isEdit || isView

  return (
    <>
      {!isEditOrView && (
        <section className="flex gap-4 justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Ponentes</h1>
            <h3 className="text-xs">Lista de ponentes registrados</h3>
          </div>
          <Button
            color="primary"
            as={Link}
            href="/admin/participantes/ponentes/nuevo"
            size="sm"
          >
            Añadir ponente
          </Button>
        </section>
      )}
      {isEdit ? (
        <>
          <UpdateSpeaker
            id={searchParams.get('edit') ?? ''}
            isEdit
          />
        </>
      ) : isView ? (
        <></>
      ) : (
        <section className="py-6">
          <ListSpeakersSection />
        </section>
      )}
    </>
  )
}
