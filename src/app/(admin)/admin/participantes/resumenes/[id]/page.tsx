import { fetchSummaryById } from '@/api'
import { FrmDetailSummary } from '@/modules/admin'
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
      <FrmDetailSummary summary={data} />
    </>
  )
}
