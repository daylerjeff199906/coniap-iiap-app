'use client'
import { useEffect, useState } from 'react'
import { Button, Divider, Switch, cn } from '@nextui-org/react'
import { useFiles } from '@/hooks/admin'
import { useRouter } from 'next/navigation'
import {
  FormProvider,
  useForm,
  SubmitHandler,
  Controller,
} from 'react-hook-form'

interface IProps {
  id: string
  path: string
  status: boolean
}

export const DialogStatus = (props: IProps) => {
  const { id, path, status } = props
  const { editField, loading } = useFiles()
  const router = useRouter()

  const methods = useForm<{ status: boolean }>({
    defaultValues: {
      status: status,
    },
  })

  const handleStatusChange = async (id: string, value: boolean) => {
    await editField(id, `${path}`, 'isActived', value ? 'TRUE' : 'FALSE')
    handleExit()
  }

  const onSubmit: SubmitHandler<{ status: boolean }> = (data) => {
    handleStatusChange(id, data.status)
  }

  const handleExit = () => {
    router.back()
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-3 w-full rounded-lg border p-4 max-w-xl "
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <header className="w-full">
            <h1 className="font-bold">Cambiar estado</h1>
          </header>
          <Divider />
          <main className="py-4 w-full">
            <Controller
              control={methods.control}
              name="status"
              render={({ field: { value, onChange } }) => (
                <Switch
                  classNames={{
                    base: cn(
                      'inline-flex flex-row-reverse w-full max-w-xl bg-content1 hover:bg-content2 items-center',
                      'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                      'data-[selected=true]:border-primary'
                    ),
                    wrapper: 'p-0 h-4 overflow-visible',
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
                  onChange={(e) => {
                    onChange(e)
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-medium">Activar </p>
                    <p className="text-tiny text-default-400">
                      Se activará el programa y será visible para los usuarios
                    </p>
                  </div>
                </Switch>
              )}
            />
          </main>
          <Divider />
          <footer className="flex justify-end gap-2">
            <Button
              radius="sm"
              onPress={handleExit}
            >
              Cancelar
            </Button>
            <Button
              radius="sm"
              isLoading={loading}
              isDisabled={loading}
              className="button-dark"
              type="submit"
            >
              Guardar
            </Button>
          </footer>
        </form>
      </FormProvider>
    </>
  )
}
