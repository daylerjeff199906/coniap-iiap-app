/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
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
      <section>
        <div className="p-6 bg-accent/20 rounded-xl border flex flex-col justify-center gap-6 text-center">
          <div className="space-y-2">
            <h1 className="font-bold text-2xl">Completa tus datos</h1>
            <p className="text-muted-foreground">Debes completar tus datos para poder enviar un resumen</p>
          </div>
          <div className="flex justify-center">
            <Button asChild
              variant="default"
              className="px-8"
            >
              <Link href="/dashboard/profile">Completar datos</Link>
            </Button>
          </div>
        </div>
      </section>
    )

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              className="w-full h-32 rounded-xl">))}
        </div>
      ) : (
        <>
          {summaries?.data?.length === 0 && (
            <section className="flex flex-col items-center w-full justify-center py-12 gap-6">
              <Image
                src="/svg/not-summary.svg"
                alt="No data"
                width={260}
                height={260}
                className="opacity-50"
              />
              <h1 className="font-bold text-xl text-muted-foreground">
                Aún no has enviado ningún resumen
              </h1>
            </section>
          )}
          <section className="flex flex-col gap-6">
            {summaries?.data?.map((summary) => (
              <div
                key={summary.id}
                className="p-6 bg-card border rounded-xl shadow-sm flex flex-col gap-6 transition-all hover:shadow-md"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={summary.isApproved ? "default" : "secondary"}
                    className="rounded-full px-3"
                  >
                    {summary.isApproved
                      ? 'Aprobado'
                      : 'Pendiente de aprobación'}
                  </Badge>

                  <Badge
                    variant={summary.file ? "outline" : "destructive"}
                    className="rounded-full px-3"
                  >
                    {summary?.file
                      ? 'Resumen subido'
                      : 'Archivo de resumen no subido'}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Subido el{' '}
                    {new Date(summary?.created_at).toLocaleDateString()} a las{' '}
                    {new Date(summary?.created_at).toLocaleTimeString()}
                  </p>
                  <h1 className="font-extrabold text-2xl tracking-tight uppercase">
                    {summary.title}
                  </h1>
                  <p className="text-sm border-l-4 border-primary/30 pl-3 py-1 font-medium">
                    Línea temática: {summary.topic?.name}
                  </p>
                  {summary?.authors && summary?.authors?.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-xs font-semibold text-muted-foreground">Co-autores:</span>
                      {summary.authors.map((author, i) => (
                        <span key={i} className="text-xs bg-muted px-2 py-1 rounded-md">{author}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  {!summary?.isApproved && (
                    <Button
                      asChild
                      size="sm"
                      className="font-bold shadow-sm"
                    >
                      <Link href={`/dashboard/files/${summary.id}`}>
                        Editar resumen
                      </Link></Button>
                  )}
                  {summary.file ? (
                    <Link
                      href={`${summary.file}`}
                      download
                      target="_blank"
                      className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      Ver resumen
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">Sin archivo</span>
                  )}
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  )
}
