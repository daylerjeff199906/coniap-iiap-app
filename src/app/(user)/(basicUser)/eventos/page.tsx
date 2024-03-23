/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { BannerStatic, LoadingPages } from '@/components'
import { useEvents } from '@/hooks/client'
import { DataNotFound } from '@/components'

export default function Page() {
  const { getEventsActive, events, loading } = useEvents()

  useEffect(() => {
    getEventsActive()
  }, [])

  return (
    <>
      <BannerStatic
        title="Eventos"
        subtitle="Conecta con los Expertos"
        description="Participa en las Inspiradoras Ponencias de Eventos del CONIAP. ¡No te lo pierdas!"
        urlImage="https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Ft_5.webp?alt=media&token=8847460a-46b8-451f-9c1d-7da2de803678"
      />
      <main className="container">
        {events !== null && events.length > 0 ? (
          <>
            <section className="py-4">
              <h1>Eventos</h1>
            </section>
          </>
        ) : (
          <DataNotFound />
        )}
      </main>
      <LoadingPages isOpen={loading} />
    </>
  )
}
