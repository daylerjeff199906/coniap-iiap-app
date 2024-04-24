'use client'
import { useState } from 'react'
import { IEvent } from '@/types'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

interface IProps {
  data: Array<IEvent>
}

const resourcesMap = [
  { resourceId: '1', resourceTitle: 'Sala 1' },
  { resourceId: '2', resourceTitle: 'Sala 2' },
]

const transformEvent = (event: IEvent) => {
  const startTime = new Date(event?.date as unknown as string)
  startTime.setHours(parseInt(event.timeStart, 10), 10, 0, 0)

  const endTime = new Date(event?.date as unknown as string)
  endTime.setHours(parseInt(event.timeEnd, 10), 10, 0, 0)

  return {
    id: event.id,
    title: event.name,
    start: startTime,
    end: endTime,
    resourceId: event.sala,
  }
}

const transformEvents = (events: Array<IEvent>) => {
  return events.map((event) => transformEvent(event))
}

export const Calendary = (props: IProps) => {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState('day')
  const { data } = props

  return (
    <>
      <div className="">
        <Calendar
          localizer={localizer}
          events={transformEvents(data)}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          //   resources={resourcesMap}
          //   resourceIdAccessor="resourceId"
          //   resourceTitleAccessor="resourceTitle"
          view={view as any}
          views={['day', 'agenda', 'month', 'week']}
        //   defaultDate={date}
          onView={(view) => setView(view)}
        //   onSelectEvent={(event) => console.log('event', event)}
          onNavigate={(date) => setDate(date)}
          //   defaultDate={new Date()}
          //   min={new Date(2021, 0, 0, 8, 0, 0)}
          //   max={new Date(2021, 0, 0, 22, 0, 0)}
        />
      </div>
    </>
  )
}
