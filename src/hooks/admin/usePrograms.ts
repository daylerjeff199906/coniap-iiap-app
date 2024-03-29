import { useState } from 'react'
import { IProgram } from '@/types'
import { fetchPrograms, updateProgram, updateFieldProgram } from '@/api'
import { toast } from 'sonner'

export function usePrograms() {
  const [loading, setLoading] = useState<boolean>(false)
  const [programs, setPrograms] = useState<IProgram[] | null>(null)
  const [program, setProgram] = useState<IProgram | null>(null)

  const getPrograms = async (query: string) => {
    setLoading(true)
    const data = await fetchPrograms(query)
      .then((res) => res)
      .catch((err) => err)
    setPrograms(data)
    setLoading(false)
  }

  const createProgram = async (data: IProgram) => {
    // setLoading(true)
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 2000))
    //   const docRef = await addDoc(collection(db, 'programs'), data)
    //   // console.log('Document written with ID: ', docRef.id)
    //   toast.success(`Programa creado con exito, ID: ${docRef.id}`)
    //   setLoading(false)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const updateDataProgram = async (id: string, data: IProgram) => {
    setLoading(true)
    const res = await updateProgram(id, data)
      .then((res) => res)
      .catch((err) => err)
    if (res) {
      toast.success('Programa actualizado con exito')
    } else {
      toast.error('Error al actualizar el programa')
    }
    setLoading(false)
  }

  const updateFieldDataProgram = async (
    id: string,
    field: string,
    value: any
  ) => {
    setLoading(true)
    const res = await updateFieldProgram(id, field, value)
      .then((res) => res)
      .catch((err) => err)
    if (res) {
      toast.success('Programa actualizado con exito')
    } else {
      toast.error('Error al actualizar el programa')
    }
    setLoading(false)
  }

  const getProgramById = async (id: string) => {
    // setLoading(true)
    // try {
    //   const categoryRef: DocumentReference<DocumentData> = doc(
    //     db,
    //     'programs',
    //     id
    //   )
    //   const docSnap = await getDoc(categoryRef)
    //   if (docSnap.exists()) {
    //     const data = docSnap.data()
    //     setProgram(data as IProgram)
    //   } else {
    //     console.log('No such document!')
    //   }
    //   setLoading(false)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  return {
    loading,
    getPrograms,
    programs,
    createProgram,
    getProgramById,
    updateDataProgram,
    updateFieldDataProgram,
    program,
  }
}
