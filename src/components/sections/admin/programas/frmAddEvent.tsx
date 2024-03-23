'use client'
import { useState } from 'react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import {
  useForm,
  Control,
  SubmitHandler,
  FormProvider,
  Controller,
} from 'react-hook-form'
import { LoadingPages, ModalAction } from '@/components'
import { IEvent, IProgram } from '@/types'

import { useLogicEventToProgram } from '@/providers'

const typeRoom = [
  {
    label: 'Sala 1',
    value: '1',
  },
  {
    label: 'Sala 2',
    value: '2',
  },
]

interface IProps {
  idProgram: string
  program: IProgram | null
}

export const FrmAddEventInProgram = (props: IProps) => {
  const [isOpen, setOpen] = useState(false)
  const { program, idProgram } = props

  const methods = useForm<IEvent>({
    defaultValues: {
      salaId: '1',
    },
  })

  const { createEventInProgram, loading } = useLogicEventToProgram()

  const onSubmit = () => {
    setOpen(true)
  }

  const handleSave: SubmitHandler<IEvent> = (data) => {
    setOpen(false)
    const programFixed = {
      ...program,
      id: idProgram,
    }
    createEventInProgram(data, programFixed as IProgram)
  }
  return (
    <>
      <section>
        <h1 className="text-lg font-bold pb-4">Agregar evento</h1>
        <FormProvider {...methods}>
          <form
            className="grid grid-cols-1 gap-4 "
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Controller
              control={methods.control}
              name="name"
              rules={{ required: 'Este campo es requerido' }}
              render={({ field: { onChange, value } }) => (
                <Input
                  aria-label="Nombre del evento"
                  label="Nombre"
                  labelPlacement="outside"
                  radius="sm"
                  placeholder="Nombre del evento"
                  value={value}
                  onValueChange={onChange}
                  isInvalid={methods.formState.errors.name !== undefined}
                  errorMessage={
                    methods.formState.errors.name?.message as string
                  }
                />
              )}
            />
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
              <Controller
                control={methods.control}
                name="timeStart"
                rules={{ required: 'Este campo es requerido' }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    aria-label="Fecha de inicio"
                    label="Fecha de inicio"
                    placeholder="00:00"
                    labelPlacement="outside"
                    radius="sm"
                    type="date"
                    value={value}
                    onValueChange={onChange}
                    isInvalid={methods.formState.errors.timeStart !== undefined}
                    errorMessage={
                      methods.formState.errors.timeStart?.message as string
                    }
                  />
                )}
              />
              <Controller
                control={methods.control}
                name="timeEnd"
                rules={{ required: 'Este campo es requerido' }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    aria-label="Fecha de fin"
                    label="Fecha de fin"
                    placeholder="00:00"
                    labelPlacement="outside"
                    radius="sm"
                    type="date"
                    value={value}
                    onValueChange={onChange}
                    isInvalid={methods.formState.errors.timeEnd !== undefined}
                    errorMessage={
                      methods.formState.errors.timeEnd?.message as string
                    }
                  />
                )}
              />
            </div>
            <Controller
              control={methods.control}
              name="salaId"
              render={({ field: { onChange, value } }) => (
                <Select
                  aria-label="Sala"
                  placeholder="Selecciona una sala"
                  label="Sala"
                  labelPlacement="outside"
                  radius="sm"
                  defaultSelectedKeys={['1']}
                  disallowEmptySelection
                  value={value}
                  onChange={onChange}
                >
                  {typeRoom.map((item) => (
                    <SelectItem
                      aria-labelledby="Sala-items"
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            <header className="flex items-center justify-end gap-4">
              <Button
                color="primary"
                radius="sm"
                type="submit"
              >
                Agregar evento
              </Button>
              <Button
                radius="sm"
                type="reset"
              >
                Cancelar
              </Button>
            </header>
          </form>
        </FormProvider>
      </section>
      <ModalAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Agregar evento"
        message="¿Estás seguro de agregar este evento?"
        onPress={methods.handleSubmit(handleSave)}
      />
      <LoadingPages isOpen={loading} />
    </>
  )
}
