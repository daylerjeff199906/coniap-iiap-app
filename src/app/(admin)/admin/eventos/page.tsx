'use client'
import { ListEventsSection } from '@/modules/admin/events'
import { HeaderSection } from '@/modules/core'

export default function Page() {
  return (
    <>
      <HeaderSection
        title="Eventos"
        subtitle="Administra los eventos de la plataforma"
        isButtonVisible
        labelButton="Agregar evento"
        href="/admin/eventos/nuevo"
      />
      <section className="py-6">
        <ListEventsSection />
      </section>
    </>
  )
}
