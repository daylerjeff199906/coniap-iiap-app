import { Hero, AboutUsSection, MagistralSpeakersHomeSection, TopicsSection, SponsorSection, CTAActionSection } from '@/components/sections/home'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { fetchSectionByType } from '@/api/cms'
import { fetchCurrentMagistralSpeakers } from '@/api/fetchPerson'
import { fetchActiveTopics } from '@/api/fetchTopics'
import { fetchCurrentEditionSponsors } from '@/api/fetchSponsors'
import { fetchCurrentEdition } from '@/api/fetchEditions'
import { fetchActiveCalls } from '@/api/fetchCalls'
import { IMagistralSpeakersSectionContent, ITopicsSectionContent, ISponsorsSectionContent, ICTASectionContent } from '@/types'

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('title'),
        description: t('description'),
    }
}

export default async function HomePage() {
    const magistralSpeakersSection = await fetchSectionByType('home', 'magistral_speakers_section')
    const dynamicMagistralSpeakers = await fetchCurrentMagistralSpeakers()
    const topicsSection = await fetchSectionByType('home', 'topics_section')
    const dynamicTopics = (await fetchActiveTopics()) || []
    const sponsorsSection = await fetchSectionByType('home', 'sponsors_section')
    const dynamicSponsors = (await fetchCurrentEditionSponsors()) || []
    const ctaSection = await fetchSectionByType('home', 'cta_action_section')
    const currentEdition = await fetchCurrentEdition()
    const activeCalls = await fetchActiveCalls()
    const activeCallId = activeCalls && activeCalls.length > 0 ? activeCalls[0].id : undefined

    return (
        <main className="min-h-screen bg-zinc-950">
            <Hero />
            <AboutUsSection />

            {magistralSpeakersSection && (
                <MagistralSpeakersHomeSection
                    content={magistralSpeakersSection.content as IMagistralSpeakersSectionContent}
                    persons={dynamicMagistralSpeakers}
                />
            )}

            {topicsSection && (
                <TopicsSection
                    content={topicsSection.content as ITopicsSectionContent}
                    topics={dynamicTopics}
                />
            )}

            {sponsorsSection && (
                <SponsorSection
                    content={sponsorsSection.content as ISponsorsSectionContent}
                    sponsors={dynamicSponsors}
                />
            )}

            {ctaSection && (
                <CTAActionSection
                    content={ctaSection.content as ICTASectionContent}
                    currentEditionId={currentEdition?.id}
                    activeCallId={activeCallId}
                />
            )}

            {/* Add more sections here as they are developed */}
        </main>
    )
}

