import { useState } from 'react'
import { IProgram } from '@/types'
import {
  fetchProgram,
  fetchPrograms,
  updateProgram,
  updateFieldProgram,
  createProgram,
} from '@/api'
import { toast } from 'sonner'

export function usePrograms() {
  const [loading, setLoading] = useState<boolean>(false)
  const [programs, setPrograms] = useState<IProgram[] | null>(null)
  const [program, setProgram] = useState<IProgram | null>(null)

  const getPrograms = async (query: string, column?: string) => {
    setLoading(true)
    const data = await fetchPrograms(query, column)
      .then((res) => res)
      .catch((err) => err)
    setPrograms(data)
    setLoading(false)
  }

  const addProgram = async (data: IProgram) => {
    setLoading(true)
    const res = await createProgram(data)

    if (res) {
      toast.success('Programa creado con exito')
    } else {
      toast.error('Error al crear el programa', {})
    }
    setLoading(false)
    return res
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
    setLoading(true)
    const data = await fetchProgram(id)
      .then((res) => res)
      .catch((err) => err)
    setProgram(data[0])
    setLoading(false)
  }

  return {
    loading,
    getPrograms,
    programs,
    addProgram,
    getProgramById,
    updateDataProgram,
    updateFieldDataProgram,
    program,
  }
}
