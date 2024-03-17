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
  const [loading, setLoading] = useState<boolean>(true)
  //   const [programs, setPrograms] = useState<IProgram[] | null>(null)
  //   const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)

  //   const [slider, setSlider] = useState<ISliders | null>(null)

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

  //   const getSpekersActive = async () => {
  //     setLoading(true)
  //     try {
  //       const querySnapshot = await getDocs(
  //         query(collection(db, 'speakers'), where('isActive', '==', true))
  //       )

  //       const speakers = querySnapshot.docs.map((doc) => ({
  //         id: doc.id.toString(),
  //         ...doc.data(),
  //       }))
  //       setSpeakersActive(speakers as ISpeaker[])
  //       setLoading(false)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   const getSliderById = async (id: string) => {
  //     setLoading(true)
  //     try {
  //       const categoryRef: DocumentReference<DocumentData> = doc(db, 'slider', id)
  //       const docSnap = await getDoc(categoryRef)
  //       if (docSnap.exists()) {
  //         setSlider(convertDataToISlidersById(docSnap.data()))
  //       } else {
  //         console.log('No such document!')
  //       }

  //       setLoading(false)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  return {
    loading,
    createEvent,
    // getPrograms,
    // programs,
    // getSlider,
  }
}
