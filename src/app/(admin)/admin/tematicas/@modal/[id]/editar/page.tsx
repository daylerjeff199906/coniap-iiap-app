import { fetchTopic } from '@/api'
import { FrmManageTopic } from '@/modules/admin'
import { ITopic } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchTopic(Number(id))
  if (!res) {
    return (
      <div>
        <p className="font-semibold">Error al cargar la temática</p>
      </div>
    )
  }

  const dataTopic: ITopic = res

  return (
    <>
      <FrmManageTopic dataDefault={dataTopic} />
    </>
  )
}
