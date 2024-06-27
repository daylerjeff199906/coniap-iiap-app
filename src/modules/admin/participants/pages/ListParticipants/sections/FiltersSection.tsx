'use client'
import { useFilterFromUrl } from '@/modules/core'
import { Select, SelectItem, Selection } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

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

export const FiltersSection = () => {
  const { getParams, updateFilter } = useFilterFromUrl()
  const pathname = usePathname()

  const isPonentes = pathname.includes('ponentes')
  const isAsistentes = pathname.includes('asistentes')

  const selectedTypePerson = getParams('typePerson', 'all')
  const selectedStatus = getParams('status', 'all')

  const handleTypePerson = (val: Selection) => {
    const value = Object.values(val)[0]
    if (value === 'all') {
      updateFilter('typePerson', '')
    } else {
      updateFilter('typePerson', value)
    }
  }

  const handleStatus = (val: Selection) => {
    const value = Object.values(val)[0]
    if (value === 'all') {
      updateFilter('status', '')
    } else {
      updateFilter('status', value)
    }
  }
  const labelPersonType = isPonentes ? 'Tipo de ponente' : 'Tipo de persona'
  const optionsFiltered = isPonentes
    ? personsType.filter((type) => type.value !== 'participant')
    : personsType

  return (
    <>
      {!isAsistentes && (
        <div className="flex gap-2 w-full max-w-[280px]">
          <Select
            aria-label="Tipo de persona"
            aria-labelledby="Tipo de persona"
            radius="sm"
            variant="bordered"
            selectedKeys={[selectedTypePerson]}
            onSelectionChange={(value) => handleTypePerson(value)}
            disallowEmptySelection
            // label={labelPersonType}
            description={labelPersonType}
          >
            {optionsFiltered.map((type, i) => (
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
      )}
      <div className="flex gap-2 w-full max-w-[210px]">
        <Select
          aria-label="Estado"
          aria-labelledby="Estado"
          radius="sm"
          variant="bordered"
          selectedKeys={[selectedStatus]}
          onSelectionChange={(value) => handleStatus(value)}
          disallowEmptySelection
          // label="Estado"
          description="Estado de la persona"
        >
          {activeStatus.map((status, i) => (
            <SelectItem
              aria-label={`Estado ${status.label}`}
              aria-labelledby={`Estado ${status.label}`}
              key={status.value}
              value={status.value}
            >
              {status.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  )
}
