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

import { ITopic, IPerson, ISponsor, IEvent, IProgram } from '@/types'

export default async function Page() {
  const supabase = createClient()
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

  const { data: event } = await supabase
    .from('events')
    .select()
    .eq('isActived', true)
    .is('sala', null)

  const { data: programs } = (await supabase
    .from('programs')
    .select()
    .eq('isActived', true)) as { data: IProgram[] }

  const { data: eventSpeakers } = (await supabase
    .from('events')
    .select('*,summary:summary_id(*, person:person_id(*))')
    .eq('isActived', true)
    .not('program_id', 'is', null)) as { data: IEvent[] }

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

  const dataEvents: IEvent[] | undefined = event?.map((event: IEvent) => ({
    ...event,
    date: event?.date,
  }))

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
    </main>
  )
}
