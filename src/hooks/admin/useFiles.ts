import { useState } from 'react'
import { updateField } from '@/api'

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

  const uploadImage = async (namePath: string, file: File): Promise<string> => {
    setLoading(true)
    // try {
    //   const storageRef = ref(storage, `${namePath}/${file.name}`)
    //   await uploadBytes(storageRef, file)

    //   const url = await getDownloadURL(storageRef)
    //   setLoading(false)
    //   return url
    // } catch (e) {
    //   console.error('Error uploading image: ', e)
    //   setLoading(false)
    //   return ''
    // }
    return ''
  }

  return {
    loading,
    uploadImage,
    editField,
  }
}
