'use client'
import { useState } from 'react'

import {
  fetchSummaries,
  createSummary,
  updateSummary,
  fetchSummaryByIdPerson,
} from '@/api'
import { useFiles } from './useFiles'

import { IRes, ISummary, ISummaryFilter } from '@/types'
import { toast } from 'react-toastify'
import { sendTemplateMessage } from '@/lib'

export function useSummaries() {
  const [loading, setLoading] = useState<boolean>(false)
  const [summaries, setSummaries] = useState<{
    data: ISummary[]
    count: number
  } | null>(null)
  const { editField } = useFiles()

  const createDataSummary = async (data: ISummary) => {
    setLoading(true)
    const res: IRes = (await createSummary(data)) as IRes

    if (res.message) {
      toast.error(`Error al crear el resúmen ${res.message}`)
    } else {
      toast.success('Tema de resumen añadido con éxito')
    }
    setLoading(false)
    return res
  }

  const updateDataSummary = async (
    id: string,
    data: ISummary,
    message?: {
      email: string
      name: string
      surname: string
      subject: string
    },
    isNotification?: boolean
  ) => {
    setLoading(true)
    const res: IRes = (await updateSummary(id, data)) as IRes
    if (res.message) {
      toast.error(`Error al actualizar el resumen ${res.message}`)
    } else {
      toast.success('Tema de resumen actualizado con éxito')
      if (isNotification) {
        const resMsg = await sendTemplateMessage(16, {
          email: String(message?.email),
          name: String(message?.name),
          surname: String(message?.surname),
          subject: String(data?.title),
        })
        if (resMsg) {
          toast.success(
            'Se enviará un mensaje al correo del ponente, con los detalles de la revisión'
          )
        }
      }
    }
    setLoading(false)
    return res
  }

  const getSummaries = async (filters?: ISummaryFilter) => {
    setLoading(true)
    const data = await fetchSummaries(filters)
      .then((res) => res)
      .catch((err) => err)
    setSummaries(data)
    setLoading(false)
  }

  const getSummaryByIdPerson = async (idPerson: string) => {
    setLoading(true)
    const data = await fetchSummaryByIdPerson(idPerson)
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
    createDataSummary,
    updateDataSummary,
    approveSummary,
    getSummaryByIdPerson,
    setSummaries,
  }
}
