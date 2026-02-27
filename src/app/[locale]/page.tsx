import { Hero, AboutUsSection, MagistralSpeakersHomeSection } from '@/components/sections/home'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { fetchSectionByType } from '@/api/cms'
import { fetchCurrentMagistralSpeakers } from '@/api/fetchPerson'
import { IMagistralSpeakersSectionContent } from '@/types'

export async function generateMetadata({
    params
}: {
    params: { locale: string };
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

            {/* Add more sections here as they are developed */}
        </main>
    )
}
