import { ListRooms } from '@/modules/admin'
import { HeaderSection } from '@/modules/core'

export default function page() {
  return (
    <main className="flex flex-col gap-3">
      <HeaderSection
        title="Salas virtuales"
        subtitle="Administra las salas virtuales de tu evento"
        href="/admin/eventos/salas/nuevo"
        labelButton="Añadir sala"
        isButtonVisible
      />
      <section className="section-admin">
        <ListRooms />
      </section>
    </main>
  )
}
