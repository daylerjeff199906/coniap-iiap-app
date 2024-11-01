import { createClient } from '@/utils/supabase/server'
import {
  AboutUsSection,
  BannerHome,
  SpeakersSection,
  TopicsSection,
  SponsorSection,
  EventsSection,
  InscriptionsSection,
  AgendaSection,
} from '@/components'
import { fetchEvents } from '@/api'

import { ITopic, IPerson, ISponsor, IEvent, IProgram } from '@/types'
import { AvisoSection } from '@/modules/user'

export default async function Page() {
  const supabase = createClient()

  let dataEvents: IEvent[] = []
  let eventSpeakers: IEvent[] = []

  try {
    const data = await fetchEvents({
      page: 1,
      limit: 10,
      isSumary: 'false',
    })

    if (data) {
      dataEvents = data.event
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
      eventSpeakers = data.event
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  const { data: topics } = await supabase
    .from('topics')
    .select()
    .eq('isActived', true)

  const { data: persons } = await supabase
    .from('persons')
    .select()
    .eq('isActived', true)
    .eq('typePerson', 'speaker_mg')

  const { data: sponsors } = await supabase
    .from('sponsors')
    .select()
    .eq('isActived', true)

  const { data: programs } = (await supabase
    .from('programs')
    .select()
    .eq('isActived', true)) as { data: IProgram[] }

  const dataTopics: ITopic[] | undefined = topics?.map((topic: ITopic) => ({
    ...topic,
    date: new Date(topic?.created_at),
  }))

  const dataPersons = persons?.map((person: IPerson) => ({
    ...person,
    date: new Date(person?.created_at),
  }))

  const dataSponsors: ISponsor[] | undefined = sponsors?.map(
    (sponsor: ISponsor) => ({
      ...sponsor,
      created_at: sponsor?.created_at,
    })
  )

  return (
    <main className="h-ful">
      <BannerHome />
      <AboutUsSection />
      <SpeakersSection persons={dataPersons} />
      <TopicsSection topics={dataTopics} />
      <AgendaSection
        events={eventSpeakers}
        programs={programs}
      />
      <InscriptionsSection />
      <EventsSection events={dataEvents} />
      <SponsorSection sponsors={dataSponsors} />
      <AvisoSection />
    </main>
  )
}
