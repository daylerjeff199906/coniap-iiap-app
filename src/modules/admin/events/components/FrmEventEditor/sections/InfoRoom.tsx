/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import { Button, Checkbox, Input, cn } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { DrawerSelect } from '@/components'
import { IEvent } from '@/types'
import { ListRooms } from '../list/listRooms'

export const InfoRoom = () => {
  const { control, watch, setValue } = useFormContext<IEvent>()
  const [isOpen, setIsOpen] = useState(false)
  const [isRoom, setIsRoom] = useState(watch('sala') ? true : false)

  const onValueChange = (value: boolean) => {
    setIsRoom(value)
    if (!value) {
      setValue('sala.id', '')
      setValue('sala_name', '')
    }
  }

  return (
    <>
      <section className="flex flex-col gap-3 border p-4 rounded-lg w-full">
        <div className="w-full py-2 sm:pl-3">
          <Checkbox
            aria-label="Programs"
            className="w-full"
            classNames={{
              base: cn(
                'inline-flex w-full bg-content1 w-full',
                'hover:bg-content2 items-center justify-start',
                'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                'data-[selected=true]:border-primary'
              ),
              label: 'w-full',
            }}
            isSelected={isRoom}
            onValueChange={onValueChange}
          >
            <div className="w-full">
              <h1 className="text-sm font-bold">
                Agrgar link de la sala virtual
              </h1>
              <p className="text-tiny text-gray-500">
                Agrega el link de la sala virtual en la que se llevará a cabo el
                evento virtual. Es opcional. Seleccione una sala que esté en el
                sistema.
              </p>
            </div>
          </Checkbox>
        </div>
        {isRoom && (
          <div>
            <Controller
              name="sala_name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  aria-label="Sala"
                  label="Sala virtual"
                  labelPlacement="outside"
                  placeholder="Seleccionar sala virtual"
                  value={value || ''}
                  onChange={onChange}
                  description="Seleccione la sala virtual en la que se llevará a cabo el evento"
                  endContent={
                    <div>
                      <Button
                        size="sm"
                        radius="sm"
                        startContent={<IconLink size={16} />}
                        onPress={() => setIsOpen(true)}
                      >
                        Seleccionar
                      </Button>
                    </div>
                  }
                />
              )}
            />
            <DrawerSelect
              isOpen={isOpen}
              setOpen={setIsOpen}
              title="Seleccionar sala virtual"
              content={<ListRooms onSetOpen={setIsOpen} />}
            />
          </div>
        )}
      </section>
    </>
  )
}
