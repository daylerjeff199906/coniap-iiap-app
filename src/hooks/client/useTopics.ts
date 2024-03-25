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
  // where,
} from 'firebase/firestore'
import { ITopic } from '@/types'

export function useTopics() {
  const [loading, setLoading] = useState<boolean>(false)
  //   const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)
  const [topics, setTopics] = useState<ITopic[] | null>(null)
  const [topic, setTopic] = useState<ITopic | null>(null)

  const getTopics = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'topics'), where('isActived', '==', true))
      )

      const topics = querySnapshot.docs.map((doc) => ({
        id: doc.id.toString(),
        ...doc.data(),
      }))

      setLoading(false)
      setTopics(topics as ITopic[])
    } catch (error) {
      console.log(error)
    }
  }

  const getTopicById = async (id: string) => {
    setLoading(true)
    try {
      const categoryRef: DocumentReference<DocumentData> = doc(db, 'topics', id)
      const docSnap = await getDoc(categoryRef)
      if (docSnap.exists()) {
        setTopic(docSnap.data() as ITopic)
        // return docSnap.data()
      } else {
        console.log('No such document!')
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  //get topics with supabase
  // async function getTopicsActive() {
  //   const response = await fetch(`${API_URL}/topics`, {
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
    topics,
    getTopics,
    getTopicById,
    topic,
    // getTopicsActive,
  }
}
