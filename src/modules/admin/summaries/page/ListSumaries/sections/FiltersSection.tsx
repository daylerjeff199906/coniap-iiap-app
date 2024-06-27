'use client'
import { useFilterFromUrl } from '@/modules/core'
import { Select, SelectItem, Selection } from '@nextui-org/react'

const activeStatus = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
]

const aprovedStatus = [
  { value: 'all', label: 'Todos' },
  { value: 'approved', label: 'Aprobado' },
  { value: 'pending', label: 'Pendiente' },
]

export const FiltersSection = () => {
  const { getParams, updateFilter } = useFilterFromUrl()

  const selectedStatus = getParams('status', 'all')
  const selectedAproved = getParams('aproved', 'all')

  const handleStatus = (val: Selection) => {
    const value = Object.values(val)[0]
    if (value === 'all') {
      updateFilter('status', '')
    } else {
      updateFilter('status', value)
    }
  }

  const handleAproved = (val: Selection) => {
    const value = Object.values(val)[0]
    if (value === 'all') {
      updateFilter('aproved', '')
    } else {
      updateFilter('aproved', value)
    }
  }

  return (
    <>
      <div className="flex gap-2 w-full max-w-[210px]">
        <Select
          aria-label="Estado"
          aria-labelledby="Estado"
          radius="sm"
          variant="bordered"
          selectedKeys={[selectedAproved]}
          onSelectionChange={(value) => handleAproved(value)}
          disallowEmptySelection
          description="Estado de revisión"
        >
          {aprovedStatus.map((status, i) => (
            <SelectItem
              aria-label={`Estado ${status.label} -${i}`}
              aria-labelledby={`Estado ${status.label}`}
              key={status.value}
              value={status.value}
            >
              {status.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex gap-2 w-full max-w-[210px]">
        <Select
          aria-label="Estado"
          aria-labelledby="Estado"
          radius="sm"
          variant="bordered"
          selectedKeys={[selectedStatus]}
          onSelectionChange={(value) => handleStatus(value)}
          disallowEmptySelection
          description="Estado del resumen"
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
