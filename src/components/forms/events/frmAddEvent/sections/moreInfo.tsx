import { Input, Textarea } from '@nextui-org/react'

export const MoreInfo = () => {
  return (
    <>
      <section className="grid grid-cols-1 gap-4">
        <h1 className="text-lg">Más información</h1>
        <Input
          label="Link de zoom"
          labelPlacement="outside"
          radius="sm"
          placeholder="Link del evento en zoom"
        />
        <Input
          label="Link de facebook"
          labelPlacement="outside"
          radius="sm"
          placeholder="Link del evento en facebook"
        />
        <Input
          label="Link de youtube"
          labelPlacement="outside"
          radius="sm"
          placeholder="Link del evento en youtube"
        />
      </section>
    </>
  )
}
