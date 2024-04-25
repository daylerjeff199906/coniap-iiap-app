import { fetchAllEvents } from '@/api'
import { Calendary } from '@/modules/admin'
import { IEvent } from '@/types'
export default async function Page() {
  const events: IEvent[] = (await fetchAllEvents('')) as unknown as IEvent[]

  return (
    <>
      <Calendary data={events} />
    </>
  )
}
