import { AlbumSection, InfoAboutUs, OrganizationSection } from '@/components'

export default function Page() {
  return (
    <>
      <article className="container py-6">
        <InfoAboutUs />
        <AlbumSection />
        <OrganizationSection />
      </article>
    </>
  )
}
