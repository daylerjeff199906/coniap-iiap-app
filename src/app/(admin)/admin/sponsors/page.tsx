'use client'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function SponsorPage() {
  const searchParams = useSearchParams()
  const isEdit = searchParams.get('edit') !== null

  return (
    <>
      {!isEdit && (
        <section className="flex gap-4 justify-between items-center">
          <h1 className="text-2xl font-bold">Colaboradores</h1>
          <Button
            color="primary"
            // as={Link}
            // href="/admin/programas/nuevo"
          >
            Añadir colaborador
          </Button>
        </section>
      )}
      {isEdit ? (
        <>
          {/* <UpdateEvento
            id={searchParams.get('edit') ?? ''}
            isEdit={isEdit}
          /> */}
        </>
      ) : (
        <section className="py-6">{/* <ListProgramsSection /> */}</section>
      )}
    </>
  )
}
