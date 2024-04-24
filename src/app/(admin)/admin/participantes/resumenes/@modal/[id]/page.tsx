import { fetchSummaryById } from '@/api'
import { ModalDetails } from './modal'
import { ISummary } from '@/types'

interface IProps {
  params: {
    id: string
  }
}
export default async function Page(params: IProps) {
  const { id } = params.params
  const data: ISummary = (await fetchSummaryById(id)) as ISummary

  return (
    <>
      <ModalDetails summary={data} />
    </>
  )
}
