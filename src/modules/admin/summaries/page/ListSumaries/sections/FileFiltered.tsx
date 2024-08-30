'use client'
import { useFilterFromUrl } from '@/modules/core'
import { Radio, RadioGroup } from '@nextui-org/react'

const optionsFiles = [
  { value: 'all', label: 'Todos' },
  { value: 'true', label: 'Sí' },
  { value: 'false', label: 'No' },
]

export const FileFiltered = () => {
  const { getParams, updateFilters } = useFilterFromUrl()

  const selectedFile = getParams('file', 'all')
  const handleFile = (value: string) => {
    if (value === 'all') {
      updateFilters({ file: '' })
    } else {
      updateFilters({ file: value })
    }
  }

  return (
    <>
      <RadioGroup
        aria-label="Filter by isFile"
        onValueChange={handleFile}
        value={selectedFile}
        size="sm"
      >
        {optionsFiles.map((status) => (
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
