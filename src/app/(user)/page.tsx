import {
  AboutUsSection,
  BannerHome,
  ScheduleSection,
  TimeSection,
  TopicsSection,
} from '@/components'
import { SpeakersSection } from '@/components/sections/home/speakersSection'

export default function Home() {
  return (
    <main>
      <BannerHome />
      <TimeSection />
      <AboutUsSection />
      <SpeakersSection />
      <TopicsSection />
      <ScheduleSection />
    </main>
  )
}
