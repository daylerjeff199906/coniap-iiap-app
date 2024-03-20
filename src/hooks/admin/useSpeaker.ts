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
import { ISpeaker } from '@/types'
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

export function useSpeakers() {
  const [loading, setLoading] = useState<boolean>(false)
  const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)
  const [speaker, setSpeaker] = useState<ISpeaker | null>(null)
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
    }
  }

  const createSpeaker = async (data: ISpeaker) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const docRef = await addDoc(collection(db, 'speakers'), data)
      // console.log('Document written with ID: ', docRef.id)
      toast.success(`Ponente creado con exito, ID: ${docRef.id}`)
      setLoading(false)
      return docRef.id
    } catch (error) {
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
    createSpeaker,
    uploadImage,
    geSpeakerById,
    speaker,
    updateSpeaker,
    // getSlider,
  }
}
