import { AlbumSection, InfoAboutUs, OrganizationSection } from '@/components'
import { FrmContactUs } from '@/modules/user'

export default function Page() {
  return (
    <>
      <article className="container py-6">
        <InfoAboutUs />
        <AlbumSection />
        <OrganizationSection />
      </article>
      <FrmContactUs />
    </>
  )
}
