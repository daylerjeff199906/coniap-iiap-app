import { fetchSponsor } from '@/api'
import { FrmSponsorEditor } from '@/modules/admin'
import { ISponsor } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchSponsor(id)
  if (!res) {
    return (
      <div>
        <p className="font-semibold">Error al cargar la temática</p>
      </div>
    )
  }

  const dataSponsor: ISponsor = res

  return (
    <>
      <FrmSponsorEditor defaultData={dataSponsor} />
    </>
  )
}
