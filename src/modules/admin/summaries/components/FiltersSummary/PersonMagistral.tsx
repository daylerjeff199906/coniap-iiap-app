'use client'
import { useFilterFromUrl } from '@/modules/core'
// TODO: Check these imports: // Removed NextUI import:  Radio, RadioGroup 

const optionsFiles = [
  { value: 'all', label: 'Todos' },
  { value: 'true', label: 'Sí' },
  { value: 'false', label: 'No' },
]

export const PersonMagistral = () => {
  const { getParams, updateFilters } = useFilterFromUrl()

  const selectedFile = getParams('is_magistral', 'all')
  const handleFile = (value: string) => {
    if (value === 'all') {
      updateFilters({ is_magistral: '', page: '1' })
    } else {
      updateFilters({ is_magistral: value, page: '1' })
    }
  }

  return (
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
  )
}
