'use client'
import { useState } from 'react'
import { ISpeaker } from '@/types'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { InfoGeneralSection, MultimediasSection } from './sections'
interface IProps {
  speaker: ISpeaker
}

export const FrmEditSpeaker = (props: IProps) => {
  const { speaker } = props
  const [isEditables, setIsEditables] = useState(true)

  const methods = useForm<ISpeaker>({
    defaultValues: speaker,
  })

  return (
    <>
      <header className='pb-4'>
        <h2 className="text-2xl font-bold">
          {isEditables ? 'Editar ponente' : 'Detalles del ponente'}
        </h2>
      </header>
      <FormProvider {...methods}>
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="w-full col-span-1">
            <MultimediasSection />
          </div>
          <div className="w-full col-span-1 lg:col-span-2">
            <InfoGeneralSection />
          </div>
        </form>
      </FormProvider>
    </>
  )
}
