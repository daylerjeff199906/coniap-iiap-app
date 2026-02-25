'use client'
import { useFilterFromUrl } from '@/modules/core'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IconFilter } from '@tabler/icons-react'

const personsType = [
  { value: 'all', label: 'Todos' },
  { value: 'speaker', label: 'Ponente' },
  { value: 'speaker_mg', label: 'Ponente Magistral' },
  { value: 'participant', label: 'Asistente' },
]

const activeStatus = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
]

interface IProps {
  onChageFilter: () => void
  onClearFilter: () => void
}

export const FiltersSection = (props: IProps) => {
  const { getParams, updateFilter } = useFilterFromUrl()
  const { onChageFilter, onClearFilter } = props

  const selectedTypePerson = getParams('typePerson', 'all')
  const selectedStatus = getParams('status', 'all')

  const handleTypePerson = (value: string) => {
    if (value === 'all') {
      updateFilter('typePerson', '')
    } else {
      updateFilter('typePerson', value)
    }
  }

  const handleStatus = (value: string) => {
    if (value === 'all') {
      updateFilter('status', '')
    } else {
      updateFilter('status', value)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-full sm:w-[200px] space-y-1">
        <label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Tipo de persona</label>
        <Select value={selectedTypePerson} onValueChange={handleTypePerson}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Tipo de persona" />
          </SelectTrigger>
          <SelectContent>
            {personsType.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-[200px] space-y-1">
        <label className="text-[10px] font-bold uppercase text-muted-foreground ml-1">Estado</label>
        <Select value={selectedStatus} onValueChange={handleStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Estado de la persona" />
          </SelectTrigger>
          <SelectContent>
            {activeStatus.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end h-full gap-2 pt-5">
        <Button
          variant="default"
          onClick={onChageFilter}
          className="font-bold gap-2"
        >
          <IconFilter size={18} />
          Filtrar
        </Button>
        {(selectedTypePerson !== 'all' || selectedStatus !== 'all') && (
          <Button
            onClick={onClearFilter}
            variant="ghost"
            className="text-muted-foreground"
          >
            Limpiar
          </Button>
        )}
      </div>
    </div>
  )
}
