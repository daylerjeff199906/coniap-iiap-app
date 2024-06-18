import { ListSponsorsSections } from '@/components'
import { HeaderSection } from '@/modules/core'

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
      <ListSponsorsSections />
    </main>
  )
}
