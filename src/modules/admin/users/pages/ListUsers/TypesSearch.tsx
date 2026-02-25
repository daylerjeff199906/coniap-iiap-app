'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ITypesSearch {
  selectedKey?: string
  onSelectionChange?: (value: string) => void
}

export const TypesSearch = (props: ITypesSearch) => {
  const { onSelectionChange, selectedKey } = props

  return (
    <Select value={selectedKey} onValueChange={onSelectionChange}>
      <SelectTrigger className="w-[140px] h-9">
        <SelectValue placeholder="Filtrar por..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="userName">por usuario</SelectItem>
        <SelectItem value="email">por correo</SelectItem>
      </SelectContent>
    </Select>
  )
}
