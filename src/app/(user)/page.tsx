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
} from '@/components'

export default function Home() {
  return (
    <main>
      <BannerHome />
      <TimeSection />
      <AboutUsSection />
      <SpeakersSection />
      <TopicsSection />
      <ScheduleSection />
      <EventsSection />
      <WorkTeamSection />
      <SponsorSection />
    </main>
  )
}
