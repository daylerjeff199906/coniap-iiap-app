import { ParticipantsReports } from '@/modules/admin/reports'
import { HeaderSection } from '@/modules/core'

export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <HeaderSection
        title="Reportes de participantes"
        subtitle="Realiza un seguimiento de los participantes inscritos en el congreso"
      />
      <ParticipantsReports />
    </main>
  )
}
