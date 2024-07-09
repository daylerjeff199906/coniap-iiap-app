/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { IUserCreate } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { Checkbox, CheckboxGroup } from '@nextui-org/react'
import { useTopics } from '@/hooks/admin'
import { useEffect } from 'react'

export const TopicsData = () => {
  const { topics, getTopics, loading } = useTopics()
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<IUserCreate>()

  const isReviser = watch('role')?.includes('revisor')

  const listTopics = topics || []

  useEffect(() => {
    if (isReviser) {
      getTopics('', {
        isActived: 'TRUE',
      })
    }
  }, [isReviser])

  return (
    <>
      {isReviser && (
        <section className="w-full flex flex-col gap-2">
          <Controller
            control={control}
            name="topics"
            rules={{
              required: isReviser,
              validate: (value) => {
                if (value?.length === 0 && isReviser) {
                  return 'Debes seleccionar al menos un tema'
                }
                return true
              },
            }}
            render={({ field: { value, onChange } }) => (
              <CheckboxGroup
                name="topics"
                label="Líneas temáticas"
                description="Selecciona las líneas temáticas que deseas revisar"
                size="sm"
                value={value || []}
                onChange={onChange}
                errorMessage={errors.topics?.message}
                isInvalid={errors.topics !== undefined}
                isDisabled={loading}
              >
                {listTopics.map((topic) => (
                  <Checkbox
                    key={topic.id}
                    value={topic.id}
                  >
                    {topic.name}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )}
          />
        </section>
      )}
    </>
  )
}
