import {
  AboutUsSection,
  BannerHome,
  ScheduleSection,
  TimeSection,
  SpeakersSection,
  TopicsSection,
  WorkTeamSection,
  SponsorSection,
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
      <WorkTeamSection />
      <SponsorSection />
    </main>
  )
}
