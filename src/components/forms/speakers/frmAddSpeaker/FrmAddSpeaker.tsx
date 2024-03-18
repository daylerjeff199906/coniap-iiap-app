import { ISpeaker } from '@/types'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'

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
        ></form>
      </FormProvider>
    </>
  )
}
