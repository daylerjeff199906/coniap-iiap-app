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
} from '@/components'
import Image from 'next/image'

export default function Page() {
  return (
    <main>
      <BannerHome />
      <TimeSection />
      <AboutUsSection />
      <SpeakersSection />
      <TopicsSection />
      <ScheduleSection />
 
        <Image
          className="w-full  bg-white object-cover h-4"
          src={dividerCustom}
          alt="divider"
        />
   
      <EventsSection />
      <WorkTeamSection />
      <SponsorSection />
    </main>
  )
}
