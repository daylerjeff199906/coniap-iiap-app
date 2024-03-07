import {
  AboutUsSection,
  BannerHome,
  ScheduleSection,
  TimeSection,
} from '@/components'

export default function Home() {
  return (
    <main>
      <BannerHome />
      <TimeSection />
      <AboutUsSection />
      <ScheduleSection />
    </main>
  )
}
