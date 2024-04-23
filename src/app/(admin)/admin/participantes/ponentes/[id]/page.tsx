import { fetchPersonById, fetchSummaryById } from '@/api'
import { DetailsParticipant } from '@/modules/admin'

interface IProps {
  params: {
    // type: string
    id: string
  }
}
export default async function Page(props: IProps) {
  const { params } = props
  const person = await fetchPersonById(params.id)

  // const person =
  //   params.type !== 'resumenes'
  //     ? await fetchPersonById(params.id)
  //     : await fetchSummaryById(params.id)

  return (
    <div className="grid grid-cols-1 gap-4">
      <DetailsParticipant data={person} />
    </div>
  )
}
