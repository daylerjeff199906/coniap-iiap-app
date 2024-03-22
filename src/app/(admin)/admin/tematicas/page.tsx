'use client'
import { useEffect, useState } from 'react'
import { FrmAddSponsor, ListSponsorsSections } from '@/components'
import { Button } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { ListTopicsSections } from '@/components/sections/admin/tematicas'

export default function Page() {
  const [openAddSponsor, setOpenAddSponsor] = useState(false)
  const [loadData, setLoadData] = useState(false)

  const searchParams = useSearchParams()
  const isEdit = searchParams.get('edit') !== null

  useEffect(() => {
    if (isEdit) {
      setOpenAddSponsor(true)
    }
  }, [isEdit])

  return (
    <>
      <section className="flex gap-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Temáticas</h1>
        <Button
          color="primary"
          onPress={() => setOpenAddSponsor(true)}
          size="sm"
        >
          Añadir tema
        </Button>
      </section>
      <section className="py-6">
        <ListTopicsSections loadData={loadData} />
      </section>
      {/* <FrmAddSponsor
        isOpen={openAddSponsor}
        onOpenChange={setOpenAddSponsor}
        id={searchParams.get('edit')}
        loadData={setLoadData}
      /> */}
    </>
  )
}
