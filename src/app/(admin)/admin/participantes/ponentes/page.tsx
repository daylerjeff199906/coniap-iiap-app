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
  const { query, status, typePerson } = searchParams

  const search = query ? String(query) : ''
  const isNot = 'participant'
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
    isNot,
    statusValue
  )) as IPerson[]

  return (
    <>
      <HeaderSection
        title="Lista de expositores"
        subtitle="Lista de participantes que participan en el congreso como expositores, ponentes y ponentes magistrales"
        isButtonVisible
        labelButton="Agregar Participante"
        href="/admin/participantes/ponentes/nuevo"
      />
      <section className="py-6">
        <ListParticipants dataList={persons} />
      </section>
    </>
  )
}
