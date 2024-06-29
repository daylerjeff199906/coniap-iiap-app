/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { Controller, useFormContext } from 'react-hook-form'
import { DrawerSelect } from '@/components/general'
import { ListSpeakers } from '../../list'
import { ISummary } from '@/types'

export const SpeakerSection = ({ loading }: { loading?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<ISummary>()

  const onSelectedSpeaker = (row: any) => {
    setValue('person', row)
    setValue('person_id', row.key)
    setIsOpen(false)
  }

  return (
    <>
      <Controller
        name="person"
        control={control}
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Speakers"
            label="Ponente"
            radius="sm"
            labelPlacement="outside"
            placeholder="Seleccionar ponente"
            value={value?.name}
            onChange={onChange}
            description="Seleccione el programa al que pertenece el evento, es opcional"
            isInvalid={errors.person_id !== undefined}
            errorMessage={errors.person_id?.message as string}
            isDisabled={loading}
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
        content={<ListSpeakers onSelectedSpeaker={onSelectedSpeaker} />}
      />
    </>
  )
}
