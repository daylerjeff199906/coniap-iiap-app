'use server'

import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { IBannerSectionContent } from '@/types/CMS'

interface BannerSectionProps {
    content: IBannerSectionContent;
}

export async function BannerSection({ content }: BannerSectionProps) {
    if (!content) return null;

    return (
        <section
            className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: content.background_color || '#1a1a1a' }}
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={content.image_url}
                    alt={content.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-zinc-950/80 transition-opacity duration-300 group-hover:bg-zinc-850/40" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="text-4xl md:text-7xl font-medium text-white tracking-tighter uppercase leading-[0.9] drop-shadow-2xl">
                        {content.title}
                    </h1>

                    <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                        {content.description}
                    </p>

                    {content.button_link && content.button_text && (
                        <Link href={content.button_link} target={content.target} className="pt-6">
                            <Button
                                size="lg"
                                className="rounded-full px-10 py-8 text-xl font-bold uppercase tracking-widest bg-primary hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl shadow-primary/20 group"
                            >
                                {content.button_text}
                                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

        </section>
    )
}
