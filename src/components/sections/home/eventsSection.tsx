'use client'
import { IEvent } from '@/types'
import { motion } from 'framer-motion'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// import required modules
import { Pagination } from 'swiper/modules'
import Image from 'next/image'
import { EventCard } from '@/modules/user'
interface IProps {
  events: IEvent[] | undefined
}

export const EventsSection = (props: IProps) => {
  const { events } = props
  return (
    <>
      <section className="bg-gray-100 section-home w-full">
        <div className="container space-y-6 py-4">
          <motion.header
            initial={{ opacity: 0, x: -15 }}
            viewport={{ once: false }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1,
              },
            }}
          >
            <div className="flex items-center gap-3 pb-3">
              <div className="dot-custom" />
              <p className="text-xs font-semibold z-10 uppercase">
                #coniap - 2024
              </p>
            </div>
            <div className="w-full max-w-4xl">
              <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
                Próximos <b>eventos</b> para tí
              </h2>
            </div>
          </motion.header>
          <div>
            {events && events.length > 0 ? (
              <Swiper
                slidesPerView={1}
                spaceBetween={8}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 4,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 18,
                  },
                  1024: {
                    slidesPerView: 1,
                    spaceBetween: 24,
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {events &&
                  events.map((event, i) => (
                    <SwiperSlide
                      key={i}
                      className="w-full"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        viewport={{ once: false }}
                        whileInView={{
                          opacity: 1,
                          transition: {
                            duration: 1,
                          },
                        }}
                      >
                        <EventCard data={event} />
                      </motion.div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <Image
                  src="/svg/not-courses.svg"
                  alt="No hay cursos disponibles"
                  width={320}
                  height={320}
                />

                <div className="flex flex-col items-start justify-center sm:justify-start sm:items-center">
                  <h3 className="text-sm text-center font-bold lg:text-base">
                    ¡Pronto más eventos para ti!
                  </h3>
                  <p className="text-xs lg:text-sm">
                    Aún no se han programado eventos disponibles
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
