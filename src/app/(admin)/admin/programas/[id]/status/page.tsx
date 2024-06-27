import { fetchProgram } from '@/api'
import { DialogStatus, FrmProgramEditor } from '@/modules/admin'
import { IProgram } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const program: IProgram = await fetchProgram(id)
    .then((res) => res)
    .catch((err) => err)

  if (program && program?.isActived !== undefined) {
    return (
      <section className="flex flex-col w-full justify-center items-center">
        <DialogStatus
          id={id}
          path="programs"
          status={program?.isActived}
        />
      </section>
    )
  }

  return <></>
}
