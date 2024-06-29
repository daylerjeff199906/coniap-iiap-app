import { fetchSummaryById } from '@/api'
import { FrmUploadFile } from '@/modules/user'
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
      <FrmUploadFile summary={data} />
    </>
  )
}
