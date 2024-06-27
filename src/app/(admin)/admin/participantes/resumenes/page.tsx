'use client'
import { ListSummaries } from '@/modules/admin'
import { HeaderSection } from '@/modules/core'

export default function Page() {
  return (
    <main className="flex flex-col gap-3">
      <HeaderSection
        title="Resúmenes"
        subtitle="Lista de resúmenes subidos por los participantes (Ponentes, Ponentes magistrales)"
        isButtonVisible
        labelButton="Añadir resumen"
        href="/admin/participantes/resumenes/nuevo"
      />
      <ListSummaries />
    </main>
  )
}
