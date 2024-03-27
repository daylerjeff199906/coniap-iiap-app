import { AlbumSection, InfoAboutUs, OrganizationSection } from '@/components'

export default function Page() {
  return (
    <>
      <article className="py-6">
        <InfoAboutUs />
        <AlbumSection />
        <OrganizationSection />
      </article>
    </>
  )
}
