'use client'
import { useState } from 'react'
import { IPerson } from '@/types'
import { fetchSpeakers } from '@/api'

export function useSpeakers() {
  const [loading, setLoading] = useState<boolean>(false)
  const [speakers, setSpeakers] = useState<IPerson[] | null>(null)

  const getSpekers = async (query: string) => {
    setLoading(true)
    const data = await fetchSpeakers(query)
      .then((res) => res)
      .catch((err) => err)
    setSpeakers(data)
    setLoading(false)
  }

  return {
    loading,
    speakers,
    getSpekers,
  }
}
