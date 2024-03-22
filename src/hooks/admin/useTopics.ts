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
import { ITopic } from '@/types'
import { toast } from 'sonner'

export function useTopics() {
  const [loading, setLoading] = useState<boolean>(false)
  //   const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)
  const [topics, setTopics] = useState<ITopic[] | null>(null)
  const [topic, setTopic] = useState<ITopic | null>(null)

  const getTopics = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(query(collection(db, 'topics')))

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

  const creatTopic = async (data: ITopic) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const docRef = await addDoc(collection(db, 'topics'), data)
      // console.log('Document written with ID: ', docRef.id)
      toast.success(`Nuevo tema añadido con éxito, ID: ${docRef.id}`)
      setLoading(false)
      return docRef.id
    } catch (error) {
      setLoading(false)
      console.log(error)
      return null
    }
  }

  const updateTopic = async (id: string, data: ITopic) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const eventRef: DocumentReference<DocumentData> = doc(db, 'topics', id)
      await updateDoc(eventRef, data as any)
      toast.success('Colaborador actualizado con exito')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
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

  return {
    loading,
    topics,
    getTopics,
    getTopicById,
    creatTopic,
    updateTopic,
    topic,
  }
}
