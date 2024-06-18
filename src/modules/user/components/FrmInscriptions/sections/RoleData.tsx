'use client'
import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox, Input, cn } from '@nextui-org/react'
import { IInscription } from '@/types'

export const RoleData = () => {
  const methods = useFormContext<IInscription>()

  const handleRole = (isSpeaker: boolean) => {
    if (isSpeaker) {
      methods.setValue('typePerson', 'speaker')
    } else {
      methods.setValue('typePerson', 'participant')
      methods.setValue('password', '')
      methods.setValue('password_confirmation', '')
    }
  }

  return (
    <>
      <section className="col-span-1 sm:col-span-2 flex flex-col gap-2">
        <div>
          <h3 className="text-sm">
            Si deseas participar como ponente y presentar tu trabajo de
            investigación, selecciona participar como ponente.
          </h3>
        </div>
        <div className="pt-2">
          <Checkbox
            aria-label="Participar como ponente"
            className="w-full"
            classNames={{
              base: cn(
                'inline-flex w-full bg-content1',
                'hover:bg-content2 items-center justify-start',
                'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                'data-[selected=true]:border-primary'
              ),
              label: 'w-full',
            }}
            isSelected={methods?.watch('typePerson') === 'speaker'}
            onValueChange={(value) => handleRole(value)}
          >
            <div className="w-full">
              <h1 className="text-sm font-bold">Participar como ponente</h1>
              <p className="text-tiny text-gray-500">
                Al participar como ponente, se te creará un perfil de ponente
                donde podrás subir tu propuesta de trabajo. En los plazos
                límites.
              </p>
            </div>
          </Checkbox>
        </div>
      </section>
      {methods?.watch('typePerson') === 'speaker' && (
        <section className="pt-2 col-span-1 sm:col-span-2 flex flex-col gap-2">
          <Controller
            control={methods.control}
            name="password"
            rules={{
              required:
                methods.watch('typePerson') !== 'participant' && 'Requerido',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                radius="sm"
                label="Contraseña"
                labelPlacement="outside"
                placeholder="Ingrese su contraseña"
                type="password"
                value={value || ''}
                onChange={onChange}
                isInvalid={methods.formState.errors.password !== undefined}
                errorMessage={methods.formState.errors.password?.message}
              />
            )}
          />

          <Controller
            control={methods.control}
            name="password_confirmation"
            rules={{
              validate: (value) =>
                value === methods.getValues('password') ||
                'Las contraseñas no coinciden',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                radius="sm"
                label="Confirmar contraseña"
                labelPlacement="outside"
                placeholder="Confirme su contraseña"
                type="password"
                value={value || ''}
                onChange={onChange}
                isInvalid={
                  methods.formState.errors.password_confirmation !== undefined
                }
                errorMessage={
                  methods.formState.errors.password_confirmation?.message
                }
              />
            )}
          />
        </section>
      )}
    </>
  )
}
