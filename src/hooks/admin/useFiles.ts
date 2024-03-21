import { useState } from 'react'
import { db, storage } from '@/firebase/firebase'
import {
  collection,
  getDocs,
  DocumentData,
  doc,
  DocumentReference,
  getDoc,
  query,
  // where,
  // orderBy,
  updateDoc,
  addDoc,
} from 'firebase/firestore'

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

import { toast } from 'sonner'

export function useFiles() {
  const [loading, setLoading] = useState<boolean>(false)

  const editField = async (
    id: string,
    namePath: string,
    fieldToUpdate: string,
    value: any
  ) => {
    setLoading(true)
    try {
      const productDocRef = doc(db, namePath, id)
      await updateDoc(productDocRef, {
        [fieldToUpdate]: value,
      })
      toast.success(`Campo ${fieldToUpdate} actualizado con exito de id: ${id}`)
      setLoading(false)
    } catch (e) {
      console.error('Error adding document: ', e)
      setLoading(false)
    }
  }

  const uploadImage = async (namePath: string, file: File): Promise<string> => {
    setLoading(true)
    try {
      const storageRef = ref(storage, `${namePath}/${file.name}`)
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
    uploadImage,
    editField,
  }
}
