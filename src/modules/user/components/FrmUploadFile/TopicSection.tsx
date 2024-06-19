/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'
import { ISummary } from '@/types'
import { useTopics } from '@/hooks/admin'

export const TopicSection = ({ loading }: { loading?: boolean }) => {
  const { topics, getTopics, loading: loadingList } = useTopics()

  useEffect(() => {
    getTopics('')
  }, [])

  const {
    control,
    formState: { errors },
  } = useFormContext<ISummary>()

  const datalist = topics ? topics : []
  const placeholder = loadingList
    ? 'Cargando categorias...'
    : 'Selecciona una categoria'

  return (
    <>
      <Controller
        control={control}
        name="topic_id"
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { onChange, value } }) => (
          <Select
            label="Línea de investigación"
            labelPlacement="outside"
            placeholder={placeholder}
            description="Seleccione una línea temática para su archivo"
            selectedKeys={value ? [value] : []}
            onChange={(value) => {
              onChange(value)
            }}
            radius="sm"
            isInvalid={errors.topic_id !== undefined}
            errorMessage={errors.topic_id?.message as string}
            isLoading={loadingList || loading}
            isDisabled={loadingList || loading}
          >
            {datalist.map((item) => (
              <SelectItem key={item.id}>{item.name}</SelectItem>
            ))}
          </Select>
        )}
      />
    </>
  )
}
