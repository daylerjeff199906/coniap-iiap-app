import { fetchSectionByType } from '@/api/cms'
import { BannerSection } from '@/components/sections/general/BannerSection'
import { IBannerSectionContent } from '@/types/CMS'

export default async function SpeakersLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const bannerSection = await fetchSectionByType('speakers', 'banner_section')
    const bannerContent = bannerSection?.content as IBannerSectionContent

    const defaultBanner: IBannerSectionContent = {
        title: {
            es: "Ponentes",
            en: "Speakers"
        },
        description: {
            es: "Conoce a los expertos que compartirán sus conocimientos en el CONIAP.",
            en: "Meet the experts who will share their knowledge at CONIAP."
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
