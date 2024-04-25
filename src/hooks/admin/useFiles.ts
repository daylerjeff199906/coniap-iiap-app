'use client'
import { useState } from 'react'
import { updateField } from '@/api'

import { storage } from '@/firebase/firebase'

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
    const response = await updateField(namePath, id, fieldToUpdate, value)
    if (response) {
      toast.success('Campo actualizado correctamente')
    } else {
      toast.error('Error al actualizar campo')
    }
    setLoading(false)
    return response
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

  const deleteImage = async (url: string) => {
    setLoading(true)
    try {
      const storageRef = ref(storage, `${url}`)
      await deleteObject(storageRef)
      setLoading(false)
      toast.success('Imagen eliminada correctamente')
      return true
    } catch (e) {
      console.error('Error deleting image: ', e)
      setLoading(false)
      return false
    }
  }

  return {
    loading,
    uploadImage,
    editField,
    deleteImage,
  }
}
