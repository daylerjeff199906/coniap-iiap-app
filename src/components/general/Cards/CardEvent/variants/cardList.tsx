import { IEvent } from '@/types'
import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Image,
  User,
} from '@nextui-org/react'
import {
  IconCalendarEvent,
  IconClockHour12,
  IconArrowRight,
} from '@tabler/icons-react'
import logo from '@/assets/images/logo_coniap_simple.webp'
import Link from 'next/link'

interface IProps {
  event: IEvent
  showImage?: boolean
}

export const CardListEvent = (props: IProps) => {
  const { event, showImage } = props
  return (
    <>
      <Card
        shadow="none"
        className="border-nonw w-full"
        isPressable
        isHoverable
        as={Link}
        href={`/eventos/${event.id}`}
      >
        <CardBody>
          <div className="grid grid-cols-12 gap-4 w-full">
            {showImage && (
              <div className="col-span-3">
                <Image
                  src={event?.banner || logo.src}
                  alt={event?.name}
                  removeWrapper
                  radius="none"
                  className="w-full h-full object-cover bg-gray-300"
                />
              </div>
            )}
            <div
              className={`${
                showImage ? 'col-span-9' : 'col-span-12'
              } flex flex-col gap-4 h-full`}
            >
              <section className="w-full h-full">
                <Chip
                  size="sm"
                  radius="sm"
                  className="bg-stone-900 text-white mb-2"
                >
                  Sala {event.sala_name}
                </Chip>
                <div className="pb-2">
                  <h1 className="font-bold sm:text-lg">{event.name}</h1>
                  <p className="text-xs">{event.shortDescription}</p>
                </div>
                <div className="text-xs font-bold">
                  <div className="flex gap-2 items-center">
                    <IconCalendarEvent size={14} />
                    <h2>{event.date}</h2>
                  </div>

                  <div className="flex gap-2 items-center">
                    <IconClockHour12 size={14} />
                    <h3>
                      Desde las {event.timeStart} a {event.timeEnd}
                    </h3>
                  </div>
                </div>
              </section>
              <section className="space-y-2">
                <Divider />
                <div className="flex items-center justify-between">
                  <User
                    avatarProps={{ src: event?.summary?.person?.image || '' }}
                    name={
                      event?.summary?.person?.name +
                        ' ' +
                        event?.summary?.person?.surName || 'Nombre de ponente'
                    }
                    description={
                      event?.summary?.person?.institution || 'Institucion'
                    }
                  />
                  <Button
                    color="primary"
                    radius="full"
                    size="sm"
                    endContent={<IconArrowRight size={16} />}
                    variant="light"
                    as={Link}
                    href={`/eventos/${event.id}`}
                  >
                    Ver más
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
