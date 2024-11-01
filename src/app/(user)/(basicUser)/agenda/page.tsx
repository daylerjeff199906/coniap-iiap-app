/* eslint-disable react-hooks/exhaustive-deps */
import { createClient } from '@/utils/supabase/server'
import { OtherEventsSection } from '@/components'
import { DataNotFound } from '@/components'
import { IEvent, IProgram } from '@/types'
import { ListShedule } from '@/modules/user'
import { fetchEvents } from '@/api'

export default async function Page() {
  const supabase = createClient()
  let otherEvents: IEvent[] = []
  let eventSpeakers: { event: IEvent[]; count: number } = {
    event: [],
    count: 0,
  }

  try {
    const data = await fetchEvents({
      page: 1,
      limit: 10,
      isSumary: 'false',
    })

    if (data) {
      otherEvents = data.event
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  try {
    const data = await fetchEvents({
      page: 1,
      limit: 10,
      isSumary: 'true',
    })

    if (data) {
      eventSpeakers = { event: data.event, count: Number(data.count) }
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  const { data: programs } = (await supabase
    .from('programs')
    .select()
    .eq('isActived', true)) as { data: IProgram[] }

  return (
    <>
      <section className="container">
        {programs !== undefined && programs?.length > 0 ? (
          <>
            <ListShedule
              programs={programs}
              events={eventSpeakers.event}
            />
          </>
        ) : (
          <DataNotFound />
        )}
      </section>
      <OtherEventsSection events={otherEvents} />
    </>
  )
}
