'use client'
import dynamic from 'next/dynamic'
const FrmUpdateSummary = dynamic(
  () => import('@/modules/admin').then((mod) => mod.FrmUpdateSummary),
  {
    ssr: false,
  }
)

export default function Page() {
  return (
    <main className="h-full">
      <FrmUpdateSummary />
    </main>
  )
}
