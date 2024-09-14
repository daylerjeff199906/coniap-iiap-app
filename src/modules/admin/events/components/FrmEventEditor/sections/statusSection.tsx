/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Checkbox, cn } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'
import { IEvent } from '@/types'

export const StatusSection = () => {
  const { control } = useFormContext<IEvent>()

  return (
    <section className="flex flex-col gap-3 w-full section-admin">
      <div className="w-full py-2 sm:pl-3">
        <Controller
          control={control}
          name="isActived"
          render={({ field: { onChange, value } }) => (
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
              isSelected={value}
              onValueChange={onChange}
            >
              <div className="w-full">
                <h1 className="text-sm font-bold">Activar evento</h1>
                <p className="text-tiny text-gray-500">
                  Si está seleccionado, este evento será público para todos los
                  usuarios de la página web, de lo contraio solo se mostrará
                  para el panel administrativo.
                </p>
              </div>
            </Checkbox>
          )}
        />
      </div>
    </section>
  )
}
