'use client'
import { ISummary } from '@/types'
import { useSummaries } from '@/hooks/admin'
import { useRouter } from 'next/navigation'
import { LoadingPages } from '@/components'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { InfoDataSummary } from './InfoDataSummary'
import { PreviewDoc } from './PreviewDoc'
import { ActionsSummary } from './ActionsSummary'
import { Button } from '@nextui-org/react'
import { IconArrowNarrowLeft } from '@tabler/icons-react'

interface IProps {
  summary: ISummary
}
export const FrmDetailSummary = (props: IProps) => {
  const { summary } = props
  const { loading, updateDataSummary } = useSummaries()
  const router = useRouter()

  const methods = useForm<ISummary>({
    defaultValues: summary,
  })

  const handleFormSubmit: SubmitHandler<ISummary> = async (data: ISummary) => {
    const { file, person, topic, ...rest } = data

    const newData: ISummary = { ...rest } as ISummary

    if (summary.id) {
      await updateDataSummary(summary.id, newData)
      handleCancel()
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <>
      <FormProvider {...methods}>
        <main className="flex flex-col sm:flex-row gap-2 f-full">
          <section className="w-full max-w-lg h-full max-h-[calc(100vh-11rem)] overflow-y-auto">
            <form
              onSubmit={methods.handleSubmit(handleFormSubmit)}
              className="w-full p-5 rounded-lg border flex flex-col gap-3"
            >
              <section className="flex justify-start">
                <Button
                  radius="sm"
                  variant="light"
                  onPress={handleCancel}
                  startContent={
                    <IconArrowNarrowLeft
                      size={16}
                      className="text-gray-600"
                    />
                  }
                  className="text-gray-600"
                >
                  Regresar
                </Button>
              </section>
              <InfoDataSummary />
              <ActionsSummary />
              <footer className="flex gap-2 justify-start">
                <Button
                  radius="sm"
                  type="submit"
                  className="button-dark"
                >
                  Guardar cambios
                </Button>
              </footer>
            </form>
          </section>
          <article className="w-full">
            <PreviewDoc />
          </article>
        </main>
      </FormProvider>
      <LoadingPages isOpen={loading} />
    </>
  )
}
