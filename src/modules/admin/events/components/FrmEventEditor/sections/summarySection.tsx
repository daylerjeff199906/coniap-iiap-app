/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import { Button, Checkbox, Input, Textarea, cn } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { Controller, useFormContext } from 'react-hook-form'
import { DrawerSelect } from '@/components/general'
import { IEvent } from '@/types'
import { ListSummaries } from '../list/listSummaries'

export const SummarySection = () => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<IEvent>()

  const [isOpen, setIsOpen] = useState(false)
  const [isSummary, setIsSummary] = useState(watch('summary') ? true : false)

  const onValueChange = (value: boolean) => {
    setIsSummary(value)
    if (!value) {
      setValue('summary.id', '')
      setValue('summary_name', '')
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
            isSelected={isSummary}
            onValueChange={onValueChange}
          >
            <div className="w-full">
              <h1 className="text-sm font-bold">
                Incluir un resumen en el evento
              </h1>
              <p className="text-tiny text-gray-500">
                Incluir un resumen en el evento, es opcional. Seleccione un
                resumen registrado en el sistema. Si se selecciona un resumen,
                por defecto se cambiará el título pero puede ser cambiado
              </p>
            </div>
          </Checkbox>
        </div>
        {isSummary && (
          <div>
            <Controller
              name="summary_name"
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
                  isInvalid={errors.summary?.id !== undefined}
                  errorMessage={errors.summary?.message as string}
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
          </div>
        )}
        <Controller
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Nombre del evento"
              label="Nombre"
              labelPlacement="outside"
              radius="sm"
              placeholder="Nombre del evento"
              value={value}
              onValueChange={onChange}
              isInvalid={errors.name !== undefined}
              errorMessage={errors.name?.message as string}
            />
          )}
        />
        <Controller
          control={control}
          name="shortDescription"
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Textarea
              aria-label="Descripción del evento"
              label="Descripción breve del evento"
              labelPlacement="outside"
              radius="sm"
              placeholder="Descripción del evento"
              value={value}
              onValueChange={onChange}
              isInvalid={errors.shortDescription !== undefined}
              errorMessage={errors.shortDescription?.message as string}
            />
          )}
        />
      </section>
    </>
  )
}
