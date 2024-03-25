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

export default async function Page() {
  const supabase = createClient()
  const { data: topics } = await supabase
    .from('topics')
    .select()
    .eq('isActived', true)

  const dateTopics: ITopic[] | undefined = topics?.map((topic: ITopic) => ({
    ...topic,
    date: new Date(topic?.created_at),
  }))

  return (
    <main>
      <BannerHome />
      <TimeSection />
      <AboutUsSection />
      <SpeakersSection />
      <TopicsSection topics={dateTopics} />
      <ScheduleSection />
      <MoreEventsSection />
      <EventsSection />
      <InscriptionsSection />
      <SponsorSection />
    </main>
  )
}
