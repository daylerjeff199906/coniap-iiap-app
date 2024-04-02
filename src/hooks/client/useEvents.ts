'use client'
import { useState } from 'react'
import { IEvent } from '@/types'
import { fetchEvents } from '@/api'

export function useEvents() {
  const [loading, setLoading] = useState<boolean>(true)
  const [events, setEvents] = useState<IEvent[] | null>(null)
  // const [event, setEvent] = useState<IEvent | null>(null)

  const getEventsActive = async (query: string, date: string) => {
    setLoading(true)
    const data = await fetchEvents({ query, date })
      .then((res) => res)
      .catch((err) => err)
    setEvents(data)
    setLoading(false)
  }

  const getEventById = async (id: string) => {}

  return {
    loading,
    getEventById,
    // event,
    events,
    getEventsActive,
  }
}
