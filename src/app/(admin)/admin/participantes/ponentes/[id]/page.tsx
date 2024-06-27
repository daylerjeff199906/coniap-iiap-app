import { fetchPersonById, fetchSummaryByIdPerson } from '@/api'
import { DetailsParticipant } from '@/modules/admin'
import { IPerson, ISummary } from '@/types'

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

  const summaries: ISummary[] | null = await fetchSummaryByIdPerson(id)
    .then((res) => res)
    .catch((err) => err)

  if (person) {
    return (
      <main className="w-full flex flex-col justify-center items-center">
        <section className="flex flex-col w-full justify-center items-center max-w-5xl">
          <DetailsParticipant
            data={person}
            summaries={summaries}
          />
        </section>
      </main>
    )
  }

  return (
    <>
      <main className="w-full flex flex-col justify-center items-center">
        <section className="flex flex-col justify-center items-center max-w-5xl p-6 border rounded-xl bg-white shadow-md">
          <h1 className="text-xl font-bold">No se encontro el participante</h1>
        </section>
      </main>
    </>
  )
}
