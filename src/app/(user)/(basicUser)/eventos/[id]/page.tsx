import type { Metadata, ResolvingMetadata } from 'next'
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
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())
  const event: IEvent = await fetchEventById(id)

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: event?.name,
    description: event.shortDescription,
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params
  const event = await fetchEventById(id)

  return <>{event && <DetailsEvent event={event} />}</>
}
