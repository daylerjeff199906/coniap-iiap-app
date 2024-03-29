/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

import { useLogicEventToProgram } from '@/providers'
import { IEvent } from '@/types'

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

function filterEventsToProgram(
  events: IEvent[] | null,
  idProgram: string | undefined
) {
  if (!events) return []
  return events.filter((event) => event.idProgram === idProgram)
}

export const CalendarSection = () => {
  const [view, setView] = useState('day')

  const { program, getEvents, events } = useLogicEventToProgram()

  useEffect(() => {
    getEvents('')
  }, [])

  return (
    <>
      <div className="">
        <Calendar
          localizer={localizer}
          events={events as any}
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
