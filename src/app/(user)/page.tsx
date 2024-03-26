import { createClient } from '@/utils/supabase/server'
import {
  AboutUsSection,
  BannerHome,
  ScheduleSection,
  TimeSection,
  SpeakersSection,
  TopicsSection,
  SponsorSection,
  EventsSection,
  InscriptionsSection,
  MoreEventsSection,
} from '@/components'
import { ITopic, IPerson, ISponsor } from '@/types'

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
      created_at: new Date(sponsor?.created_at),
    })
  )

  return (
    <main>
      <BannerHome />
      <TimeSection />
      <AboutUsSection />
      <SpeakersSection persons={dataPersons} />
      <TopicsSection topics={dataTopics} />
      <ScheduleSection />
      <MoreEventsSection />
      <EventsSection />
      <InscriptionsSection />
      <SponsorSection sponsors={dataSponsors} />
    </main>
  )
}
