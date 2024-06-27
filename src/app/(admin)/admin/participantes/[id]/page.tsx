import { fetchPersonById } from '@/api'
import { DetailsParticipant } from '@/modules/admin'
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
      <main className="w-full flex flex-col justify-center items-center">
        <section className="flex flex-col w-full justify-center items-center max-w-5xl">
          <DetailsParticipant data={person} />
        </section>
      </main>
    )
  }

  return <></>
}
