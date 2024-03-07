import {
  AboutUsSection,
  BannerHome,
  ScheduleSection,
  TimeSection,
  TopicsSection,
} from '@/components'

export default function Home() {
  return (
    <main>
      <BannerHome />
      <TimeSection />
      <AboutUsSection />
      <TopicsSection />
      <ScheduleSection />
    </main>
  )
}
