import { ListParticipants } from '@/modules/admin'
import { HeaderSection } from '@/modules/core'

export default function Page() {
  return (
    <>
      <HeaderSection
        title="Participantes"
        subtitle="Lista de participantes incluyendo ponentes, ponentes magistrales y asistentes"
        isButtonVisible
        labelButton="Agregar Participante"
        href="/admin/participantes/nuevo"
      />
      <section className="py-6">
        <ListParticipants />
      </section>
    </>
  )
}
