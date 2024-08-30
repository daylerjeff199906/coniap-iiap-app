/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { useFilterFromUrl } from '@/modules/core'
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
} from '@nextui-org/react'
import { useTopics } from '@/hooks/admin'
import { IconFilter } from '@tabler/icons-react'

import { AprovedFiltered } from './AprovedFiltered'
import { StatusFilter } from './StatusFilter'

const optionsFiles = [
  { value: 'all', label: 'Todos' },
  { value: 'true', label: 'Sí' },
  { value: 'false', label: 'No' },
]

const optionsTopics = [{ value: 'all', label: 'Todos' }]

export const FiltersSection = () => {
  const { getParams, updateFilters, filteredParams } = useFilterFromUrl()
  const { getTopics, topics } = useTopics()

  const selectedTopic = getParams('topic', 'all')
  const selectedFile = getParams('file', 'all')

  const filteredList = [
    {
      key: 'status',
      name: 'Estado',
      items: <StatusFilter />,
    },
    {
      key: 'aproved',
      name: 'Aprobado',
      items: <AprovedFiltered />,
    },
    {
      key: 'file',
      name: 'Tiene archivo',
      items: <AprovedFiltered />,
    },
    {
      key: 'topic',
      name: 'Tema',
      items: <AprovedFiltered />,
    },
  ]

  useEffect(() => {
    getTopics('', { isActived: 'TRUE' })
  }, [])

  const handleDate = (val: string) => {
    updateFilters({ date: val })
  }

  const handleTopic = (value: string) => {
    if (value === 'all') {
      updateFilters({ topic: '' })
    } else {
      updateFilters({ topic: value })
    }
  }

  const handleFile = (value: string) => {
    if (value === 'all') {
      updateFilters({ file: '' })
    } else {
      updateFilters({ file: value })
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
      <Popover
        placement="right-start"
        size="sm"
        radius="sm"
      >
        <PopoverTrigger>
          <Button
            radius="sm"
            startContent={
              <IconFilter
                size={18}
                stroke={1.5}
              />
            }
            className="font-semibold"
          >
            Filtros
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <main className=" w-64">
            <Accordion isCompact>
              {/* <AccordionItem
                key="1"
                aria-label="Filter by status"
                title="Estado"
              >
               
              </AccordionItem>
       
              <AccordionItem
                key="3"
                aria-label="Filter by isFile"
                title="Tiene archivo"
              >
                <RadioGroup
                  aria-label="Filter by isFile"
                  onValueChange={handleFile}
                  value={selectedFile}
                  size="sm"
                >
                  {optionsFiles.map((status) => (
                    <Radio
                      key={status.value}
                      value={status.value}
                    >
                      {status.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </AccordionItem>
              <AccordionItem
                key="4"
                aria-label="Filter by topic"
                title="Tema"
              >
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
              </AccordionItem> */}
              {filteredList.map((filter) => (
                <AccordionItem
                  key={filter.key}
                  aria-label={`Filter by ${filter.key}`}
                  title={filter.name}
                >
                  {filter.items}
                </AccordionItem>
              ))}
            </Accordion>
          </main>
        </PopoverContent>
      </Popover>
    </>
  )
}
