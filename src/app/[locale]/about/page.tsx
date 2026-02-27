import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { fetchSectionByType } from '@/api/cms'
import { AboutUsSection } from '@/components/sections/home/aboutUsSection'
import { InfoSectionSplit } from '@/components/sections/general/InfoSectionSplit'
import { GallerySection } from '@/components/sections/general/GallerySection'

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

    return (
        <main className="bg-white">
            {splitSection && <InfoSectionSplit content={splitSection.content} />}
            <AboutUsSection hiddenAction />
            {gallerySection && <GallerySection content={gallerySection.content} />}
        </main>
    )
}
