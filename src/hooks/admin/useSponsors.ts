import { useState } from 'react'
import { ISponsor } from '@/types'
import { toast } from 'sonner'

import { fetchSponsors } from '@/api'

export function useSponsors() {
  const [loading, setLoading] = useState<boolean>(false)
  //   const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)
  const [sponsors, setSponsors] = useState<ISponsor[] | null>(null)
  const [sponsor, setSponsor] = useState<ISponsor | null>(null)

  const getSponsors = async (query: string) => {
    setLoading(true)
    const data = await fetchSponsors(query)
      .then((res) => res)
      .catch((err) => err)
    setSponsors(data)
    setLoading(false)
  }

  const createSponsor = async (data: ISponsor) => {
    setLoading(true)
  }

  const updateSponsor = async (id: string, data: ISponsor) => {
    setLoading(true)
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 2000))
    //   const eventRef: DocumentReference<DocumentData> = doc(db, 'sponsors', id)
    //   await updateDoc(eventRef, data as any)
    //   toast.success('Colaborador actualizado con exito')
    //   setLoading(false)
    // } catch (error) {
    //   console.log(error)
    //   setLoading(false)
    // }
  }

  const getSponsorById = async (id: string) => {
    setLoading(true)
    // try {
    //   const categoryRef: DocumentReference<DocumentData> = doc(
    //     db,
    //     'sponsors',
    //     id
    //   )
    //   const docSnap = await getDoc(categoryRef)
    //   if (docSnap.exists()) {
    //     setSponsor(docSnap.data() as ISponsor)
    //     // return docSnap.data()
    //   } else {
    //     console.log('No such document!')
    //   }

    //   setLoading(false)
    // } catch (error) {
    //   console.log(error)
    // }
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
