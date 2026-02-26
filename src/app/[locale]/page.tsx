import { Hero, AboutUsSection } from '@/components/sections/home'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

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

export default function HomePage() {
    return (
        <main className="min-h-screen bg-zinc-950">
            <Hero />
            <AboutUsSection />

            {/* Add more sections here as they are developed */}
        </main>
    )
}
