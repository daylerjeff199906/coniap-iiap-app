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
  const { query } = searchParams

  const search = query ? String(query) : ''
  const type = 'participant'

  const persons: IPerson[] = (await fetchPersons(search, type)) as IPerson[]

  return (
    <>
      <HeaderSection
        title="Participantes general (Asistentes no expositor)"
        subtitle="Lista de participantes solo que participan en el congreso como asistentes"
        isButtonVisible
        labelButton="Agregar Participante"
        href="/admin/participantes/asistentes/nuevo"
      />
      <section className="py-6">
        <ListParticipants dataList={persons} />
      </section>
    </>
  )
}
