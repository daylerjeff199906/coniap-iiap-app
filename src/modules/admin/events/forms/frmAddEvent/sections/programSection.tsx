/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { ListPrograms } from '../../list'
import { DrawerSelect } from '@/components'
import { IEvent } from '@/types'

export const ProgramSection = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { control, watch } = useFormContext<IEvent>()

  return (
    <>
      <Controller
        name="program_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Programs"
            label="Programa"
            labelPlacement="outside"
            placeholder="Seleccionar programa"
            value={String(value) || ''}
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
    </>
  )
}
