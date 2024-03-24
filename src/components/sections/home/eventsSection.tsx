'use client'
import { motion } from 'framer-motion'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from '@nextui-org/react'

export const EventsSection = () => {
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
              {/* <h3 className="text-lg">
                Fomentando un Diálogo Multidisciplinario para el Avance
                Sostenible Globalmente.
              </h3> */}
            </div>
          </header>
          <div>
            <EventCard />
          </div>
        </div>
      </section>
    </>
  )
}

const EventCard = () => {
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
