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

import { fetchAllEvents } from '@/api'

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

  const createEvent = async (data: IEvent) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const docRef = await addDoc(collection(db, 'events'), data)
      // console.log('Document written with ID: ', docRef.id)
      toast.success(`Evento creado con exito, ID: ${docRef.id}`)
      setLoading(false)
      return docRef.id
    } catch (error) {
      console.log(error)
    }
  }

  const getEvents = async (query: string) => {
    setLoading(true)
    const data = await fetchAllEvents(query)
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

  const editEventField = async (
    id: string,
    fieldToUpdate: string,
    value: any
  ) => {
    setLoading(true)
    try {
      const productDocRef = doc(db, 'events', id)
      await updateDoc(productDocRef, {
        [fieldToUpdate]: value,
      })
      toast.success(
        `Campo ${fieldToUpdate} actualizado con exito en el evento ${id}`
      )
      setLoading(false)
    } catch (e) {
      console.error('Error adding document: ', e)
      setLoading(false)
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
    createEvent,
    getEvents,
    events,
    getEventById,
    event,
    updateEvent,
    editEventField,
    uploadImage,
  }
}
