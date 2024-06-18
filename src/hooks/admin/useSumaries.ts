'use client'
import { useState } from 'react'

import {
  fetchSummaries,
  fetchSummaryStatus,
  createSummary,
  updateSummary,
} from '@/api'
import { useFiles } from './useFiles'

import { IRes, ISummary } from '@/types'
import { toast } from 'sonner'

export function useSummaries() {
  const [loading, setLoading] = useState<boolean>(false)
  const [summaries, setSummaries] = useState<ISummary[] | null>(null)
  const { editField } = useFiles()

  const createDataSummary = async (data: ISummary) => {
    setLoading(true)
    const res: IRes = (await createSummary(data)) as IRes

    if (res.message) {
      toast.error('Error al crear el resumen', {
        description: res.message,
      })
    } else {
      toast.success('Resumen añadido con éxito')
    }
    setLoading(false)
    return res
  }

  const updateDataSummary = async (id: string, data: ISummary) => {
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

  const approveSummary = async (id: string) => {
    setLoading(true)
    const res = await editField(id, 'summaries', 'isApproved', true)
    setLoading(false)
    return res
  }

  return {
    loading,
    summaries,
    getSummaries,
    getSummariesStatus,
    createDataSummary,
    updateDataSummary,
    approveSummary,
  }
}
