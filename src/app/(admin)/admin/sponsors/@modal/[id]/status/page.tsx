import { fetchSponsor } from '@/api'
import { DialogStatus, ModalRender } from '@/modules/admin'
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
      <ModalRender
        header={
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Estado de colaborrador</h2>
          </div>
        }
        size="lg"
      >
        <DialogStatus
          id={id}
          path="sponsors"
          status={dataSponsor?.isActived}
        />
      </ModalRender>
    </>
  )
}
