'use client'
import { ListSummaries } from '@/modules/user'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import infoData from '@/utils/json/infoConiap.json'
import { useAuthContext } from '@/provider'
import { IconAlertTriangleFilled } from '@tabler/icons-react'
import { AlertCustom } from '@/modules/core'

export default function Page() {
  const { user } = useAuthContext()
  const urlFormat =
    'https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/files%2Fformato_resumen_III-CONIAP-2024.docx?alt=media&token=46b37311-27d7-4460-9387-c07118b41422'

  const date = infoData.data.dates.summary.end
  const dateFormatted = new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const isBefore = new Date(date) > new Date()

  return (
    <>
      {user?.person === null && (
        <section className="p-4 rounded-md border-danger-500 bg-danger-50 text-danger-700 border-l-8 flex gap-3 items-start sm:text-lg">
          <div>
            <IconAlertTriangleFilled size={32} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="">
              <strong>¡Atención!</strong> Debes completar tus datos personales
              para poder enviar resúmenes.
            </p>
            <div>
              <Button
                as={Link}
                href="/dashboard/profile"
                color="danger"
                variant="solid"
                size="sm"
                radius="sm"
              >
                Completar datos
              </Button>
            </div>
          </div>
        </section>
      )}
      {user?.person !== null && (
        <main className="flex flex-col gap-4">
          <section className="flex flex-col sm:flex-row gap-6 sm:justify-between">
            <div>
              <h1 className="sm:text-xl font-semibold">
                Historial de resúmenes
              </h1>
              <p className="text-sm text-gray-500">
                Aquí podrás ver los resúmenes que has enviado
              </p>
            </div>
            {isBefore && (
              <div>
                <Button
                  as={Link}
                  href="/dashboard/files/new"
                  color="primary"
                  variant="solid"
                  radius="sm"
                >
                  Enviar resumen
                </Button>
              </div>
            )}
          </section>
          <AlertCustom
            showIcon
            title="Atención, fecha límite"
            type={isBefore ? 'warning' : 'error'}
            message={`La fecha límite para enviar resúmenes es ${dateFormatted}. ${
              isBefore ? '¡Aún tienes tiempo!' : '¡Ya pasó la fecha límite!'
            }`}
          />
          <section>
            <Link
              href={urlFormat}
              download
              className="text-primary-500 hover:text-primary-800 cursor-pointer text-xs text-end pb-2 underline"
            >
              Descargar formato de resumen
            </Link>
          </section>
          <section>
            <ListSummaries />
          </section>
        </main>
      )}
    </>
  )
}
