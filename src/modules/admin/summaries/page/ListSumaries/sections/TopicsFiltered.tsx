/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { useFilterFromUrl } from '@/modules/core'
import { Radio, RadioGroup } from '@nextui-org/react'
import { useTopics } from '@/hooks/admin'

const optionsTopics = [{ value: 'all', label: 'Todos' }]

export const TopicsFiltered = () => {
  const { getParams, updateFilters, filteredParams } = useFilterFromUrl()
  const { getTopics, topics } = useTopics()

  const selectedTopic = getParams('topic', 'all')

  useEffect(() => {
    getTopics('', { isActived: 'TRUE' })
  }, [])

  const handleTopic = (value: string) => {
    if (value === 'all') {
      updateFilters({ topic: '' })
    } else {
      updateFilters({ topic: value })
    }
  }

  const topicsOptions =
    topics && topics.length > 0
      ? topics?.map((topic) => ({
          value: topic.id,
          label: topic.name,
        }))
      : []

  const allTopics =
    topicsOptions.length > 0
      ? [...optionsTopics, ...topicsOptions]
      : [...optionsTopics]

  return (
    <RadioGroup
      aria-label="Filter by topic"
      onValueChange={handleTopic}
      value={selectedTopic}
      size="sm"
    >
      {allTopics.map((topic) => (
        <Radio
          key={topic.value}
          value={topic.value.toString()}
          classNames={{
            label: 'text-xs',
            base: 'w-full max-w-[200px]',
          }}
        >
          {topic.label}
        </Radio>
      ))}
    </RadioGroup>
  )
}
