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
import { IProgram } from '@/types'

export function usePrograms() {
  const [loading, setLoading] = useState<boolean>(false)
  const [programs, setPrograms] = useState<IProgram[] | null>(null)

  const getPrograms = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, 'programs'),
          orderBy('date', 'asc'),
          where('isActived', '==', true)
        )
      )
      const program = querySnapshot.docs.map((doc) => ({
        id: doc.id.toString(),
        ...doc.data(),
      }))
      //   setSliders(convertDataToISliders(sliders))
      setPrograms(program as IProgram[])
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

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
    getPrograms,
    programs,
  }
}
