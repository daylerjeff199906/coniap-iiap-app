import { ListSummaries } from '@/modules/user'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function Page() {
  const urlFormat =
    'https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/files%2Fformato_resumen_III-CONIAP-2024.docx?alt=media&token=46b37311-27d7-4460-9387-c07118b41422'
  return (
    <>
      <main className="flex flex-col gap-4">
        <section className="flex flex-col sm:flex-row gap-6 sm:justify-between">
          <div>
            <h1 className="sm:text-xl font-semibold">Historial de resúmenes</h1>
            <p className="text-sm text-gray-500">
              Aquí podrás ver los resúmenes que has enviado
            </p>
          </div>
          <div>
            <Button
              as={Link}
              href="/dashboard/files/new"
              color="primary"
              variant="solid"
              radius="full"
            >
              Enviar resumen
            </Button>
          </div>
        </section>
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
    </>
  )
}
