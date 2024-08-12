/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Image } from '@nextui-org/react'

import { motion } from 'framer-motion'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'
import { ISponsor } from '@/types'

interface IProps {
  sponsors: ISponsor[] | undefined
}
export const SponsorSection = (props: IProps) => {
  const { sponsors } = props

  return (
    <>
      <section className="bg-white section-home">
        <div className="container space-y-6 flex flex-col gap-3">
          <motion.header
            initial={{ opacity: 0 }}
            viewport={{ once: false }}
            whileInView={{
              opacity: 1,
              transition: {
                duration: 1,
              },
            }}
            className="w-full max-w-lg"
          >
            <div className="flex items-center gap-3 pb-3">
              <div className="dot-custom" />
              <p className="text-xs font-semibold uppercase">#CONIAP - 2024</p>
            </div>
            <div className="w-full max-w-4xl">
              <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
                Nuestros <b>coorganizadores</b>
              </h2>
            </div>
            <div>
              <p className="text-sm">
                Gracias a nuestros nuestros coorganizadores por hacer posible la
                realización de este evento.
              </p>
            </div>
          </motion.header>
          <motion.div
            initial={{ opacity: 0 }}
            viewport={{ once: false }}
            whileInView={{
              opacity: 1,
              transition: {
                duration: 1,
              },
            }}
            className="w-full"
          >
            {sponsors && (
              <div className="">
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
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 50,
                    },
                  }}
                  modules={[Pagination]}
                  className="mySwiper items-center flex"
                >
                  {sponsors?.map((sponsor) => (
                    <SwiperSlide
                      key={sponsor.id}
                      className="flex flex-col justify-center items-center"
                    >
                      <Image
                        src={sponsor.image}
                        alt={sponsor.name}
                        removeWrapper
                        className="h-full w-full sm:w-auto sm:h-56"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
            {/* {sponsors && (
              <div className="hidden sm:grid grid-cols-3 gap-3 w-full">
                {sponsors?.map((sponsor) => (
                  <div key={sponsor.id}>
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      removeWrapper
                      className="w-full  object-cover"
                    />
                  </div>
                ))}
              </div>
            )} */}
          </motion.div>
        </div>
      </section>
    </>
  )
}
