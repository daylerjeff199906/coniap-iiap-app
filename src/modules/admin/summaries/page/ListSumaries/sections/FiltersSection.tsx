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

import { AprovedFiltered } from './AprovedFiltered'
import { StatusFilter } from './StatusFilter'
import { FileFiltered } from './FileFiltered'
import { TopicsFiltered } from './TopicsFiltered'
import { DateFiltered } from './DateFiltered'
import { PersonFiltered } from './PersonFiltered'

export const FiltersSection = () => {
  const { filteredParams } = useFilterFromUrl()

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
      <DateFiltered />
      <PersonFiltered />
    </>
  )
}
