import { fetchSectionByType } from '@/api/cms'
import { BannerSection } from '@/components/sections/general/BannerSection'
import { IBannerSectionContent } from '@/types/CMS'

export default async function EventsLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const bannerSection = await fetchSectionByType('events', 'banner_section')
    const bannerContent = bannerSection?.content as IBannerSectionContent

    const defaultBanner: IBannerSectionContent = {
        title: {
            es: "Eventos",
            en: "Events"
        },
        description: {
            es: "Mantente al tanto de todos los eventos y sesiones del congreso.",
            en: "Stay updated with all the congress events and sessions."
        },
        image_url: "https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Fave-america-sur-habitat-natural-scaled.webp?alt=media",
        background_color: "#0f172a"
    }

    return (
        <>
            <BannerSection content={bannerContent || defaultBanner} locale={locale} />
            {children}
        </>
    )
}
