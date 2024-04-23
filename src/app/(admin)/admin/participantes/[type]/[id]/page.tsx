import { fetchPersonById, fetchSummaryById } from '@/api'

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
      <h1>Page</h1>
      {params.type}
      {params.id}
    </div>
  )
}
