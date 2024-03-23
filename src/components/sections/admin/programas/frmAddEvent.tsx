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
import { ModalAction } from '@/components'
import { IEvent } from '@/types'

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

export const FrmAddEventInProgram = () => {
  const methods = useForm<IEvent>()

  const [isOpen, setOpen] = useState(false)

  const onSubmit = () => {
    console.log()
  }

  const handleSave: SubmitHandler<Record<string, any>> = (data) => {
    console.log(data)
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
                />
              )}
            />
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
              <Input
                aria-label="Hora de inicio"
                label="Hora de inicio"
                placeholder="00:00"
                labelPlacement="outside"
                radius="sm"
                type="date"
              />
              <Input
                aria-label="Hora de fin"
                label="Hora de fin"
                placeholder="00:00"
                labelPlacement="outside"
                radius="sm"
                type="date"
              />
            </div>
            <Select
              aria-label="Sala"
              placeholder="Selecciona una sala"
              label="Sala"
              labelPlacement="outside"
              radius="sm"
              defaultSelectedKeys={['1']}
              disallowEmptySelection
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
            <header className="flex items-center justify-end gap-4">
              <Button
                color="primary"
                radius="sm"
              >
                Agregar evento
              </Button>
              <Button radius="sm">Cancelar</Button>
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
    </>
  )
}
