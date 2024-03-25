/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { Image } from '@nextui-org/react'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'

//import hook useSponsors
import { useSponsors } from '@/hooks/client'

export const SponsorSection = () => {
  const { sponsorsActive, getSponsors } = useSponsors()

  useEffect(() => {
    getSponsors()
  }, [])

  const [ref, inView] = useInView({
    triggerOnce: false, // La animación solo se activará una vez
    threshold: 0.3, // Porcentaje de visibilidad del elemento en el viewport para activar la animación
  })

  return (
    <>
      <section className="bg-white section-home">
        <div
          className="container space-y-6"
          ref={ref}
        >
          <motion.header
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 pb-3">
              <div className="dot-custom" />
              <p className="text-xs font-semibold">#CONIAP- 2024</p>
            </div>
            <div className="w-full max-w-4xl">
              <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
                Nuestros <b>colaboradores</b>
              </h2>
              {/* <h3 className="text-lg">
                Fomentando un Diálogo Multidisciplinario para el Avance
                Sostenible Globalmente.
              </h3> */}
            </div>
          </motion.header>
          <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={inView ? { opacity: 1, x: 1 } : {}}
          transition={{ duration: 0.5 }}
          >
            {sponsorsActive && (
              <>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 50,
                    },
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {sponsorsActive?.map((sponsor) => (
                    <SwiperSlide key={sponsor.id}>
                      <Image
                        src={sponsor.image}
                        alt={sponsor.name}
                        removeWrapper
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  )
}
