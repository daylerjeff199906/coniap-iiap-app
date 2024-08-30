'use client'
import { useFilterFromUrl } from '@/modules/core'
import { Radio, RadioGroup } from '@nextui-org/react'

const aprovedStatus = [
  { value: 'all', label: 'Todos' },
  { value: 'approved', label: 'Aprobado' },
  { value: 'pending', label: 'Pendiente' },
]

export const AprovedFiltered = () => {
  const { getParams, updateFilters } = useFilterFromUrl()

  const selectedAproved = getParams('aproved', 'all')

  const handleAproved = (value: string) => {
    if (value === 'all') {
      updateFilters({ aproved: '' })
    } else {
      updateFilters({ aproved: value })
    }
  }

  return (
    <RadioGroup
      aria-label="Filter by aproved"
      onValueChange={handleAproved}
      value={selectedAproved}
      size="sm"
    >
      {aprovedStatus.map((status) => (
        <Radio
          key={status.value}
          value={status.value}
        >
          {status.label}
        </Radio>
      ))}
    </RadioGroup>
  )
}
