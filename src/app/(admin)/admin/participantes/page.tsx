import { fetchPersons } from '@/api'
import { ListParticipants } from '@/modules/admin'
import { HeaderSection } from '@/modules/core'
import { IPerson } from '@/types'

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Page(props: IProps) {
  const { searchParams } = props
  const { query, typePerson, status } = searchParams

  const search = query ? String(query) : ''
  const type = typePerson ? String(typePerson) : ''
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
    <>
      <HeaderSection
        title="Participantes"
        subtitle="Lista de participantes incluyendo ponentes, ponentes magistrales y asistentes"
        isButtonVisible
        labelButton="Agregar Participante"
        href="/admin/participantes/nuevo"
      />
      <section className="py-6">
        <ListParticipants dataList={persons} />
      </section>
    </>
  )
}
