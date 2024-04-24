'use client'
import { useEffect, useState } from 'react'
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

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2024, 0, 23, 9, 0, 0),
    end: new Date(2024, 0, 23, 13, 0, 0),
    resourceId: 1,
  },
]

const transformEvent = (event: IEvent) => {
  const startTime = new Date(event?.date as unknown as string)
  startTime.setHours(parseInt(event.timeStart, 10), 10, 0, 0)
  console.log('startTime', startTime)
  return {
    id: event.id,
    title: event.name,
    start: startTime,
    end: new Date(event.timeEnd),
    resourceId: event.sala,
  }
}

export const Calendary = (props: IProps) => {
  const [view, setView] = useState('day')
  const { data } = props
  return (
    <>
      <div className="">
        <Calendar
          localizer={localizer}
          //   events={events as any}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          resources={resourcesMap}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          view={view as any}
          onView={(view) => setView(view)}
          views={['day', 'agenda']}
          defaultDate={new Date()}
          min={new Date(2021, 0, 0, 8, 0, 0)}
          max={new Date(2021, 0, 0, 22, 0, 0)}
        />
      </div>
    </>
  )
}
