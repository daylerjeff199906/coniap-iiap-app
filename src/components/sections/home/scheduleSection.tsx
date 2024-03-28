/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
  Button,
  Tab,
  Tabs,
  Image,
  Chip,
  Card,
  CardBody,
  Divider,
  ScrollShadow,
} from '@nextui-org/react'
import { IconCalendarEvent } from '@tabler/icons-react'
import Link from 'next/link'
// import { motion } from 'framer-motion'

import { CardEvent } from '@/components'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// import required modules
import { Pagination } from 'swiper/modules'

import { usePrograms } from '@/hooks/client/usePrograms'
import { useEffect } from 'react'

function formatDateNameDDMM(date: Date): string {
  const diasSemana = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]
  const nombreDia = diasSemana[date.getDay()]
  const diaMes = date.getDate()
  // const mes = date.getMonth() + 1 // Los meses en JavaScript son base 0, por lo que necesitas sumar 1
  // const anno = date.getFullYear()

  return `${nombreDia} ${diaMes < 10 ? '0' + diaMes : diaMes}`
}

export const ScheduleSection = () => {
  const { getPrograms, loading, programs } = usePrograms()
  const urlDefaul =
    'https://img.freepik.com/foto-gratis/primer-plano-microfono_107420-63821.jpg?t=st=1709942014~exp=1709945614~hmac=7c8e3fdb2bf268e836c534e9287ab897db505846f0c083b02140933dc42c6797&w=996'
  useEffect(() => {
    getPrograms()
  }, [])

  // console.log('programs', programs)

  return (
    <section className=" bg-white">
      <div className="container section-home ">
        <div>
          <div className="flex flex-col items-center">
            <h1 className="title-section-home">Agenda</h1>
            <h3 className="text-gray-500">
              Conoce las actividades que tenemos para ti desde el 10 al 15 de
              noviembre
            </h3>
            <Divider className="bg-orange-500 pt-1 rounded-full my-4 w-36 " />
          </div>
          {programs !== null && (
            <Tabs
              variant="underlined"
              className="text-center flex flex-col items-center"
              // color='success'
              classNames={{
                tabList:
                  'sm:max-w-3xl lg:max-w-4xl w-full rounded-lg overflow-auto',
                // cursor: "w-full bg-suceess-600",
                // tabContent: "group-data-[selected=true]:text-success-600"
              }}
              // fullWidth
            >
              {programs?.map((item, index) => (
                <Tab
                  key={index}
                  title={
                    <div className="font-bold sm:text-xl lg-text-2xl flex items-center gap-2">
                      <IconCalendarEvent size={24} />
                      <h1>{formatDateNameDDMM(new Date(item?.date))}</h1>
                    </div>
                  }
                >
                  <div className="relative w-full pt-4">
                    <div className="w-full pb-16">
                      <section className="relative h-[420px] lg:h-[500px] w-full">
                        <Image
                          src={item?.banner || urlDefaul}
                          alt={item?.title}
                          removeWrapper
                          className="w-full h-[420px] lg:h-[500px] object-cover"
                          isBlurred
                        />
                        <div className="absolute top-0 bottom-0 right-0 left-0 z-10 px-4 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-32 space-y-4 bg-black/50 rounded-xl">
                          <h1 className="text-xl sm:text-2xl lg:text-4xl text-white font-bold">
                            {item?.title}
                          </h1>
                          <Button
                            size="lg"
                            color="primary"
                            className="text-white"
                            radius="full"
                            as={Link}
                            href="/agenda"
                          >
                            Ver agenda
                          </Button>
                        </div>
                      </section>
                    </div>

                    <div className="mt-6 absolute z-20 bottom-0 right-0 w-full max-w-3xl lg:max-w-6xl px-6">
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={8}
                        pagination={{
                          clickable: true,
                        }}
                        breakpoints={{
                          640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                          },
                          768: {
                            slidesPerView: 3,
                            spaceBetween: 16,
                          },
                          1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                          },
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                      >
                        {item?.events?.map((event, index) => (
                          <SwiperSlide
                            key={index}
                            className="shadow-md"
                          >
                            <CardEvent event={event} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </Tab>
              ))}
            </Tabs>
          )}
        </div>
        <div></div>
      </div>
    </section>
  )
}
