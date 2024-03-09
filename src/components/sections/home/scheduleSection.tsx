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
import { IconCalendarEvent, IconMapPin, IconClock } from '@tabler/icons-react'
import data from '@/utils/shedule.json'
import Link from 'next/link'

// create array data for timeline
// const data = [
//   {
//     title: 'Title 1',
//     description: 'Description 1',
//     date: 'Date 1',
//   },
//   {
//     title: 'Title 2',
//     description: 'Description 2',
//     date: 'Date 2',
//   },
//   {
//     title: 'Title 3',
//     description: 'Description 3',
//     date: 'Date 3',
//   },
// ]

function formatDateToDDMMM(date: Date): string {
  const months = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUN',
    'JUL',
    'AGO',
    'SEP',
    'OCT',
    'NOV',
    'DIC',
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const month = months[monthIndex]

  return `${day.toString().padStart(2, '0')} ${month}`
}

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
  const mes = date.getMonth() + 1 // Los meses en JavaScript son base 0, por lo que necesitas sumar 1
  const anno = date.getFullYear()

  return `${nombreDia} ${diaMes < 10 ? '0' + diaMes : diaMes}`
}

export const ScheduleSection = () => {
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
          <Tabs
            variant="underlined"
            size="lg"
            className="text-center flex flex-col items-center"
            // fullWidth
          >
            {data?.map((item, index) => (
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
                        src="https://img.freepik.com/foto-gratis/primer-plano-microfono_107420-63821.jpg?t=st=1709942014~exp=1709945614~hmac=7c8e3fdb2bf268e836c534e9287ab897db505846f0c083b02140933dc42c6797&w=996"
                        alt={item?.title}
                        removeWrapper
                        className="w-full h-[420px] lg:h-[500px] object-cover"
                      />
                      <div className="absolute top-0 z-10 p-4 sm:p-8 lg:px-16 lg:py-32 space-y-4 ">
                        <h1 className="text-lg sm:text-2xl lg:text-4xl text-white font-bold">
                          {item?.title}
                        </h1>
                        <Button
                          size="lg"
                          color="success"
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
                  <ScrollShadow
                    orientation="vertical"
                    className="w-full"
                  >
                    <div className="mt-6 absolute z-20 bottom-0 right-0 grid grid-cols-4 gap-4 w-full max-w-3xl lg:max-w-6xl px-6">
                      {item?.events?.map((event, index) => (
                        <CardTimeline
                          key={index}
                          title={event?.name}
                          description={event?.description}
                          date={event?.date}
                        />
                      ))}
                    </div>
                  </ScrollShadow>
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>
        <div></div>
      </div>
    </section>
  )
}

const CardTimeline = ({
  title,
  description,
  date,
}: {
  title: string
  description: string
  date: string
}) => {
  const dateFormatted = formatDateToDDMMM(new Date(date))
  return (
    <div className="relative">
      <div className="bg-transparent pt-5">
        <Card
          className="border   p-3 sm:p-4 lg:px-4 lg:py-8"
          radius="sm"
          shadow="sm"
        >
          <CardBody>
            <Chip
              color="success"
              size="sm"
              radius="sm"
              className="text-white font-bold"
            >
              Tag
            </Chip>
            <div className="pt-4 space-y-2">
              <h2 className="text-xl font-bold leading-tight">{title}</h2>
              {/* <p>{date}</p> */}
              <div className="flex items-center space-x-2">
                <IconCalendarEvent size={16} />
                <span className="text-sm">{date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <IconClock size={16} />
                <span className="text-sm">10:00 - 12:00</span>
              </div>
              <div className="flex items-center space-x-2">
                <IconMapPin size={16} />
                <span className="text-sm">Location</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="bg-white px-4 py-1 absolute top-0 left-8 border-t-4 border-success-600 shadow-md">
        <div className="font-bold text-lg sm:text-xl lg:text-2xl">
          {dateFormatted}
        </div>
      </div>
    </div>
  )
}
