import { useState } from 'react'
import { storage } from '@/firebase/firebase'

import {
  fetchSummaries,
  fetchSummaryStatus,
  createSummary,
  updateSummary,
} from '@/api'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { IEvent, IRes, ISummary } from '@/types'
import { toast } from 'sonner'

export function useSummaries() {
  const [loading, setLoading] = useState<boolean>(false)
  const [summaries, setSummaries] = useState<ISummary[] | null>(null)
  //   const [event, setEvent] = useState<IEvent | null>(null)

  const createSummary = async (data: IEvent) => {
    setLoading(true)
    const res: IRes = (await createSummary(data)) as IRes

    if (res.message) {
      toast.error('Error al crear el programa', {
        description: res.message,
      })
    } else {
      toast.success('Evento creado con exito')
    }
    setLoading(false)
    return res
  }

  const updateSummary = async (id: string, data: IEvent) => {
    setLoading(true)
    const res: IRes = (await updateSummary(id, data)) as IRes
    if (res.message) {
      toast.error('Error al actualizar el evento', {
        description: res.message,
      })
    } else {
      toast.success('Evento actualizado con exito')
    }
    setLoading(false)
    return res
  }

  const getSummaries = async (query: string) => {
    setLoading(true)
    const data = await fetchSummaries(query)
      .then((res) => res)
      .catch((err) => err)
    setSummaries(data)
    setLoading(false)
  }

  const getSummariesStatus = async (query: string, isApproved: boolean) => {
    setLoading(true)
    const data = await fetchSummaryStatus(query, isApproved)
      .then((res) => res)
      .catch((err) => err)
    setSummaries(data)
    setLoading(false)
  }

  //   const getEventById = async (id: string) => {
  //     setLoading(true)
  //     const data = await fetchEventById(id)
  //       .then((res) => res)
  //       .catch((err) => err)
  //     setEvent(data)
  //     setLoading(false)
  //   }

  return {
    loading,
    summaries,
    getSummaries,
    getSummariesStatus,
    createSummary,
    updateSummary,
  }
}
