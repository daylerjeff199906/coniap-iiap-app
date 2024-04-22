import { ListParticipants } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold">Participantes</h1>
      <h3 className="text-xs">
        Lista de participantes incluyendo ponentes, ponentes magistrales y
        asistentes
      </h3>
      <section className="py-6">
        <ListParticipants />
      </section>
    </>
  )
}
