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

  return {
    title: person?.name,
    description: person?.presentation,
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params
  const speaker = await fetchPersonById(id)

  return <>{speaker && <DetailsSpeaker speaker={speaker} />}</>
}
