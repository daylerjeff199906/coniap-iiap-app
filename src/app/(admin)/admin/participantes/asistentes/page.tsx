'use client'
import { UpdateSpeaker } from '@/components'
import { ListAssistants } from '@/modules/admin'
// import {ListSpe}
// import { ListProgramsSection } from '@/components'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
// import { UpdateEvento } from './updateEvento'

export default function Page() {
  const searchParams = useSearchParams()
  const isEdit = searchParams.get('edit') !== null
  const isView = searchParams.get('view') !== null
  const isEditOrView = isEdit || isView

  return (
    <>
      {!isEditOrView && (
        <section className="flex gap-4 justify-between items-center">
          <h1 className="text-2xl font-bold">Asistentes</h1>
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
          <ListAssistants />
        </section>
      )}
    </>
  )
}
