import {
  AboutUsSection,
  BannerHome,
  ScheduleSection,
  TimeSection,
} from '@/pages'

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
