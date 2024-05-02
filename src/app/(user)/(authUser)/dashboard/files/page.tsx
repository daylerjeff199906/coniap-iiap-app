import { ListSummaries } from '@/modules/user'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function Page() {
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
          <ListSummaries />
        </section>
      </main>
    </>
  )
}
