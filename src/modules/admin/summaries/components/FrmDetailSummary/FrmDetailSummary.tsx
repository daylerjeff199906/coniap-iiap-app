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
import { sendTemplateMessage } from '@/lib'
import { toast } from 'react-toastify'

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

  const isDirty = methods.formState.isDirty

  const handleFormSubmit: SubmitHandler<ISummary> = async (data: ISummary) => {
    const { file, person, topic, isNotification, ...rest } = data

    const newData: ISummary = { ...rest } as ISummary

    if (summary.id) {
      const resApi = await updateDataSummary(
        summary.id,
        newData,
        {
          email: String(summary.person?.email),
          name: String(summary.person?.name),
          surname: String(summary.person?.surName),
          subject: newData?.title,
        },
        isNotification
      )
      if (!resApi.message) {
        handleCancel()
      }
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <>
      <FormProvider {...methods}>
        <main className="flex flex-col sm:flex-row gap-2 f-full">
          <section className="w-full max-w-lg sm:min-w-lg h-full max-h-[calc(100vh-8rem)] overflow-y-auto bg-white">
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
              <InfoDataSummary defaultValues={summary} />
              <ActionsSummary defaultValues={summary} />
              <footer className="flex gap-2 justify-start">
                <Button
                  radius="sm"
                  type="submit"
                  className="button-dark"
                  disabled={!isDirty || loading}
                  isLoading={loading}
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
