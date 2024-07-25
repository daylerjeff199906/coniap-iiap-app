'use client'
import { useState } from 'react'
import { fetchSalas, createSala, updateSala } from '@/api'
import { ISala } from '@/types'

export function useSalas() {
  const [loading, setLoading] = useState<boolean>(false)
  const [listRooms, setListRooms] = useState<ISala[] | null>(null)

  const getRooms = async (query: string, column?: string) => {
    setLoading(true)
    const data = await fetchSalas(query, column)
      .then((res) => res)
      .catch((err) => err)
    setListRooms(data)
    setLoading(false)
  }

  const createRoom = async (data: ISala): Promise<ISala | Error> => {
    setLoading(true)
    const newData = await createSala(data)
      .then((res) => res)
      .catch((err) => err)
    setLoading(false)
    return newData
  }

  const updateRoom = async (
    id: string,
    data: ISala
  ): Promise<ISala | Error> => {
    setLoading(true)
    const newData = await updateSala(id, data)
      .then((res) => res)
      .catch((err) => err)
    setLoading(false)
    return newData
  }

  return {
    loading,
    listRooms,
    getRooms,
    createRoom,
    updateRoom,
  }
}
