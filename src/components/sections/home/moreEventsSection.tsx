'use client'
import { motion } from 'framer-motion'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// import required modules
import { Pagination } from 'swiper/modules'
import { IEvent } from '@/types'

interface IProps {
  events: IEvent[]
}

export const MoreEventsSection = (props: IProps) => {
  const { events } = props

  return (
    <>
      <section className="w-full bg-gray-200 section-home">
        <div className="container">
          <header className="pt-14 pb-4">
            <motion.div
              className="flex items-center gap-3 pb-3"
              initial={{ opacity: 0, x: -15 }}
              viewport={{ once: false }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.4,
                },
              }}
            >
              <div className="dot-custom" />
              <p className="text-xs font-semibold z-10 uppercase">#ponentes - 2024</p>
            </motion.div>
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: -15 }}
              viewport={{ once: false }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.4,
                },
              }}
            >
              <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
                Nuestras conferencias <b> Magistrales</b> del congreso
              </h2>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:flex items-center gap-6 sm:justify-between"
              initial={{ opacity: 0, x: 15 }}
              viewport={{ once: false }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.4,
                },
              }}
            >
              <h3 className="text-lg w-full max-w-4xl">
                Descubra las ponencias del congreso creadas conjuntamente con
                los principales especialistas tanto nacionales como
                internacionales que tuvieron lugar en el congreso.
              </h3>
              <div>
                <Button
                  radius="full"
                  size="lg"
                  variant="solid"
                  color="primary"
                  className="text-white"
                  as={Link}
                  href="/agenda"
                >
                  Ver todo
                </Button>
              </div>
            </motion.div>
          </header>
          <div className="p-6 sm:p-10 w-full">
            <Swiper
              slidesPerView={1}
              spaceBetween={8}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {events
                ?.filter(
                  (event) =>
                    event.summary?.person &&
                    event.summary?.person.typePerson === 'speaker_mg'
                )
                .map((event, index) => (
                  <SwiperSlide
                    key={index}
                    className="w-full"
                  >
                    <motion.div
                      className="rounded-lg p-6 w-full space-y-6"
                      initial={{ opacity: 0 }}
                      viewport={{ once: false }}
                      whileInView={{
                        opacity: 1,
                        transition: {
                          duration: 0.4,
                        },
                      }}
                    >
                      <h3 className="text-xl sm:text-2xl line-clamp-3 leading-tight">
                        {event.name}
                      </h3>
                      <p className="text-tiny sm:text-medium font-bold">
                        Conferencia Magistral
                      </p>
                      <p className="text-tiny sm:text-medium ">
                        {event?.summary?.person?.name +
                          ' ' +
                          event?.summary?.person?.surName}
                      </p>
                      <Link
                        href={`/eventos/${event?.id}`}
                        className="underline font-bold leading-normal py-4"
                      >
                        <div className="font-bold py-4 inline-block relative">
                          <div className="flex items-center gap-4">
                            <h1>Más información</h1> <IconArrowRight />
                          </div>
                          <span className="absolute bottom-2 left-0 w-full h-0.5 bg-black transition-all"></span>
                        </div>
                      </Link>
                    </motion.div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}
