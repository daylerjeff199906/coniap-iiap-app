'use client'
import { useFilterFromUrl } from '@/modules/core'
import { Radio, RadioGroup } from '@nextui-org/react'

const activeStatus = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
]

export const StatusFilter = () => {
  const { getParams, updateFilters } = useFilterFromUrl()

  const selectedStatus = getParams('status', 'all')

  const handleStatus = (val: string) => {
    if (val === 'all') {
      updateFilters({ status: '', page: '1' })
    } else {
      updateFilters({ status: val, page: '1' })
    }
  }

  return (
    <>
      <RadioGroup
        aria-label="Filter by status"
        onValueChange={handleStatus}
        value={selectedStatus}
        size="sm"
      >
        {activeStatus.map((status) => (
          <Radio
            key={status.value}
            value={status.value}
          >
            {status.label}
          </Radio>
        ))}
      </RadioGroup>
    </>
  )
}
