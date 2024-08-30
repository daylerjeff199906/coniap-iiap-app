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
    // const value = Object.values(val)[0]
    if (val === 'all') {
      updateFilters({ status: '' })
    } else {
      updateFilters({ status: val })
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
