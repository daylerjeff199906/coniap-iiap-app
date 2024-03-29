import { useState } from 'react'
import { fetchTopics, fetchTopic, createTopic } from '@/api'
import { ITopic } from '@/types'
import { toast } from 'sonner'

export function useTopics() {
  const [loading, setLoading] = useState<boolean>(false)
  //   const [speakers, setSpeakers] = useState<ISpeaker[] | null>(null)
  const [topics, setTopics] = useState<ITopic[] | null>(null)
  const [topic, setTopic] = useState<ITopic | null>(null)

  const getTopics = async (query: string) => {
    setLoading(true)
    const data = await fetchTopics(query)
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

  const updateTopic = async (id: string, data: ITopic) => {
    setLoading(true)
  }

  const getTopicById = async (id: string) => {
    setLoading(true)
    const data = await fetchTopic(Number(id))
      .then((res) => res)
      .catch((err) => err)
    setTopic(data[0])
    setLoading(false)
  }

  return {
    loading,
    topics,
    getTopics,
    getTopicById,
    creatTopic,
    updateTopic,
    topic,
  }
}
