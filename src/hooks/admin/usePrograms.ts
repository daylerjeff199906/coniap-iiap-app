'use client'
import { useState } from 'react'
import { IProgram, IRes } from '@/types'
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

  const getPrograms = async (query: string, column?: string, date?: string) => {
    setLoading(true)
    const data = await fetchPrograms(query, column, date)
      .then((res) => res)
      .catch((err) => err)
    if (data) {
      setPrograms(data)
    } else {
      setPrograms(null)
    }
    setLoading(false)
  }

  const addProgram = async (data: IProgram) => {
    setLoading(true)
    const res: IRes = (await createProgram(data)) as IRes

    if (res.message) {
      toast.error('Error al crear el programa', {
        description: res.message,
      })
    } else {
      toast.success('Programa creado con exito')
    }
    setLoading(false)
    return res
  }

  const updateDataProgram = async (id: string, data: IProgram) => {
    setLoading(true)
    const res: IRes = (await updateProgram(id, data)) as IRes
    if (res.message) {
      toast.error('Error al actualizar el programa', {
        description: res.message,
      })
    } else {
      toast.success('Programa actualizado con exito')
    }
    setLoading(false)
    return res
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
