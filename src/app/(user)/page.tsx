'use client'
import dividerCustom from '@/assets/svg/patron-fino.svg'
import {
  AboutUsSection,
  BannerHome,
  ScheduleSection,
  TimeSection,
  SpeakersSection,
  TopicsSection,
  WorkTeamSection,
  SponsorSection,
  EventsSection,
  InscriptionsSection,
} from '@/components'

export default function Page() {
  return (
    <main>
      <BannerHome />
      <TimeSection />
      <AboutUsSection />
      <SpeakersSection />
      <TopicsSection />
      <ScheduleSection />
      <EventsSection />
      <InscriptionsSection />
      <WorkTeamSection />
      <SponsorSection />
    </main>
  )
}
