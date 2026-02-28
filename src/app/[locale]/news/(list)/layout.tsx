import { fetchSectionByType } from '@/api/cms'
import { BannerSection } from '@/components/sections/general/BannerSection'
import { IBannerSectionContent } from '@/types/CMS'

export default async function NewsLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const bannerSection = await fetchSectionByType('news', 'banner_section')
    const bannerContent = bannerSection?.content as IBannerSectionContent

    const defaultBanner: IBannerSectionContent = {
        title: {
            es: "Noticias",
            en: "News"
        },
        description: {
            es: "Las últimas noticias del III Congreso Internacional sobre la Amazonía Peruana.",
            en: "The latest news from the III International Congress on the Peruvian Amazon."
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
