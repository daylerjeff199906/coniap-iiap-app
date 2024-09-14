import type { Metadata } from 'next'
import { fetchEventById } from '@/api'
import { IEvent } from '@/types'
import { DetailsEvent } from '@/modules/user'
interface IProps {
  params: {
    id: string
  }
}

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id

  const event: IEvent = await fetchEventById(id)
  const banner = event?.banner
    ? event?.banner
    : 'https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/logos%2Fmeta-coniap.webp?alt=media&token=1f0e7ef1-3ab3-479a-8e0e-dad09842e857'

  return {
    title: event?.name,
    description: event?.shortDescription,
    openGraph: {
      images: [
        {
          url: banner,
          width: 430,
          height: 430,
          alt: 'CONIAP | Congreso Internacional sobre Amazonía Peruana',
        },
      ],
    },
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params
  const event = await fetchEventById(id)
  return (
    <>
      {event && (
        <main>
          <div className="bg-primary-800 h-16"></div>
          <DetailsEvent event={event} />
        </main>
      )}
    </>
  )
}
