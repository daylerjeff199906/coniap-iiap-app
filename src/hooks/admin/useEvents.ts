'use client'
import { useState } from 'react'
import { storage } from '@/firebase/firebase'

import {
  fetchAllEvents,
  createEvent,
  fetchEventById,
  updateEvent,
  fetchEvents,
} from '@/api'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { IEvent, IEventFilter, IEventRes, IRes } from '@/types'
import { toast } from 'react-toastify'

export function useEvents() {
  const [loading, setLoading] = useState<boolean>(false)
  const [events, setEvents] = useState<{
    event: IEvent[]
    count: number
  } | null>(null)
  const [event, setEvent] = useState<IEvent | null>(null)

  const createDataEvent = async (data: IEventRes) => {
    setLoading(true)
    const res: IRes = (await createEvent(data)) as IRes

    if (res.message) {
      toast.error(`Error al crear el evento: ${res.message}`)
    } else {
      toast.success('Evento creado con exito')
    }
    setLoading(false)
    return res
  }

  const getEvents = async (query: IEventFilter) => {
    setLoading(true)
    const data = await fetchEvents(query)
      .then((res) => res)
      .catch((err) => err)
    setEvents(data)
    setLoading(false)
  }

  const getEventById = async (id: string) => {
    setLoading(true)
    const data = await fetchEventById(id)
      .then((res) => res)
      .catch((err) => err)
    setEvent(data)
    setLoading(false)
  }

  const updateDataEvent = async (id: string, data: IEventRes) => {
    setLoading(true)
    const res: IRes = (await updateEvent(id, data)) as IRes
    if (res.message) {
      toast.error(`Error al actualizar el evento: ${res.message}`)
    } else {
      toast.success('Evento actualizado con exito')
    }
    setLoading(false)
    return res
  }

  const uploadImage = async (file: File): Promise<string> => {
    setLoading(true)
    try {
      const storageRef = ref(storage, `events/${file.name}`)
      await uploadBytes(storageRef, file)

      const url = await getDownloadURL(storageRef)
      setLoading(false)
      return url
    } catch (e) {
      console.error('Error uploading image: ', e)
      setLoading(false)
      return ''
    }
  }

  return {
    loading,
    createDataEvent,
    getEvents,
    setEvents,
    events,
    getEventById,
    event,
    updateDataEvent,
    uploadImage,
  }
}
