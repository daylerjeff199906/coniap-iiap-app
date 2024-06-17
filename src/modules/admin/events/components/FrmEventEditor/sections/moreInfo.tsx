import { IEvent } from '@/types'
import { Input } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const MoreInfo = () => {
  const { control } = useFormContext<IEvent>()
  
  return (
    <>
      <section className="grid grid-cols-1 gap-4">
        <h1 className="text-gray-400">Más información</h1>
        {/* <Controller
          control={control}
          name="place"
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Lugar del evento"
              label="Lugar"
              labelPlacement="outside"
              radius="sm"
              placeholder="Lugar del evento"
              value={value}
              onValueChange={onChange}
            />
          )}
        /> */}
      </section>
    </>
  )
}
