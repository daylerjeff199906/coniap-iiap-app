'use client'
import { ListProgramsSection } from '@/components'
import { HeaderSection } from '@/modules/core'

export default function Page() {
  return (
    <main className='flex flex-col gap-5'>
      <HeaderSection
        title="Lista de programaciones"
        subtitle="Lista de programaciones registradas en la base de datos"
        isButtonVisible
        href="/admin/programas/nuevo"
        labelButton="Añadir programación"
      />
      <ListProgramsSection />
    </main>
  )
}
