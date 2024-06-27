'use client'
import { useState } from 'react'
import { fetchTopics, fetchTopic, createTopic, updateTopic } from '@/api'
import { ITopic } from '@/types'
import { toast } from 'sonner'

export function useTopics() {
  const [loading, setLoading] = useState<boolean>(false)
  //   const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)
  const [topics, setTopics] = useState<ITopic[] | null>(null)
  const [topic, setTopic] = useState<ITopic | null>(null)

  const getTopics = async (
    query: string,
    filters?: {
      isActived?: string
    }
  ) => {
    setLoading(true)
    const data = await fetchTopics(query, filters)
      .then((res) => res)
      .catch((err) => err)
    setTopics(data)
    setLoading(false)
  }

  const creatTopic = async (data: ITopic) => {
    setLoading(true)
    const res = await createTopic(data)
      .then((res) => res)
      .catch((err) => err)
    if (res) {
      toast.success('Tema creado correctamente')
      setLoading(false)
      return res[0]
    } else {
      toast.error('Error al crear tema')
      setLoading(false)
      return null
    }
  }

  const updateDataTopic = async (id: string, data: ITopic) => {
    setLoading(true)
    const res = await updateTopic(Number(id), data)
      .then((res) => res)
      .catch((err) => err)
    if (res) {
      toast.success('Tema actualizado correctamente')
      setLoading(false)
      return res
    }
    toast.error('Error al actualizar tema')
    setLoading(false)
    return null
  }

  const getTopicById = async (id: string) => {
    setLoading(true)
    const data = await fetchTopic(Number(id))
      .then((res) => res)
      .catch((err) => err)
    setTopic(data)
    setLoading(false)
  }

  return {
    loading,
    topics,
    getTopics,
    getTopicById,
    creatTopic,
    updateDataTopic,
    topic,
  }
}
