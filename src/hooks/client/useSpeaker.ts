const API_URL = process.env.APP_URL_PROD
const API_KEY = process.env.APP_API_KEY
const API_AUTH = process.env.APP_API_AUTH

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

export function useSpeaker() {
  const [loading, setLoading] = useState<boolean>(true)
  const [speakersActive, setSpeakersActive] = useState<ISpeaker[] | null>(null)

  const getSpekersActive = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'speakers'), where('isActive', '==', true))
      )

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

  // async function getSpeakersActive() {
  //   const response = await fetch(`${API_URL}/speakers`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       apikey: `${API_KEY}`, // Reemplaza 'tu-api-key-de-supabase' con tu API key de Supabase
  //       authorization: `Bearer ${API_AUTH}`,
  //     },
  //   })
  //   if (response.ok) {
  //     console.log(response)
  //     return response.json()
  //   } else {
  //     console.log(response)
  //     throw new Error('Error al obtener los datos')
  //   }
  // }

  return {
    loading,
    speakersActive,
    getSpekersActive,
    // getSlider,
    // getSpeakersActive,
  }
}
