import { BannerStatic, ListEventsPage } from '@/components'

export default function Page() {
  return (
    <>
      <BannerStatic
        title="Cursos post congreso"
        subtitle="Manten tu aprendizaje"
        description="Inscreíbete en los cursos post congreso y continua tu aprendizaje"
        urlImage="https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Ft_5.webp?alt=media&token=8847460a-46b8-451f-9c1d-7da2de803678"
      />
      <main className="container">
        <ListEventsPage />
      </main>
    </>
  )
}
