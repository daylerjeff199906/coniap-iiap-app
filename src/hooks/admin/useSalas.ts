'use client'
import { useState } from 'react'
import { fetchSalas } from '@/api'
import { ISala } from '@/types'
import { toast } from 'sonner'

const message =
  'duplicate key value violates unique constraint "persons_email_key"'

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

  return {
    loading,
    listRooms,
    getRooms,
  }
}
