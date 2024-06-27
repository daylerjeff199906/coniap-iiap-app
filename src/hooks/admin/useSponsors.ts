'use client'
import { useState } from 'react'
import { ISponsor } from '@/types'
import { toast } from 'sonner'

import {
  fetchSponsors,
  updateSponsor,
  fetchSponsor,
  createSponsor,
} from '@/api'

export function useSponsors() {
  const [loading, setLoading] = useState<boolean>(false)
  const [sponsors, setSponsors] = useState<ISponsor[] | null>(null)
  const [sponsor, setSponsor] = useState<ISponsor | null>(null)

  const getSponsors = async (query: string) => {
    setLoading(true)
    const data = await fetchSponsors(query)
      .then((res) => res)
      .catch((err) => err)
    setSponsors(data)
    setLoading(false)
  }

  const createDataSponsor = async (data: ISponsor) => {
    setLoading(true)
    const res = await createSponsor(data)
      .then((res) => res)
      .catch((err) => err)
    if (res) {
      toast.success('Sponsor creado correctamente')
      setLoading(false)
      return res[0]
    } else {
      toast.error('Error al crear sponsor')
      setLoading(false)
      return null
    }
  }

  const updateDataSponsor = async (id: string, data: ISponsor) => {
    setLoading(true)
    const res = await updateSponsor(id, data)
      .then((res) => res)
      .catch((err) => err)
    if (res) {
      toast.success('Sponsor actualizado correctamente')
      setLoading(false)
      return res[0]
    } else {
      toast.error('Error al actualizar sponsor')
      setLoading(false)
      return null
    }
  }

  const getSponsorById = async (id: string) => {
    setLoading(true)
    const data = await fetchSponsor(id)
      .then((res) => res)
      .catch((err) => err)
    setSponsor(data[0])
    setLoading(false)
  }

  return {
    loading,
    sponsors,
    getSponsors,
    getSponsorById,
    sponsor,
    createDataSponsor,
    updateDataSponsor,
  }
}
