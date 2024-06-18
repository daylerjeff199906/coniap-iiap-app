import { BannerStatic, ListEventsPage } from '@/components'
import { FrmContactUs } from '@/modules/user'

export default function Page() {
  return (
    <>
      <BannerStatic
        title="Eventos"
        subtitle="Conecta con los Expertos"
        description="Participa en las Inspiradoras Ponencias de Eventos del CONIAP. ¡No te lo pierdas!"
        urlImage="https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Ft_5.webp?alt=media&token=8847460a-46b8-451f-9c1d-7da2de803678"
      />
      <main className="container">
        <ListEventsPage />
      </main>
      <FrmContactUs />
    </>
  )
}
