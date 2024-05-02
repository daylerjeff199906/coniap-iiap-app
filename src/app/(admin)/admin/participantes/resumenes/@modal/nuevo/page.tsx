import { FrmUpdateSummary } from '@/modules/admin'
import { ISummary } from '@/types'

export default function Page() {
  return (
    <>
      <FrmUpdateSummary summary={{} as ISummary} />
    </>
  )
}
