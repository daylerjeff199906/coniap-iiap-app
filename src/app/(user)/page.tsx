// 'use client'
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
import { ITopic } from '@/types'
import { IPerson } from '@/types/IPersons'

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

  const dataTopics: ITopic[] | undefined = topics?.map((topic: ITopic) => ({
    ...topic,
    date: new Date(topic?.created_at),
  }))

  const dataPersons = persons?.map((person: IPerson) => ({
    ...person,
    date: new Date(person?.created_at),
  }))

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
      <SponsorSection />
    </main>
  )
}
