'use client'
import { IEvent } from '@/types'
// import { motion } from 'framer-motion'
import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react'

interface IProps {
  events: IEvent[] | undefined
}

export const EventsSection = (props: IProps) => {
  const { events } = props
  return (
    <>
      <section className="bg-white section-home">
        <div className="container space-y-6">
          <header>
            <div className="flex items-center gap-3 pb-3">
              <div className="dot-custom" />
              <p className="text-xs font-semibold">#eventos- 2024</p>
            </div>
            <div className="w-full max-w-4xl">
              <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
                Próximos <b>eventos</b>
              </h2>
            </div>
          </header>
          <div>
            {events &&
              events.map((event, i) => (
                <EventCard
                  key={i}
                  data={event}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  )
}

const EventCard = ({ data }: { data: IEvent }) => {
  return (
    <Card
      className="bg-white max-w-sm"
      radius="sm"
      shadow="none"
    >
      <Image
        src="https://via.placeholder.com/300x200"
        alt="Event"
        removeWrapper
        className=""
        radius="none"
      />
      <CardBody className="px-0">
        <h3 className="text-sm sm:text-lg xl:text-xl font-bold">Evento</h3>
        <p className="text-sm line-clamp-3">Descripción del evento</p>
      </CardBody>
      <CardFooter className="flex justify-end px-0">
        <Button
          radius="full"
          variant="flat"
        >
          Ver más
        </Button>
      </CardFooter>
    </Card>
  )
}
