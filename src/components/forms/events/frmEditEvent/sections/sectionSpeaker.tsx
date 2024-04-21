/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
// import { useEvents } from '@/hooks/admin'
import { IconLink } from '@tabler/icons-react'
import { Controller, useFormContext } from 'react-hook-form'
import { DrawerSelect } from '@/components/general'
import { ListSpeakers } from '../../list'

export const SectionSpeaker = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { control } = useFormContext()

  return (
    <>
      <Controller
        name="person_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Speakers"
            label="Ponente"
            labelPlacement="outside"
            placeholder="Seleccionar ponente"
            value={value}
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
        content={<ListSpeakers onSetOpen={setIsOpen} />}
      />
    </>
  )
}
