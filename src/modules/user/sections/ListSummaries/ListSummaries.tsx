/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button, Chip } from '@nextui-org/react'
import { useAuth } from '../..'
import Link from 'next/link'
import { useSummaries } from '@/hooks/admin'
import { IconMoodSad } from '@tabler/icons-react'

export const ListSummaries = () => {
  const { myPerson } = useAuth()
  const { summaries, getSummaryByIdPerson } = useSummaries()
  const pathname = usePathname()
  const isFiles = pathname === '/dashboard/files'

  useEffect(() => {
    if (isFiles && myPerson?.id) {
      getSummaryByIdPerson(myPerson?.id)
    }
  }, [isFiles, myPerson?.id])

  if (myPerson?.name === '' || myPerson?.surName === '')
    return (
      <>
        <section>
          <div className="p-6 bg-gray-100 rounded-lg flex flex-col justify-center gap-4">
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-xl">Completa tus datos</h1>
              <p>Debes completar tus datos para poder enviar un resumen</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Button
                as={Link}
                href="/dashboard/profile"
                color="primary"
                variant="solid"
              >
                Completar datos
              </Button>
            </div>
          </div>
        </section>
      </>
    )

  return (
    <>
      {summaries?.length === 0 && (
        <section className="flex flex-col items-center w-full justify-center">
          <div className="w-full flex flex-col items-center justify-center max-w-lg border px-4 py-8 rounded-md bg-gray-100">
            <IconMoodSad
              size={92}
              className="text-gray-500"
              stroke={1}
            />
            <h1 className="font-bold text-lg sm:text-xl">
              Aún no has enviado ningún resumen
            </h1>
          </div>
        </section>
      )}
      <section className="flex flex-col gap-4">
        {summaries?.map((summary) => (
          <div
            key={summary.id}
            className="p-6 bg-gray-100 rounded-lg flex flex-col gap-4"
          >
            <Chip>
              {summary.isApproved ? 'Aprobado' : 'Pendiente de aprobación'}
            </Chip>
            <h1 className="font-bold text-xl">{summary.title}</h1>
            <p>{summary.topic?.name}</p>
            <div className="flex flex-row gap-4">
              <Button
                as={Link}
                href={`/dashboard/files/${summary.id}`}
                color="primary"
                variant="solid"
              >
                Ver
              </Button>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
