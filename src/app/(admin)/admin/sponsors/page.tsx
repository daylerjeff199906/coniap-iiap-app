import { HeaderSection } from '@/modules/core'
import { ListSponsors } from '@/modules/admin'

export default function SponsorPage() {
  return (
    <main className="flex flex-col gap-4">
      <HeaderSection
        title="Colaboradores"
        subtitle="Gestiona los colaboradores parte de la organización."
        isButtonVisible
        href="/admin/sponsors/nuevo"
        labelButton="Añadir colaborador"
      />
      <ListSponsors />
    </main>
  )
}
