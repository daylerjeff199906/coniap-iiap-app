/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { Controller, useFormContext } from 'react-hook-form'
import { DrawerSelect } from '@/components/general'
import { ListSummaries } from '../../list'

export const SummarySection = () => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <Controller
        name="summary_id"
        control={control}
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Resumen"
            label="Resumen"
            labelPlacement="outside"
            placeholder="Seleccionar resumen"
            value={value}
            onChange={onChange}
            description="Seleccione un tema para el evento"
            isInvalid={errors.person_id !== undefined}
            errorMessage={errors.person_id?.message as string}
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
        content={<ListSummaries onSetOpen={setIsOpen} />}
      />
    </>
  )
}
