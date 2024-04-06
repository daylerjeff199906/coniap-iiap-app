import { useState } from 'react'
import { db, storage } from '@/firebase/firebase'
import {
  collection,
  getDocs,
  DocumentData,
  doc,
  DocumentReference,
  getDoc,
  query,
  // where,
  // orderBy,
  updateDoc,
  addDoc,
} from 'firebase/firestore'

import { fetchAllEvents, createEvent } from '@/api'

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
    try {
      const categoryRef: DocumentReference<DocumentData> = doc(db, 'events', id)
      const docSnap = await getDoc(categoryRef)
      if (docSnap.exists()) {
        // setEvent(convertDataToISlidersById(docSnap.data()))
        // add id to the object
        setEvent(docSnap.data() as IEvent)
        // return docSnap.data()
      } else {
        console.log('No such document!')
        setEvent(null)
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const updateEvent = async (id: string, data: IEvent) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const eventRef: DocumentReference<DocumentData> = doc(db, 'events', id)
      await updateDoc(eventRef, data as any)
      toast.success('Evento actualizado con exito')
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
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
    updateEvent,
    uploadImage,
  }
}
