'use client'
import { useFilterFromUrl } from '@/modules/core'
// TODO: Check these imports: // Removed NextUI import:  Radio, RadioGroup 

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
      updateFilters({ aproved: '', page: '1' })
    } else {
      updateFilters({ aproved: value, page: '1' })
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
