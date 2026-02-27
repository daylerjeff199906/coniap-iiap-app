import { fetchSectionByType } from '@/api/cms'
import { BannerSection } from '@/components/sections/general/BannerSection'
import { IBannerSectionContent } from '@/types/CMS'

export default async function AboutLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    // Fetch banner section content for the 'about' page
    const bannerSection = await fetchSectionByType('about', 'banner_section')
    const bannerContent = bannerSection?.content as IBannerSectionContent

    // Default banner content if not found in DB
    const defaultBanner: IBannerSectionContent = {
        title: {
            es: "Sobre Nosotros",
            en: "About us"
        },
        description: {
            es: "Conoce más sobre el III Congreso Internacional sobre Amazonía Peruana.",
            en: "Learn more about the III International Congress on the Peruvian Amazon."
        },
        image_url: "https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/banners%2Fave-america-sur-habitat-natural-scaled.webp?alt=media&token=9406c9f0-2c73-4b4a-8e5f-f13e9562239d",
        button_text: "Ver Agenda",
        button_link: null,
        background_color: "#0f172a"
    }

    return (
        <>
            <BannerSection content={bannerContent || defaultBanner} locale={params.locale} />
            {children}
        </>
    )
}
