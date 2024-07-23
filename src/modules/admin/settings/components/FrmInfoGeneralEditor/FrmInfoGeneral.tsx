'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button, Skeleton } from '@nextui-org/react'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { useEvents } from '@/hooks/admin'
import { LoadingPages, ModalAction } from '@/components'
import Link from 'next/link'
import { IGeneralData } from '@/types'

//For the text field
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="w-ful">
      <Skeleton className="max-h-52 w-full h-52 rounded-md" />
    </div>
  ),
})
import 'react-quill/dist/quill.snow.css'
import { IEvent } from '@/types'

interface IProps {
  description?: string
}

export const FrmInfoGeneral = (props: IProps) => {
  const { description } = props
  const [isOpen, setOpen] = useState(false)

  const router = useRouter()

  const methods = useForm<IGeneralData>({})

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IGeneralData> = async (
    data: IGeneralData
  ) => {}

  return (
    <>
      <FormProvider {...methods}>
        <main className="">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <main>
              <Controller
                control={methods.control}
                name="description"
                render={({ field: { value, onChange } }) => (
                  <ReactQuill
                    value={value}
                    onChange={onChange}
                    theme="snow"
                    className="max-h-52 w-full h-52"
                  />
                )}
              />
            </main>
            <footer className="flex items-center gap-2 justify-end sticky bottom-0 bg-white p-4 border-t border-gray-100">
              <Button
                radius="sm"
                size="sm"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                type="submit"
                // isLoading={loading}
                // isDisabled={loading}
                radius="sm"
                size="sm"
                className="button-dark"
              >
                Guardar
              </Button>
            </footer>
          </form>
        </main>
      </FormProvider>
      <ModalAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Guardar los cambios"
        message="¿Estás seguro de guardar los cambios?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
      {/* <LoadingPages isOpen={loading} /> */}
    </>
  )
}
