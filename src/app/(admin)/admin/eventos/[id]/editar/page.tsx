import { fetchEventById, fetchTopic } from '@/api'
import { FrmEventEditor } from '@/modules/admin'
import { IEvent } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchEventById(id)
  if (!res) {
    return (
      <div>
        <p className="font-semibold">Error al cargar la temática</p>
      </div>
    )
  }

  const dataTopic: IEvent = res
  return (
    <>
      <FrmEventEditor dataDefault={dataTopic} />
    </>
  )
}
