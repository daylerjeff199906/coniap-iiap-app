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
  where,
  orderBy,
} from 'firebase/firestore'
import { IEvent } from '@/types'

const convertDataToIProgram = (data: DocumentData[]) => {
  return data?.map((program) => {
    const { banner, events, date, title } = program
    const id = program?.id

    const FDate = program?.date.toDate()
    // acortar la fecha de modificacion

    return {
      id: id,
      banner,
      events,
      date: FDate,
      title,
    }
  })
}

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
  const [loading, setLoading] = useState<boolean>(true)
  const [events, setEvents] = useState<IEvent[] | null>(null)
  const [event, setEvent] = useState<IEvent | null>(null)
  //   const [programs, setPrograms] = useState<IProgram[] | null>(null)
  //   const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)

  //   const [slider, setSlider] = useState<ISliders | null>(null)

  //   const getPrograms = async () => {
  //     setLoading(true)
  //     try {
  //       const querySnapshot = await getDocs(
  //         query(collection(db, 'programs'), orderBy('date', 'asc'))
  //       )
  //       const program = querySnapshot.docs.map((doc) => ({
  //         id: doc.id.toString(),
  //         date: convertTimestampToDate(doc.data().date.seconds),
  //         ...doc.data(),
  //       }))
  //       //   setSliders(convertDataToISliders(sliders))
  //       setPrograms(convertDataToIProgram(program))
  //       setLoading(false)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  const getEventsActive = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'events'), where('isActive', '==', true))
      )

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
        setEvent(docSnap.data() as IEvent)
      } else {
        console.log('No such document!')
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    loading,
    getEventById,
    event,
    events,
    getEventsActive,
  }
}
