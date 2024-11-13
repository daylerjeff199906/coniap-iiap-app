import { CardEvent } from '@/components'
import { IEvent } from '@/types'

interface IProps {
  data: IEvent[]
}

export const ListSheduleGroup = (props: IProps) => {
  const { data: events } = props

  const groupedEvents = events.reduce((acc, event) => {
    const hour = event.timeStart // Agrupar por la hora de inicio (ej. '09:00:00')
    if (!acc[hour]) {
      acc[hour] = []
    }
    acc[hour].push(event)
    return acc
  }, {} as Record<string, IEvent[]>)

  return (
    <section className="w-full">
      {Object.entries(groupedEvents).map(([hour, eventsAtHour], index) => (
        <div
          key={hour}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3 items-start border-b ">
            <div className="text-xl font-bold pr-4 sm:pr-6 lg:pr-8 w-full sm:min-w-[160px] sm:w-[160px] sticky top-20 z-10 bg-white sm:bg-transparent">
              {hour}
            </div>
            <div
              className={`grid grid-cols-1 gap-8 border-l pl-4 sm:pl-6 lg:pl-8
                ${
                  index === Object.entries(groupedEvents).length - 1
                    ? 'pb-0'
                    : 'pb-8'
                }
                `}
            >
              {eventsAtHour.map((event) => (
                <CardEvent
                  key={event.id}
                  event={event}
                  variant="list"
                  showImage={false}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
