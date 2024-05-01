/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
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

  return (
    <>
      <Controller
        control={control}
        name="topic_id"
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { onChange, value } }) => (
          <Select
            label="Categoria"
            labelPlacement="outside"
            placeholder="Selecciona un categoria"
            description="Seleccione la categoria a la que pertenece el resumen"
            value={value}
            onChange={(value) => {
              onChange(value)
            }}
            radius="sm"
            isInvalid={errors.topic !== undefined}
            errorMessage={errors.topic?.message as string}
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
