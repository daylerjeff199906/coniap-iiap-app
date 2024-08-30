/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useFilterFromUrl } from '@/modules/core'
import {
  Accordion,
  AccordionItem,
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

export const FiltersSection = () => {
  const { updateFilters, filteredParams } = useFilterFromUrl()

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

  const handleDate = (val: string) => {
    updateFilters({ date: val })
  }

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
