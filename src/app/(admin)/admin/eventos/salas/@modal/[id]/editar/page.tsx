import { fetchSalaById } from '@/api'
import { FrmRoomEditor } from '@/modules/admin'
import { ISala, ITopic } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchSalaById(id)
  if (!res) {
    return (
      <div>
        <p className="font-semibold">Error al cargar la sala</p>
      </div>
    )
  }

  const data: ISala = res

  return (
    <>
      <FrmRoomEditor dataDefault={data} />
    </>
  )
}
