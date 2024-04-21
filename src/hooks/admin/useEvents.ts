import { useState } from 'react'
import { db, storage } from '@/firebase/firebase'

import { fetchAllEvents, createEvent, fetchEventById, updateEvent } from '@/api'

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

import { IEvent } from '@/types'
import { toast } from 'sonner'

export function useEvents() {
  const [loading, setLoading] = useState<boolean>(false)
  const [events, setEvents] = useState<IEvent[] | null>(null)
  const [event, setEvent] = useState<IEvent | null>(null)

  const createDataEvent = async (data: IEvent) => {
    setLoading(true)
    const res = await createEvent(data)

    if (res) {
      toast.success('Evento creado con exito')
    } else {
      toast.error('Error al crear el programa')
    }
    setLoading(false)
    return res
  }

  const getEvents = async (query: string, column?: string) => {
    setLoading(true)
    const data = await fetchAllEvents(query, column)
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

  const updateDataEvent = async (id: string, data: IEvent) => {
    setLoading(true)
    const res = await updateEvent(id, data)
    if (res) {
      toast.success('Evento actualizado con exito')
    } else {
      toast.error('Error al actualizar el evento', {
        description: 'Intente nuevamente',
      })
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
    events,
    getEventById,
    event,
    updateDataEvent,
    uploadImage,
  }
}
