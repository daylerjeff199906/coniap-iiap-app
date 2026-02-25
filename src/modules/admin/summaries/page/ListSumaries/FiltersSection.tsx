/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useFilterFromUrl } from '@/modules/core'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { IconFilter } from '@tabler/icons-react'

import {
  AprovedFiltered,
  StatusFilter,
  FileFiltered,
  TopicsFiltered,
  PersonFiltered,
} from '@/modules/admin/summaries/components'

interface IFilterProps {
  onValueChange: (value: string) => void
}

export const FiltersSection = (props: IFilterProps) => {
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
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2 relative" stroke={1.5}>
  <IconFilter size={18} />
  Filtros
            {selectedFilter?.length > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full flex items-center justify-center p-0 text-[10px]">
                {selectedFilter.length}
              </Badge>
            )}
</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          <div className="p-4 bg-muted/20 border-b">
            <h4 className="font-bold text-sm">Opciones de filtrado</h4>
          </div>
          <Accordion type="multiple" className="w-full">
            {filteredList.map((filter) => (
              <AccordionItem key={filter.key} value={filter.key} className="px-4 border-b last:border-0">
                <AccordionTrigger className="text-sm hover:no-underline py-3">
                  {filter.name}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  {filter.items}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </PopoverContent>
      </Popover>

      <div className="flex-1 max-w-sm">
        <PersonFiltered onValueChange={onValueChange} />
      </div>
    </div>
  )
}
