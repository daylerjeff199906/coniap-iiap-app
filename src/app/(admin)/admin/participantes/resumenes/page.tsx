'use client'
import { ListSummaries } from '@/modules/admin'
import { Button } from '@nextui-org/react'

export default function Page() {
  return (
    <>
      <div className="flex gap-2 items-center justify-between pb-4">
        <h1 className="text-2xl font-bold">Resúmenes</h1>
        <Button
          color="primary"
          size="sm"
        >
          Añadir resumen
        </Button>
      </div>
      <ListSummaries />
    </>
  )
}
