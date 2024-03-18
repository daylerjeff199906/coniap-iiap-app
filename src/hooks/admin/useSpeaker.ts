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
  updateDoc,
  where,
} from 'firebase/firestore'
import { ISpeaker } from '@/types'
import { toast } from 'sonner'

// const convertDataToISliders = (data: DocumentData[]) => {
//   return data?.map((slider) => {
//     const { image, name, tag, isActive, createdAt } = slider
//     const id = slider?.id

//     const fModificacion = slider?.updatedAt?.toDate().toString().slice(0, 15)
//     // acortar la fecha de modificacion

//     return {
//       id: id,
//       image,
//       name,
//       tag,
//       isActive,
//       createdAt,
//       updatedAt: fModificacion,
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

export function useSpeakers() {
  const [loading, setLoading] = useState<boolean>(true)
  //   const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)
  const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)
  //   const [slider, setSlider] = useState<ISliders | null>(null)

  //   const getSlider = async () => {
  //     setLoading(true)
  //     try {
  //       const querySnapshot = await getDocs(collection(db, 'slider'))
  //       const sliders = querySnapshot.docs.map((doc) => ({
  //         id: doc.id.toString(),
  //         ...doc.data(),
  //       }))
  //       setSliders(convertDataToISliders(sliders))
  //       setLoading(false)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  const getSpekers = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(query(collection(db, 'speakers')))

      const speakers = querySnapshot.docs.map((doc) => ({
        id: doc.id.toString(),
        ...doc.data(),
      }))
      setSpeakers(speakers as ISpeaker[])
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const editSpeakerField = async (
    id: string,
    fieldToUpdate: string,
    value: any
  ) => {
    setLoading(true)
    try {
      const productDocRef = doc(db, 'speakers', id)
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

  return {
    loading,
    speakers,
    getSpekers,
    editSpeakerField,
    // getSlider,
  }
}
