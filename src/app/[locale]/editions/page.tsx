import { fetchDynamicSectionsByPage } from '@/api/cms'
import { InfoSectionSplit, GallerySection, InstitutionSection } from '@/components/sections'
import { AboutUsSection } from '@/components/sections/home/aboutUsSection'
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

export default async function EditionsPage() {
    const sections = await fetchDynamicSectionsByPage('editions')

    return (
        <main className="bg-white">
            {sections?.map((section) => {
                switch (section.component_type) {
                    case 'info_section_split':
                        return <InfoSectionSplit key={section.id} content={section.content} />
                    case 'about_with_tabs':
                        return <AboutUsSection key={section.id} pageSlug="editions" hiddenAction />
                    case 'about_institution':
                        return <InstitutionSection key={section.id} content={section.content} />
                    case 'gallery_section':
                        return <GallerySection key={section.id} content={section.content} />
                    default:
                        return null
                }
            })}

            {/* If no sections are found in DB, show a placeholder or empty message */}
            {(!sections || sections.length === 0) && (
                <div className="py-32 text-center">
                    <h2 className="text-2xl font-bold text-zinc-400 uppercase tracking-widest">
                        Próximamente más sobre nuestras ediciones
                    </h2>
                </div>
            )}
        </main>
    )
}
