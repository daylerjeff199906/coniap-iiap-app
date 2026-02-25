'use client'
import { ISummary } from '@/types'
import { useSummaries } from '@/hooks/admin'
import { useRouter } from 'next/navigation'
import { LoadingPages } from '@/components'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { InfoDataSummary } from './InfoDataSummary'
import { PreviewDoc } from './PreviewDoc'
import { ActionsSummary } from './ActionsSummary'
import { Button } from '@/components/ui/button'
import { IconArrowNarrowLeft, IconDeviceFloppy } from '@tabler/icons-react'
import { toast } from 'react-toastify'
import { HeaderSection } from '@/modules/core'

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
      if (resApi) {
        toast.success('Resumen actualizado correctamente')
        router.refresh()
      }
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      <HeaderSection
        title="Detalles del Resumen"
        subtitle={`Gestionando el resumen: ${summary.title}`}
        showBackButton
        hrefBack="#"
      />

      <FormProvider {...methods}>
        <main className="flex flex-col lg:flex-row gap-6">
          <section className="w-full lg:max-w-xl shrink-0">
            <form
              onSubmit={methods.handleSubmit(handleFormSubmit)}
              className="p-6 bg-card border rounded-2xl shadow-xl space-y-8"
            >
              <div className="space-y-6">
                <InfoDataSummary defaultValues={summary} />
                <ActionsSummary defaultValues={summary} />
              </div>

              <div className="pt-6 border-t flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCancel}
                  className="font-bold text-muted-foreground"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="gap-2 font-black px-8 rounded-xl shadow-lg hover:scale-105 transition-transform"
                  disabled={loading || !isDirty}
                >
                  <IconDeviceFloppy size={20} />
                  Guardar cambios
                </Button>
              </div>
            </form>
          </section>

          <article className="flex-1 min-h-[600px]">
            <PreviewDoc />
          </article>
        </main>
      </FormProvider>
      <LoadingPages isOpen={loading} />
    </div>
  )
}
