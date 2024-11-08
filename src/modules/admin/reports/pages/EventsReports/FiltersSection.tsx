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
  StatusFilter,
  FileFiltered,
  TopicsFiltered,
  PersonMagistral,
} from '@/modules/admin/summaries/components'

interface IProps {
  onChageFilter: () => void
  onClearFilter: () => void
}

export const FiltersSection = (props: IProps) => {
  const { filteredParams } = useFilterFromUrl()
  const { onChageFilter, onClearFilter } = props

  const filteredList = [
    {
      key: 'status',
      name: 'Estado',
      items: <StatusFilter />,
    },
    {
      key: 'file',
      name: 'Tiene archivo',
      items: <FileFiltered />,
    },
    // {
    //   key: 'magistral',
    //   name: 'Ponencia magistral',
    //   items: <PersonMagistral />,
    // },
    // {
    //   key: 'topic',
    //   name: 'Tema',
    //   items: <TopicsFiltered />,
    // },
  ]

  const filtersLabel = [
    { value: 'topic', name: 'Tema' },
    { value: 'aproved', name: 'Aprobado' },
    { value: 'status', name: 'Estado' },
    { value: 'file', name: 'Tiene archivo' },
    { value: 'date', name: 'Fecha' },
    { value: 'is_magistral', name: 'Magistral' },
  ]

  const selectedFilter = filteredParams(filtersLabel)

  const handleDeleteFilters = () => {
    onClearFilter()
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
      <Button
        radius="sm"
        className="button-dark"
        onPress={onChageFilter}
      >
        Filtrar
      </Button>
      {selectedFilter?.length > 0 && (
        <Button
          radius="sm"
          onPress={handleDeleteFilters}
          color="warning"
        >
          Limpiar
        </Button>
      )}
    </>
  )
}
