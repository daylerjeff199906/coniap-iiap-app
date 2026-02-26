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
        title: "Sobre Nosotros",
        description: "Conoce más sobre el III Congreso Internacional sobre Amazonía Peruana.",
        image_url: "https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/logos%2Fmeta-coniap.webp?alt=media",
        button_text: "Ver Agenda",
        button_link: "/agenda",
        background_color: "#0f172a"
    }

    return (
        <>
            <BannerSection content={bannerContent || defaultBanner} />
            {children}
        </>
    )
}
