import { Input, Textarea } from '@nextui-org/react'

export const InfoGeneral = () => {
  return (
    <>
      <section className="grid grid-cols-1 gap-4">
        <h1 className="text-lg">Información general</h1>
        <Input
          label="Nombre"
          labelPlacement="outside"
          radius="sm"
          placeholder="Nombre del evento"
        />

        <div className="flex gap-3">
          <Input
            label="Fecha"
            labelPlacement="outside"
            radius="sm"
            type="date"
          />
          <Input
            label="Hora de inicio"
            labelPlacement="outside"
            radius="sm"
            type="time"
          />
          <Input
            label="Hora de fin"
            labelPlacement="outside"
            radius="sm"
            type="time"
          />
        </div>
        <Textarea
          label="Descripción corta"
          labelPlacement="outside"
          radius="sm"
          placeholder="Ingrese una descripción corta del evento"
        />
      </section>
    </>
  )
}
