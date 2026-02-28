'use client'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import { ISponsor, ISponsorsSectionContent } from '@/types'
import { useLocale } from 'next-intl'



interface IProps {
  sponsors: ISponsor[] | undefined
  content: ISponsorsSectionContent
}

export const SponsorSection = (props: IProps) => {
  const { sponsors, content } = props
  const locale = useLocale() as 'es' | 'en'
  const currentContent = content[locale]

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'start',
  }, [Autoplay({ delay: 3000, stopOnInteraction: false })])

  return (
    <>
      <section className="bg-[#f8f9fa] section-home relative overflow-hidden py-32">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-zinc-950/[0.02] -z-10" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
              },
            }}
            className="w-full max-w-4xl mb-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-[2px] bg-primary rounded-full" />
              <p className="text-sm font-black uppercase tracking-[0.4em] text-primary">
                {currentContent.hashtag}
              </p>
            </div>
            <div className="w-full">
              <h2 className="text-5xl md:text-7xl text-zinc-950 font-bold leading-[0.85] uppercase tracking-tighter mb-10">
                {currentContent.title}
              </h2>
            </div>
            <div>
              <p className="text-xl text-zinc-600 leading-relaxed font-medium border-l-4 border-primary/20 pl-8">
                {currentContent.description}
              </p>
            </div>
          </motion.header>


          <motion.div
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{
              opacity: 1,
              transition: {
                duration: 1,
              },
            }}
            className="w-full"
          >
            {sponsors && (
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4">
                  {sponsors.map((sponsor) => (
                    <div
                      key={sponsor.id}
                      className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] py-10"
                    >
                      <div className="group relative bg-white border border-zinc-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center aspect-[5/2] w-full">
                        <img
                          src={sponsor.image}
                          alt={sponsor.name}
                          className="h-full w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  )
}

