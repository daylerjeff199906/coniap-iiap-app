/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useFilterFromUrl } from '@/modules/core'
import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { IconFilter } from '@tabler/icons-react'

import {
  AprovedFiltered,
  StatusFilter,
  FileFiltered,
  TopicsFiltered,
  PersonFiltered,
} from '@/modules/admin/summaries/components'

interface IFilter {
  onValueChange: (value: string) => void
}

export const FiltersSection = (props: IFilter) => {
  const { filteredParams } = useFilterFromUrl()
  const { onValueChange } = props

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
      items: <FileFiltered />,
    },
    {
      key: 'topic',
      name: 'Tema',
      items: <TopicsFiltered />,
    },
  ]

  const filtersLabel = [
    { value: 'topic', name: 'Tema' },
    { value: 'aproved', name: 'Aprobado' },
    { value: 'status', name: 'Estado' },
    { value: 'file', name: 'Tiene archivo' },
    { value: 'date', name: 'Fecha' },
  ]

  const selectedFilter = filteredParams(filtersLabel)

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
              <Badge
                content={selectedFilter?.length}
                isInvisible={selectedFilter?.length === 0}
                color="danger"
              >
                <IconFilter
                  size={18}
                  stroke={1.5}
                />
              </Badge>
            }
            className="font-semibold"
          >
            Filtros
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <main className=" w-64">
            <Accordion
              isCompact
              defaultExpandedKeys={selectedFilter?.map(
                (filter) => filter.value
              )}
            >
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
      <div>
        <PersonFiltered onValueChange={onValueChange} />
      </div>
    </>
  )
}
