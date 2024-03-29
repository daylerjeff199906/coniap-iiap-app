'use client'
import { useState } from 'react'
import { IEvent } from '@/types'
import { fetchEvents } from '@/api'

export function useEvents() {
  const [loading, setLoading] = useState<boolean>(true)
  const [events, setEvents] = useState<IEvent[] | null>(null)
  // const [event, setEvent] = useState<IEvent | null>(null)

  return {
    loading,
  }
}
