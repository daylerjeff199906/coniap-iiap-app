/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import { Button, Checkbox, Input, cn } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { ListPrograms } from '../list/listPrograms'
import { DrawerSelect } from '@/components'
import { IEvent } from '@/types'
import { DateEvent } from '.'

export const ProgramSection = () => {
  const { control, watch, setValue } = useFormContext<IEvent>()
  const [isOpen, setIsOpen] = useState(false)
  const [isProgram, setIsProgram] = useState(watch('program') ? true : false)

  const onValueChange = (value: boolean) => {
    setIsProgram(value)
    if (!value) {
      setValue('program.id', '')
      setValue('program_name', '')
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
            isSelected={isProgram}
            onValueChange={onValueChange}
          >
            <div className="w-full">
              <h1 className="text-sm font-bold">
                Pertenece a un programa registrado en el sistema
              </h1>
              <p className="text-tiny text-gray-500">
                Un programa es una fecha única registrada en el sistema. Si el
                evento tiene un programa (fecha definida en el sistema),
                seleccione esta opción.
              </p>
            </div>
          </Checkbox>
        </div>
        {isProgram && (
          <div>
            <Controller
              name="program_name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  aria-label="Programs"
                  label="Programa"
                  labelPlacement="outside"
                  placeholder="Seleccionar programa"
                  value={value || ''}
                  onChange={onChange}
                  description="Seleccione el programa al que pertenece el evento, es opcional"
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
              title="Seleccionar programa"
              content={<ListPrograms onSetOpen={setIsOpen} />}
            />
          </div>
        )}
        <div>
          <DateEvent />
        </div>
      </section>
    </>
  )
}
