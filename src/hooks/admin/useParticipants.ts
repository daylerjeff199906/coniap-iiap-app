import { useState } from 'react'
import { db, storage } from '@/firebase/firebase'
import {
  collection,
  getDocs,
  DocumentData,
  doc,
  DocumentReference,
  getDoc,
  addDoc,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { IParticipants, ISpeaker } from '@/types'
import { toast } from 'sonner'

export function useSpeakers() {
  const [loading, setLoading] = useState<boolean>(false)
  const [participant, setParticipant] = useState<IParticipants | null>(null)
  const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)
  const [speaker, setSpeaker] = useState<ISpeaker | null>(null)

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
      setLoading(false)
    }
  }

  const geSpeakerById = async (id: string) => {
    setLoading(true)
    try {
      const categoryRef: DocumentReference<DocumentData> = doc(
        db,
        'speakers',
        id
      )
      const docSnap = await getDoc(categoryRef)
      if (docSnap.exists()) {
        // setEvent(convertDataToISlidersById(docSnap.data()))
        // add id to the object
        setSpeaker(docSnap.data() as ISpeaker)
        // return docSnap.data()
      } else {
        console.log('No such document!')
        setSpeaker(null)
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const createParticipant = async (data: IParticipants) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const docRef = await addDoc(collection(db, 'participants'), data)
      // console.log('Document written with ID: ', docRef.id)
      toast.success(
        `Su inscripción fue registrada creado con exito, ID: ${docRef.id}`
      )
      setLoading(false)
      return docRef.id
    } catch (error) {
      setLoading(false)
      console.log(error)
      return null
    }
  }

  const updateSpeaker = async (id: string, data: ISpeaker) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const eventRef: DocumentReference<DocumentData> = doc(db, 'speakers', id)
      await updateDoc(eventRef, data as any)
      toast.success('Ponente actualizado con exito')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
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

  const uploadImage = async (file: File): Promise<string> => {
    setLoading(true)
    try {
      const storageRef = ref(storage, `speakers/${file.name}`)
      await uploadBytes(storageRef, file)

      const url = await getDownloadURL(storageRef)
      setLoading(false)
      return url
    } catch (e) {
      console.error('Error uploading image: ', e)
      setLoading(false)
      return ''
    }
  }

  return {
    loading,
    speakers,
    getSpekers,
    editSpeakerField,
    createParticipant,
    uploadImage,
    geSpeakerById,
    speaker,
    updateSpeaker,
    // getSlider,
  }
}
