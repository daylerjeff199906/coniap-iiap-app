import { fetchAllEditions } from '@/api'
import { EditionScroller } from '@/components/sections'
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

    return (
        <main className="min-h-screen bg-black overflow-hidden">
            <EditionScroller editions={editions || []} locale={locale} />
        </main>
    )
}
