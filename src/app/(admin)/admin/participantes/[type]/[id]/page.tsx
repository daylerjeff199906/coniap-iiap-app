import { fetchPersonById, fetchSummaryById } from '@/api'
import { DetailsParticipant } from '@/modules/admin'

interface IProps {
  params: {
    type: string
    id: string
  }
}
export default async function Page(props: IProps) {
  const { params } = props

  const person =
    params.type !== 'resumenes'
      ? await fetchPersonById(params.id)
      : await fetchSummaryById(params.id)

  return (
    <div>
      <h1 className="text-xl font-bold">
        Detalle de {params.type.slice(0, -1)}
      </h1>

      <DetailsParticipant data={person} />
    </div>
  )
}
