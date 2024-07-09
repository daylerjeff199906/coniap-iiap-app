'use client'
import { IUserCreate } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { Select, SelectItem } from '@nextui-org/react'
import { useTopics } from '@/hooks/admin'

export const TopicsData = () => {
  const { topics, getTopics, loading } = useTopics()
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<IUserCreate>()

  const isReviser = watch('role')?.includes('revisor')
  const topicsSelected = watch('topics') || []
  const listTopics = topics || []

  const handleGetTopics = async () => {
    await getTopics('', {
      isActived: 'TRUE',
    })
  }

  return (
    <>
      {isReviser && (
        <section className="w-full flex flex-col gap-2">
          <Controller
            control={control}
            name="topics"
            rules={{
              validate: (value) => {
                if (value?.length === 0 && isReviser) {
                  return 'Debes seleccionar al menos un tema'
                }
                return true
              },
            }}
            render={({ field: { value, onChange } }) => (
              <Select
                aria-label="topics"
                selectedKeys={value || []}
                onClick={() => {
                  if (!listTopics.length) {
                    handleGetTopics()
                  }
                }}
                disallowEmptySelection
                variant="bordered"
                onChange={onChange}
                placeholder="Seleccione los temas de interés"
                radius="sm"
                labelPlacement="outside"
                selectionMode="multiple"
                isLoading={loading}
                isInvalid={errors.topics !== undefined}
                errorMessage={errors.topics?.message}
              >
                {listTopics.map((topic) => (
                  <SelectItem
                    key={topic.id}
                    value={topic.id}
                  >
                    {topic.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          {watch('topics') !== undefined && (
            <p>Temas seleccionados: {watch('topics')?.length || 0}</p>
          )}
        </section>
      )}
    </>
  )
}
