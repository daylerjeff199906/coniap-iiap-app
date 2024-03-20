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
      <header>
        <h2 className="text-2xl font-bold">
          {isEditables ? 'Editar evento' : 'Detalles de evento'}
        </h2>
        <FormProvider {...methods}>
          <form className="grid grid-cols-1 lg:grid-cols-2">
            <MultimediasSection />
            <InfoGeneralSection />
          </form>
        </FormProvider>
      </header>
    </>
  )
}
