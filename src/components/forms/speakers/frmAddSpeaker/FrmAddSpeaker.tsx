'use client'
import { ISpeaker } from '@/types'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { InfoGeneral } from './sections'

export const FrmAddSpeaker = () => {
  const methods = useForm<ISpeaker>()

  const onSubmit: SubmitHandler<ISpeaker> = (data) => {
    console.log(data)
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="space-y-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold">Agregar Ponente</h1>
          <InfoGeneral />
        </form>
      </FormProvider>
    </>
  )
}
