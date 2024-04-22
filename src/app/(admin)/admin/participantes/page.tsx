import { ListParticipants } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <section className="flex gap-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <section className="py-6">
          <ListParticipants />
        </section>
      </section>
    </>
  )
}
