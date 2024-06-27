import { fetchProgram } from '@/api'
import { FrmProgramEditor } from '@/modules/admin'
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

  if (program) {
    return (
      <section className="flex flex-col w-full justify-center items-center">
        <FrmProgramEditor program={program} />
      </section>
    )
  }

  return <></>
}
