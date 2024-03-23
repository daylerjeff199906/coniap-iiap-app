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
              <h4 className="subtitle-section-home">Eventos</h4>
              <h2 className="title-section-home">Próximos eventos</h2>
            </div>
          </motion.div>
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
