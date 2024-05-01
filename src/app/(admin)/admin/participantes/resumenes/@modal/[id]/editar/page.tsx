import { fetchSummaryById } from '@/api'
import { FrmUpdateSummary } from '@/modules/admin'
import { ISummary } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchSummaryById(id)

  if (!res) {
    return (
      <div>
        <h2>Summary not found</h2>
      </div>
    )
  }

  const data: ISummary = res as ISummary

  return (
    <>
      <FrmUpdateSummary summary={data} />
    </>
  )
}
