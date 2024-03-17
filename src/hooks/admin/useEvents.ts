import { useState } from 'react'
import { db } from '@/firebase/firebase'
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
import { IEvent } from '@/types'
import { toast } from 'sonner'

// const convertDataToIProgram = (data: DocumentData[]) => {
//   return data?.map((program) => {
//     const { banner, events, date, title } = program
//     const id = program?.id

//     const FDate = program?.date.toDate()
//     // acortar la fecha de modificacion

//     return {
//       id: id,
//       banner,
//       events,
//       date: FDate,
//       title,
//     }
//   })
// }

// const convertDataToISlidersById = (data: DocumentData) => {
//   const { image, name, tag, isActive, createdAt, updatedAt } = data
//   const id = data?.id

//   // acortar la fecha de modificacion

//   return {
//     id: id,
//     image,
//     name,
//     tag,
//     isActive,
//     createdAt,
//     updatedAt,
//   }
// }

function convertTimestampToDate(timestamp: any) {
  const date = new Date(timestamp * 1000) // Multiplicamos por 1000 para convertir segundos a milisegundos
  return date.toLocaleDateString() // Utilizamos toLocaleDateString para obtener la fecha en formato local
}

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
    } catch (error) {
      console.log(error)
    }
  }

  const getEvents = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(query(collection(db, 'events')))

      const speakers = querySnapshot.docs.map((doc) => ({
        id: doc.id.toString(),
        ...doc.data(),
      }))
      setEvents(speakers as IEvent[])
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
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

  return {
    loading,
    createEvent,
    getEvents,
    events,
    getEventById,
    event,
    updateEvent,
    // getPrograms,
    // programs,
    // getSlider,
  }
}
