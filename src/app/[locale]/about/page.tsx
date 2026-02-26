import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { fetchSectionByType } from '@/api/cms'
import { AboutUsSection } from '@/components/sections/home/aboutUsSection'

export async function generateMetadata({
    params
}: {
    params: { locale: string }
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: `About Us | ${t('title')}`,
        description: t('description'),
    }
}

export default async function AboutPage() {
    // Other sections for the about page could be fetched and rendered here
    // The main about content is in the AboutUsSection component which now fetches its own data
    return (
        <div className="bg-white">
            <AboutUsSection />
            {/* Add more sections here if needed */}
        </div>
    )
}
