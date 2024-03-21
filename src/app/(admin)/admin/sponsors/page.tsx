'use client'
import { useState } from 'react'
import { FrmAddSponsor, ListSponsorsSections } from '@/components'
import { Button } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'

export default function SponsorPage() {
  const [openAddSponsor, setOpenAddSponsor] = useState(false)
  const searchParams = useSearchParams()
  const isEdit = searchParams.get('edit') !== null

  return (
    <>
      {!isEdit && (
        <section className="flex gap-4 justify-between items-center">
          <h1 className="text-2xl font-bold">Colaboradores</h1>
          <Button
            color="primary"
            onPress={() => setOpenAddSponsor(true)}
            size="sm"
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
        <section className="py-6">
          <ListSponsorsSections />
        </section>
      )}
      <FrmAddSponsor
        isOpen={openAddSponsor}
        onOpenChange={setOpenAddSponsor}
      />
    </>
  )
}
