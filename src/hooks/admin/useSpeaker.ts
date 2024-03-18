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
} from 'firebase/firestore'
import { ISpeaker } from '@/types'

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
  const [speakersActive, setSpeakersActive] = useState<ISpeaker[] | null>(null)
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

  const getSpekersActive = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(query(collection(db, 'speakers')))

      const speakers = querySnapshot.docs.map((doc) => ({
        id: doc.id.toString(),
        ...doc.data(),
      }))
      setSpeakersActive(speakers as ISpeaker[])
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

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
    speakersActive,
    getSpekersActive,
    // getSlider,
  }
}
