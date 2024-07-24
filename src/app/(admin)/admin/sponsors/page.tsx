import { HeaderSection } from '@/modules/core'
import { ListSponsors } from '@/modules/admin'

export default function SponsorPage() {
  return (
    <main className="flex flex-col gap-4">
      <HeaderSection
        title="Coorganizadores"
        subtitle="Gestiona los coorganizadores que participarán en el evento"
        isButtonVisible
        href="/admin/sponsors/nuevo"
        labelButton="Añadir coorganizador"
      />
      <ListSponsors />
    </main>
  )
}
