import { FrmUpdateSummary } from '@/modules/admin'
import { ISummary } from '@/types'

export default function Page() {
  return (
    <main className="h-full">
      <FrmUpdateSummary summary={{} as ISummary} />
    </main>
  )
}
