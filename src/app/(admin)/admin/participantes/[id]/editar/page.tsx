import { fetchPersonById } from '@/api'
import { FrmParticipantEditor } from '@/modules/admin'
import { IPerson } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const person: IPerson = await fetchPersonById(id)
    .then((res) => res)
    .catch((err) => err)

  if (person) {
    return (
      <section className="flex flex-col w-full justify-center items-center">
        <FrmParticipantEditor dataDefault={person} />
      </section>
    )
  }

  return <></>
}
