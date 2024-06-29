'use client'
import { ISummary } from '@/types'
import { Switch, cn } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

export const ActionsSummary = () => {
  const { control } = useFormContext<ISummary>()

  return (
    <>
      <main className="flex flex-col gap-3">
        <section className="w-full">
          <Controller
            control={control}
            name="isExternal"
            render={({ field: { value, onChange } }) => (
              <Switch
                classNames={{
                  base: cn(
                    'flex-row-reverse w-full max-w-2xl bg-content1 hover:bg-content2 items-center',
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
                  <p className="text-medium">Soy el ponente</p>
                  <p className="text-tiny text-default-400 ">
                    Si eres el ponente, selecciona esta opción
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
