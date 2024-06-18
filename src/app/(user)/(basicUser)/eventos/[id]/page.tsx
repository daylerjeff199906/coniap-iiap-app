import type { Metadata } from 'next'
import { DetailsEvent } from '@/components'
import { fetchEventById } from '@/api'
import { IEvent } from '@/types'
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

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: event?.name,
    description: event?.shortDescription,
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params
  const event = await fetchEventById(id)
  return <>{event && <DetailsEvent event={event} />}</>
}
