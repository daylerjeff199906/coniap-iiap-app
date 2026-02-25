/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Link as UILink } from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '../..'
import Link from 'next/link'
import { useSummaries } from '@/hooks/admin'
import Image from 'next/image'

export const ListSummaries = () => {
  const { myPerson } = useAuth()
  const { summaries, getSummaryByIdPerson, loading } = useSummaries()
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
                variant="default"
                variant="solid"
                className="rounded-sm"
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
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              className="w-full h-24 rounded-md"
            />
          ))}
        </div>
      ) : (
        <>
          {summaries?.data?.length === 0 && (
            <section className="flex flex-col items-center w-full justify-center">
              <Image
                src="/svg/not-summary.svg"
                alt="No data"
                width={300}
                height={300}
              />
              <h1 className="font-bold text-lg sm:text-xl">
                Aún no has enviado ningún resumen
              </h1>
            </section>
          )}
          <section className="flex flex-col gap-4">
            {summaries?.data?.map((summary) => (
              <div
                key={summary.id}
                className="p-6 bg-gray-100 rounded-lg flex flex-col gap-4"
              >
                <section className="flex gap-4">
                  <Badge
                    className="rounded-sm"
                    color={summary.isApproved ? 'success' : 'default'}
                    variant="secondary"
                  >
                    {summary.isApproved
                      ? 'Aprobado'
                      : 'Pendiente de aprobación'}
                  </Badge>

                  <Badge
                    className="rounded-sm"
                    color={summary.file ? 'success' : 'danger'}
                    variant="secondary"
                  >
                    {summary?.file
                      ? 'Resumen subido'
                      : 'Archivo de resumen no subido'}
                  </Badge>
                </section>
                <section className="flex flex-col gap-1">
                  <p className="text-tiny text-gray-500">
                    subido el{' '}
                    {new Date(summary?.created_at).toLocaleDateString()} a las{' '}
                    {new Date(summary?.created_at).toLocaleTimeString()}
                  </p>
                  <h1 className="font-bold text-xl uppercase">
                    Tema: {summary.title}
                  </h1>
                  <p className="text-xs ">
                    Línea temática: {summary.topic?.name}
                  </p>
                  {summary?.authors && summaries?.data?.length > 0 && (
                    <p className="text-xs">
                      Co-autores:{' '}
                      {summary.authors.map((author) => author).join(', ')}
                    </p>
                  )}
                </section>
                <div className="flex flex-row gap-4">
                  {!summary?.isApproved && (
                    <Button
                      as={Link}
                      href={`/dashboard/files/${summary.id}`}
                      className="rounded-sm"
                      size="sm"
                      className="button-dark"
                    >
                      Editar resumen
                    </Button>
                  )}
                  <UILink
                    href={`${summary.file}`}
                    download
                    target="_blank"
                    size="sm"
                    showAnchorIcon
                    isDisabled={!summary.file}
                  >
                    {summary.file ? 'Ver resumen' : 'Sin resumen'}
                  </UILink>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </>
  )
}
