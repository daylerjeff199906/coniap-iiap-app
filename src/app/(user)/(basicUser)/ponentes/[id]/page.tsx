import type { Metadata } from 'next'
import { DetailsSpeaker } from '@/components'
import { fetchPersonById } from '@/api'
import { IPerson } from '@/types'
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

  const person: IPerson = await fetchPersonById(id)

  // optionally access and extend (rather than replace) parent metadata
  if (!person) {
    return {
      title: 'Speaker not found',
      description: 'Speaker not found',
    }
  }
  return {
    title: person?.name + person?.surName + ' | CONIAP 2024',
    description: person.presentation?.slice(0, 160),
    openGraph: {
      images: [{ url: person.image }],
    },
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params
  const speaker = await fetchPersonById(id)

  return <>{speaker && <DetailsSpeaker speaker={speaker} />}</>
}
