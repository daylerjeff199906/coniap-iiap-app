'use client'
import { useFilterFromUrl } from '@/modules/core'
import { Select, SelectItem, Selection } from '@nextui-org/react'

const personsType = [
  { value: 'all', label: 'Todos' },
  { value: 'speaker', label: 'Ponente' },
  { value: 'speaker_mg', label: 'Ponente Magistral' },
  { value: 'participant', label: 'Asistente' },
]

export const FiltersSection = () => {
  const { getParams, updateFilter } = useFilterFromUrl()

  const selectedTypePerson = getParams('typePerson', 'all')

  const handleTypePerson = (val: Selection) => {
    const value = Object.values(val)[0]
    if (value === 'all') {
      updateFilter('typePerson', '')
    } else {
      updateFilter('typePerson', value)
    }
  }

  return (
    <>
      <div className="flex gap-2 w-full max-w-[180px]">
        <Select
          aria-label="Tipo de persona"
          aria-labelledby="Tipo de persona"
          radius="sm"
          variant="bordered"
          selectedKeys={[selectedTypePerson]}
          onSelectionChange={(value) => handleTypePerson(value)}
          disallowEmptySelection
        >
          {personsType.map((type, i) => (
            <SelectItem
              aria-label={`Tipo de persona ${type.label}`}
              aria-labelledby={`Tipo de persona ${type.label}`}
              key={type.value}
              value={type.value}
            >
              {type.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  )
}
