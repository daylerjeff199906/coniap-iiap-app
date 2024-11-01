import { BannerStatic, ListEventsPage } from '@/components'
import { fetchEvents } from '@/api'
import { IEvent } from '@/types'
import { Suspense } from 'react'

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Page(props: Props) {
  const { searchParams } = props
  const { search, page, type, date } = searchParams as {
    search: string
    page: string
    type: string
    date: string
  }

  let events: { event: IEvent[]; count: number } = { event: [], count: 0 }

  try {
    const data = await fetchEvents({
      query: search,
      isPagination: true,
      page: parseInt(page),
      isSumary:
        type === 'true' ? 'true' : type === 'false' ? 'false' : undefined,
      date,
      limit: 10,
    })

    if (data) {
      events = { event: data.event, count: Number(data.count) }
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  return (
    <>
      <BannerStatic
        title="Próximos eventos"
        subtitle="Manten tu aprendizaje"
        description="Inscreíbete en los cursos post congreso y continua tu aprendizaje"
        urlImage="https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Ft_5.webp?alt=media&token=8847460a-46b8-451f-9c1d-7da2de803678"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <main className="container">
          <ListEventsPage events={events} />
        </main>
      </Suspense>
    </>
  )
}
