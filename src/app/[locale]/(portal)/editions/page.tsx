import { fetchAllEditions } from '@/api'
import { fetchSectionByType } from '@/api/cms'
import { EditionScroller } from '@/components/sections'
import { IBannerSectionContent } from '@/types/CMS'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
    params
}: {
    params: { locale: string }
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: `${t('editions.title')} | ${t('title')}`,
        description: t('editions.description'),
    }
}

export default async function EditionsPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const editions = await fetchAllEditions()

    const bannerSection = await fetchSectionByType('editions', 'banner_section')
    const bannerContent = bannerSection?.content as IBannerSectionContent

    return (
        <main className="min-h-screen bg-black overflow-hidden">
            <EditionScroller
                editions={editions || []}
                bannerSection={bannerContent}
                locale={locale}
            />
        </main>
    )
}
