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
  updateDoc,
  // where,
} from 'firebase/firestore'
import { ISponsor } from '@/types'
import { toast } from 'sonner'

export function useSponsors() {
  const [loading, setLoading] = useState<boolean>(false)
  //   const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)
  const [sponsors, setSponsors] = useState<ISponsor[] | null>(null)
  const [sponsor, setSponsor] = useState<ISponsor | null>(null)

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

  const updateSponsor = async (id: string, data: ISponsor) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const eventRef: DocumentReference<DocumentData> = doc(db, 'sponsors', id)
      await updateDoc(eventRef, data as any)
      toast.success('Colaborador actualizado con exito')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const getSponsorById = async (id: string) => {
    setLoading(true)
    try {
      const categoryRef: DocumentReference<DocumentData> = doc(
        db,
        'sponsors',
        id
      )
      const docSnap = await getDoc(categoryRef)
      if (docSnap.exists()) {
        setSponsor(docSnap.data() as ISponsor)
        // return docSnap.data()
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
    sponsors,
    getSponsors,
    createSponsor,
    getSponsorById,
    sponsor,
    updateSponsor,
  }
}
