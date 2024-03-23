import { IEvent } from '@/types'
import { Card, CardBody, Image } from '@nextui-org/react'

interface IProps {
  event: IEvent
}

export const CardEventLarge = (props: IProps) => {
  const { event } = props
  return (
    <>
      <Card
        shadow="none"
        className="border-none w-full"
      >
        <CardBody>
          <div className="grid grid-cols-12 w-full">
            <div className="col-span-2"></div>
            <div className="col-span-10 flex gap-4">
              <section className="w-24 h-24">
                <Image
                  src={event?.banner}
                  alt={event.name}
                  removeWrapper
                />
              </section>
              <section>
                <div>
                  <h1 className="font-bold">{event.name}</h1>
                  <p>{event.shortDescription}</p>
                </div>
                <div>
                  <h2>{event.date}</h2>
                  <h3>
                    {event.timeStart} - {event.timeEnd}
                  </h3>
                </div>
              </section>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
