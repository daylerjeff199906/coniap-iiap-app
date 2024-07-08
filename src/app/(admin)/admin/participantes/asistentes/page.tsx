import { ListParticipants } from '@/modules/admin'

export default async function Page() {
  // const { searchParams } = props
  // const { query, status } = searchParams

  // const search = query ? String(query) : ''
  // const type = 'participant'
  // const statusPerson = status ? String(status) : ''
  // const statusValue =
  //   statusPerson === 'active'
  //     ? 'TRUE'
  //     : statusPerson === 'inactive'
  //     ? 'FALSE'
  //     : ''

  // const persons: IPerson[] = (await fetchPersons(
  //   search,
  //   type,
  //   undefined,
  //   statusValue
  // )) as IPerson[]

  return (
    <main className="flex flex-col gap-4">
      {/* <HeaderSection
        title="Participantes general (Asistentes no expositor)"
        subtitle="Lista de participantes solo que participan en el congreso como asistentes"
        isButtonVisible
        labelButton="Agregar Participante"
        href="/admin/participantes/asistentes/nuevo"
        rigthContent={<ExportExcel dataList={persons} />}
      /> */}
      <section className="py-6">
        <ListParticipants />
      </section>
    </main>
  )
}
