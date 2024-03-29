import { useState } from 'react'
import { IPerson } from '@/types'
import { toast } from 'sonner'
import { fetchSpeakers } from '@/api'

export function useSpeakers() {
  const [loading, setLoading] = useState<boolean>(false)
  const [speakers, setSpeakers] = useState<IPerson[] | null>(null)
  const [speaker, setSpeaker] = useState<IPerson | null>(null)

  const getSpekers = async (query: string) => {
    setLoading(true)
    const data = await fetchSpeakers(query)
      .then((res) => res)
      .catch((err) => err)
    setSpeakers(data)
    setLoading(false)
  }

  const geSpeakerById = async (id: string) => {
    // setLoading(true)
    // try {
    //   const categoryRef: DocumentReference<DocumentData> = doc(
    //     db,
    //     'speakers',
    //     id
    //   )
    //   const docSnap = await getDoc(categoryRef)
    //   if (docSnap.exists()) {
    //     // setEvent(convertDataToISlidersById(docSnap.data()))
    //     // add id to the object
    //     setSpeaker(docSnap.data() as ISpeaker)
    //     // return docSnap.data()
    //   } else {
    //     console.log('No such document!')
    //     setSpeaker(null)
    //   }
    //   setLoading(false)
    // } catch (error) {
    //   console.log(error)
    //   setLoading(false)
    // }
  }

  const createSpeaker = async (data: IPerson) => {
    // setLoading(true)
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 2000))
    //   const docRef = await addDoc(collection(db, 'speakers'), data)
    //   // console.log('Document written with ID: ', docRef.id)
    //   toast.success(`Ponente creado con exito, ID: ${docRef.id}`)
    //   setLoading(false)
    //   return docRef.id
    // } catch (error) {
    //   setLoading(false)
    //   console.log(error)
    //   return null
    // }
  }

  const updateSpeaker = async (id: string, data: IPerson) => {
    // setLoading(true)
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 2000))
    //   const eventRef: DocumentReference<DocumentData> = doc(db, 'speakers', id)
    //   await updateDoc(eventRef, data as any)
    //   toast.success('Ponente actualizado con exito')
    //   setLoading(false)
    // } catch (error) {
    //   console.log(error)
    //   setLoading(false)
    // }
  }

  const editSpeakerField = async (
    id: string,
    fieldToUpdate: string,
    value: any
  ) => {
    // setLoading(true)
    // try {
    //   const productDocRef = doc(db, 'speakers', id)
    //   await updateDoc(productDocRef, {
    //     [fieldToUpdate]: value,
    //   })
    //   toast.success(
    //     `Campo ${fieldToUpdate} actualizado con exito en el evento ${id}`
    //   )
    //   setLoading(false)
    // } catch (e) {
    //   console.error('Error adding document: ', e)
    //   setLoading(false)
    // }
  }

  const uploadImage = async (file: File): Promise<string> => {
    // setLoading(true)
    // try {
    //   const storageRef = ref(storage, `speakers/${file.name}`)
    //   await uploadBytes(storageRef, file)

    //   const url = await getDownloadURL(storageRef)
    //   setLoading(false)
    //   return url
    // } catch (e) {
    //   console.error('Error uploading image: ', e)
    //   setLoading(false)
    // }
    return ''
  }

  return {
    loading,
    speakers,
    getSpekers,
    editSpeakerField,
    createSpeaker,
    uploadImage,
    geSpeakerById,
    speaker,
    updateSpeaker,
    // getSlider,
  }
}
