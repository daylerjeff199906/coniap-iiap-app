/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Divider, Image } from '@nextui-org/react'

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

  return (
    <>
      <section className="bg-white section-home">
        <div className="container space-y-6">
          <motion.div
            className="flex"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mr-4">
              <Divider
                orientation="vertical"
                className=" bg-orange-500 h-full w-1 rounded-full"
              />
            </div>
            <div className="">
              <h4 className="subtitle-section-home">sponsors</h4>
              <h2 className="title-section-home">Nuestros colaboradores</h2>
            </div>
          </motion.div>
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
        </div>
      </section>
    </>
  )
}
