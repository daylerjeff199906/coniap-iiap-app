import { useState } from 'react'
import { fetchTopics } from '@/api'
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
  }

  const updateTopic = async (id: string, data: ITopic) => {
    setLoading(true)
  }

  const getTopicById = async (id: string) => {
    setLoading(true)
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
