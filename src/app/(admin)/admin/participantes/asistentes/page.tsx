import { fetchPersons } from '@/api'
import { ExportExcel, ListParticipants } from '@/modules/admin'
import { HeaderSection } from '@/modules/core'
import { IPerson } from '@/types'

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Page(props: IProps) {
  const { searchParams } = props
  const { query, status } = searchParams

  const search = query ? String(query) : ''
  const type = 'participant'
  const statusPerson = status ? String(status) : ''
  const statusValue =
    statusPerson === 'active'
      ? 'TRUE'
      : statusPerson === 'inactive'
      ? 'FALSE'
      : ''

  const persons: IPerson[] = (await fetchPersons(
    search,
    type,
    undefined,
    statusValue
  )) as IPerson[]

  return (
    <main className="flex flex-col gap-4">
      <HeaderSection
        title="Participantes general (Asistentes no expositor)"
        subtitle="Lista de participantes solo que participan en el congreso como asistentes"
        isButtonVisible
        labelButton="Agregar Participante"
        href="/admin/participantes/asistentes/nuevo"
        rigthContent={<ExportExcel dataList={persons} />}
      />
      <section className="py-6">
        <ListParticipants dataList={persons} />
      </section>
    </main>
  )
}
