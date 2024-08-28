/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { useFilterFromUrl } from '@/modules/core'
import { Input, Select, SelectItem, Selection } from '@nextui-org/react'
import { useTopics } from '@/hooks/admin'

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

const optionsFiles = [
  { value: 'all', label: 'Todos' },
  { value: 'true', label: 'Sí' },
  { value: 'false', label: 'No' },
]

const optionsTopics = [{ value: 'all', label: 'Todos' }]

export const FiltersSection = () => {
  const { getParams, updateFilter } = useFilterFromUrl()
  const { getTopics, topics, loading } = useTopics()

  const selectedStatus = getParams('status', 'all')
  const selectedAproved = getParams('aproved', 'all')
  const selectedTopic = getParams('topic', 'all')
  const selectedFile = getParams('file', 'all')

  useEffect(() => {
    getTopics('', { isActived: 'TRUE' })
  }, [])

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

  const handleDate = (val: string) => {
    updateFilter('date', val)
  }

  const handleTopic = (val: Selection) => {
    const value = Object.values(val)[0]
    if (value === 'all') {
      updateFilter('topic', '')
    } else {
      updateFilter('topic', value)
    }
  }

  const handleFile = (val: Selection) => {
    const value = Object.values(val)[0]
    if (value === 'all') {
      updateFilter('file', '')
    } else {
      updateFilter('file', value)
    }
  }

  const topicsOptions =
    topics && topics.length > 0
      ? topics?.map((topic) => ({
          value: topic.id,
          label: topic.name,
        }))
      : []

  const allTopics =
    topicsOptions.length > 0
      ? [...optionsTopics, ...topicsOptions]
      : [...optionsTopics]

  return (
    <>
      {/* opciones de estado de revisión  */}
      <div className="flex gap-2 w-full sm:max-w-[210px]">
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
      {/* opciones de estado del resumen */}
      <div className="flex gap-2 w-full sm:max-w-[180px]">
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
      {/* opciones de archivo */}
      <div className="flex gap-2 w-full sm:max-w-[120px]">
        <Select
          aria-label="Archivo"
          aria-labelledby="Archivo"
          radius="sm"
          variant="bordered"
          selectedKeys={[selectedFile]}
          onSelectionChange={(value) => handleFile(value)}
          disallowEmptySelection
          description="Con archivo"
        >
          {optionsFiles.map((file, i) => (
            <SelectItem
              aria-label={`Archivo ${file.label}`}
              aria-labelledby={`Archivo ${file.label}`}
              key={file.value}
              value={file.value}
            >
              {file.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      {/* fecha de creación */}
      <div>
        <Input
          type="date"
          variant="bordered"
          radius="sm"
          description="Fecha de creación"
          value={getParams('date', '')}
          onValueChange={(val) => handleDate(val)}
        />
      </div>
      {/* opciones de temas */}
      <div className="flex gap-2 w-full sm:max-w-[210px]">
        <Select
          aria-label="Tema"
          aria-labelledby="Tema"
          radius="sm"
          variant="bordered"
          selectedKeys={[selectedTopic]}
          onSelectionChange={(value) => handleTopic(value)}
          disallowEmptySelection
          description="Líneas temáticas"
          isLoading={loading}
          classNames={{
            listbox: 'text-xs',
          }}
          items={allTopics}
        >
          {allTopics?.map((topic, i) => (
            <SelectItem
              aria-label={`Tema ${topic.label} - ${i}	`}
              aria-labelledby={`Tema ${topic.label}`}
              key={topic.value}
              value={topic.value}
            >
              {topic.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  )
}
