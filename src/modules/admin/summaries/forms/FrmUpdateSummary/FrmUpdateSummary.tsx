'use client'
import { ISummary } from '@/types'
import { Button, Input } from '@nextui-org/react'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import { SpeakerSection } from './speakerSection'
import { MultimediaSection } from './multimediaSection'
import { useRouter } from 'next/navigation'

interface IProps {
  summary: ISummary
}

export const FrmUpdateSummary = (props: IProps) => {
  const { summary } = props
  const router = useRouter()

  const methods = useForm<ISummary>({
    defaultValues: summary,
  })

  const handleFormSubmit: SubmitHandler<ISummary> = async (data: ISummary) => {
    console.log(data)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          className="p-4 flex flex-col gap-3"
        >
          <Controller
            name="title"
            control={methods.control}
            rules={{ required: 'Este campo es requerido' }}
            render={({ field: { value, onChange } }) => (
              <Input
                aria-label="Título del resumen"
                label="Título del tema del resumen"
                labelPlacement="outside"
                placeholder="Título"
                value={value}
                onChange={onChange}
                radius="sm"
                isInvalid={methods.formState.errors?.title !== undefined}
                errorMessage={methods.formState.errors?.title?.message}
              />
            )}
          />

          <SpeakerSection />
          <MultimediaSection />

          <footer>
            <div className="flex items-center justify-end gap-3">
              <Button
                type="submit"
                size="sm"
                radius="sm"
                color="primary"
              >
                Guardar
              </Button>
              <Button
                size="sm"
                radius="sm"
                type="reset"
                onPress={handleCancel}
              >
                Cancelar
              </Button>
            </div>
          </footer>
        </form>
      </FormProvider>
    </>
  )
}
