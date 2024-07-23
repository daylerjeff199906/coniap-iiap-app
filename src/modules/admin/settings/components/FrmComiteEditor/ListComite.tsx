'use client'
import { useState } from 'react'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { Button, Input } from '@nextui-org/react'
import { IconTrash, IconPlus, IconGripVertical } from '@tabler/icons-react'
import { IPersonComite } from '@/types'

interface IListData {
  list: IPersonComite[]
}

export const ListComimte = () => {
  const [personal, setPersonal] = useState<string>('')
  const { control, setValue } = useFormContext<IListData>()
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'list',
  })

  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  const handleAddAuthor = () => {
    append({ order: fields.length + 1, name: personal })
    setPersonal('')
  }

  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragEnter = (index: number) => {
    if (draggedItem === null || draggedItem === index) return
    move(draggedItem, index)
    setDraggedItem(index)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    updateOrder()
  }

  const updateOrder = () => {
    const updatedList = fields.map((field, index) => ({
      order: index + 1,
      name: field.name,
    }))
    setValue('list', updatedList)
  }

  return (
    <section className="w-full">
      <div className="w-full flex flex-col gap-2 ">
        <section className="flex gap-1">
          <Input
            radius="sm"
            variant="bordered"
            placeholder="Nombre del personal de comité"
            value={personal}
            onChange={(e) => setPersonal(e.target.value)}
          />
          <Button
            type="button"
            onPress={handleAddAuthor}
            radius="sm"
            startContent={
              <div>
                <IconPlus
                  size={16}
                  className="text-gray-600"
                />
              </div>
            }
          >
            Agregar
          </Button>
        </section>
        <div className="mt-1 h-full max-h-72 overflow-y-auto">
          <Controller
            control={control}
            name="list"
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center  gap-1 px-2 py-1 hover:bg-gray-100 rounded-md"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                  >
                    <div>
                      <Button
                        radius="sm"
                        size="sm"
                        isIconOnly
                        variant="light"
                        className="cursor-move"
                        isDisabled
                      >
                        <IconGripVertical size={16} />
                      </Button>
                    </div>
                    <Input
                      type="text"
                      radius="sm"
                      size="sm"
                      placeholder="Nombre del personal de comité"
                      value={value?.[index]?.name || ''}
                      onChange={(e) => {
                        const newValue = [...(value || [])]
                        newValue[index] = {
                          ...newValue[index],
                          name: e.target.value,
                        }
                        onChange(newValue)
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onPress={() => remove(index)}
                      radius="sm"
                      startContent={
                        <div>
                          <IconTrash size={16} />
                        </div>
                      }
                      color="danger"
                    >
                      Quitar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  )
}
