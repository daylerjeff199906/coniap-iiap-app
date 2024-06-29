'use client'
import { ISummary } from '@/types'
import { Switch, cn } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

export const ActionsSummary = () => {
  const { control } = useFormContext<ISummary>()

  return (
    <>
      <main className="flex flex-col gap-3">
        <div>
          <p className="text-sm font-medium">Acciones</p>
          <p className="text-xs text-gray-500">
            Acciones a realizar con el resumen, aprueba o rechaza el resumen
          </p>
        </div>
        <section className="w-full">
          <Controller
            control={control}
            name="isActived"
            render={({ field: { value, onChange } }) => (
              <Switch
                classNames={{
                  base: cn(
                    'inline-flex flex-row-reverse w-full max-w-xl bg-content1 hover:bg-content2 items-center',
                    'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2',
                    'data-[selected=true]:border-primary'
                  ),
                  wrapper: 'p-0 overflow-visible',
                  thumb: cn(
                    'w-6 h-6 border-2 shadow-lg',
                    'group-data-[hover=true]:border-primary',
                    //selected
                    'group-data-[selected=true]:ml-6',
                    // pressed
                    'group-data-[pressed=true]:w-7',
                    'group-data-[selected]:group-data-[pressed]:ml-4'
                  ),
                }}
                isSelected={value}
                onValueChange={onChange}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-medium">Activar resumen</p>
                  <p className="text-tiny text-default-400">
                    Mostar el resumen para asignar a un evento
                  </p>
                </div>
              </Switch>
            )}
          />
        </section>
        <section className="w-full">
          <Controller
            control={control}
            name="isApproved"
            render={({ field: { value, onChange } }) => (
              <Switch
                classNames={{
                  base: cn(
                    'inline-flex flex-row-reverse w-full max-w-xl bg-content1 hover:bg-content2 items-center',
                    'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2',
                    'data-[selected=true]:border-primary'
                  ),
                  wrapper: 'p-0 overflow-visible',
                  thumb: cn(
                    'w-6 h-6 border-2 shadow-lg',
                    'group-data-[hover=true]:border-primary',
                    //selected
                    'group-data-[selected=true]:ml-6',
                    // pressed
                    'group-data-[pressed=true]:w-7',
                    'group-data-[selected]:group-data-[pressed]:ml-4'
                  ),
                }}
                isSelected={value}
                onValueChange={onChange}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-medium">Aprobar resumen</p>
                  <p className="text-tiny text-default-400">
                    Aprobar el resumen para que sea visible en la plataforma
                  </p>
                </div>
              </Switch>
            )}
          />
        </section>
      </main>
    </>
  )
}
