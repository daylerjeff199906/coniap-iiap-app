import { useState } from 'react'
import { updateField, addFileToStorage } from '@/api'

//
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
  }

  const uploadImage = async (namePath: string, file: File) => {
    setLoading(true)
    const response = await addFileToStorage(file, namePath)
    console.log('response', response)
    if (response) {
      toast.success('Imagen subida correctamente')
    } else {
      toast.error('Error al subir imagen')
    }
    setLoading(false)
    return response
  }

  return {
    loading,
    uploadImage,
    editField,
  }
}
