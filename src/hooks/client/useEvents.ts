import { useState } from 'react'
import { IEvent } from '@/types'

export function useEvents() {
  const [loading, setLoading] = useState<boolean>(true)
  const [events, setEvents] = useState<IEvent[] | null>(null)
  const [event, setEvent] = useState<IEvent | null>(null)

  const getEventsActive = async () => {}

  const getEventById = async (id: string) => {}

  return {
    loading,
    getEventById,
    event,
    events,
    getEventsActive,
  }
}
