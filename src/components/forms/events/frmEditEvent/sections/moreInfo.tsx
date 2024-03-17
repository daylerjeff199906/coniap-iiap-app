import { Input } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const MoreInfo = () => {
  const { control } = useFormContext()
  return (
    <>
      <section className="grid grid-cols-1 gap-4">
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
        <Controller
          control={control}
          name="linkZoom"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Link de Zoom"
              labelPlacement="outside"
              radius="sm"
              placeholder="Link del evento en meet"
              value={value}
              onValueChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="linkFacebook"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Link de facebook"
              labelPlacement="outside"
              radius="sm"
              placeholder="Link del evento en facebook"
              value={value}
              onValueChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="linkYoutube"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Link de youtube"
              labelPlacement="outside"
              radius="sm"
              placeholder="Link del evento en meet"
              value={value}
              onValueChange={onChange}
            />
          )}
        />
      </section>
    </>
  )
}
