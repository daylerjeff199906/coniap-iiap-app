import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { fetchSectionByType } from '@/api/cms'
import { AboutUsSection, TopicsSection } from '@/components/sections/home'
import { InfoSectionSplit } from '@/components/sections/general/InfoSectionSplit'
import { GallerySection } from '@/components/sections/general/GallerySection'
import { InstitutionSection } from '@/components/sections/general/InstitutionSection'
import { fetchActiveTopics } from '@/api/fetchTopics'
import { ITopicsSectionContent } from '@/types'

export async function generateMetadata({
    params
}: {
    params: { locale: string }
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: `${t('about.title')} | ${t('title')}`,
        description: t('about.description'),
    }
}

export default async function AboutPage() {
    const splitSection = await fetchSectionByType('about', 'info_section_split')
    const gallerySection = await fetchSectionByType('about', 'gallery_section')
    const institutionSection = await fetchSectionByType('about', 'about_institution')
    const topicsSection = await fetchSectionByType('about', 'topics_section')
    const dynamicTopics = (await fetchActiveTopics()) || []

    return (
        <main className="bg-white">
            {institutionSection && <InstitutionSection content={institutionSection.content} />}
            {splitSection && <InfoSectionSplit content={splitSection.content} />}
            <AboutUsSection hiddenAction />

            {topicsSection && (
                <TopicsSection
                    content={topicsSection.content as ITopicsSectionContent}
                    topics={dynamicTopics}
                />
            )}

            {gallerySection && <GallerySection content={gallerySection.content} />}
        </main>
    )
}
