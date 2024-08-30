/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { useFilterFromUrl } from '@/modules/core'
import { Radio, RadioGroup, Skeleton } from '@nextui-org/react'
import { useTopics } from '@/hooks/admin'

const optionsTopics = [{ value: 'all', label: 'Todos' }]

export const TopicsFiltered = () => {
  const { getParams, updateFilters } = useFilterFromUrl()
  const { getTopics, topics, loading } = useTopics()

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
    <>
      {loading && (
        <section className="flex flex-col gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full rounded-md h-6"
            />
          ))}
        </section>
      )}
      {!loading && (
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
      )}
    </>
  )
}
