'use client'
import { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

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
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2024, 0, 23, 14, 0, 0),
    end: new Date(2024, 0, 23, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2024, 0, 23, 8, 30, 0),
    end: new Date(2024, 0, 23, 12, 30, 0),
    resourceId: [1, 2],
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2024, 0, 23, 7, 0, 0),
    end: new Date(2024, 0, 23, 10, 30, 0),
    resourceId: 2,
  },
]

export const CalendarSection = () => {
  const [view, setView] = useState('day')
  return (
    <>
      <div className="">
        <Calendar
          localizer={localizer}
          events={events}
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
