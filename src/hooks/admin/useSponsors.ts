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
  addDoc,
  where,
} from 'firebase/firestore'
import { ISponsor } from '@/types'
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

export function useSponsors() {
  const [loading, setLoading] = useState<boolean>(true)
  //   const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)
  const [sponsors, setSponsors] = useState<ISponsor[] | null>(null)
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

  const getSponsors = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(query(collection(db, 'sponsors')))

      const sponsor = querySnapshot.docs.map((doc) => ({
        id: doc.id.toString(),
        ...doc.data(),
      }))

      setLoading(false)
      setSponsors(sponsor as ISponsor[])
    } catch (error) {
      console.log(error)
    }
  }

  const createSponsor = async (data: ISponsor) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const docRef = await addDoc(collection(db, 'sponsors'), data)
      // console.log('Document written with ID: ', docRef.id)
      toast.success(`Colaborador añadido con éxito, ID: ${docRef.id}`)
      setLoading(false)
      return docRef.id
    } catch (error) {
      setLoading(false)
      console.log(error)
      return null
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
    sponsors,
    getSponsors,
    createSponsor,
    // getSlider,
  }
}
