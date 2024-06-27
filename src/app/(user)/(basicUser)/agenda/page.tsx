/* eslint-disable react-hooks/exhaustive-deps */
import { createClient } from '@/utils/supabase/server'
import { OtherEventsSection } from '@/components'
import { DataNotFound } from '@/components'
import { IEvent, IProgram } from '@/types'
import { ListShedule } from '@/modules/user'

export default async function Page() {
  const supabase = createClient()

  const { data: programs } = (await supabase
    .from('programs')
    .select()
    .eq('isActived', true)) as { data: IProgram[] }

  const { data: eventSpeakers } = (await supabase
    .from('events')
    .select('*, persons(*)')
    .eq('isActived', true)
    .not('program_id', 'is', null)) as { data: IEvent[] }

  const { data: otherEvents } = (await supabase
    .from('events')
    .select()
    .eq('isActived', true)
    .is('sala', null)) as { data: IEvent[] }

  return (
    <>
      <section className="container">
        {programs !== undefined && programs?.length > 0 ? (
          <>
            <ListShedule
              programs={programs}
              events={eventSpeakers}
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
