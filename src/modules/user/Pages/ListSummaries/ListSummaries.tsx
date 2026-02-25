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
import { IconFileText, IconEdit, IconExternalLink, IconInfoCircle, IconPlus } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

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
      <section className="animate-in fade-in zoom-in duration-500">
        <div className="p-12 bg-primary/5 rounded-3xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-6 text-center shadow-inner">
          <div className="p-4 bg-primary/10 rounded-full">
            <IconInfoCircle size={48} className="text-primary" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h1 className="font-black text-3xl uppercase italic tracking-tighter">Completa tus datos</h1>
            <p className="text-muted-foreground font-medium">Debes completar tu perfil profesional para poder enviar y gestionar tus propuestas de resumen.</p>
          </div>
          <Button asChild
            variant="default"
            size="lg"
            className="px-10 rounded-2xl font-black uppercase italic shadow-lg shadow-primary/20"
          >
            <Link href="/dashboard/profile">Ir a mi perfil</Link>
          </Button>
        </div>
      </section>
    )

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {loading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              className="w-full h-48 rounded-3xl"
            />
          ))}
        </div>
      ) : (
        <>
          {summaries?.data?.length === 0 && (
            <section className="flex flex-col items-center w-full justify-center py-20 gap-8 bg-muted/20 rounded-3xl border-2 border-dashed">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <Image
                  src="/svg/not-data.svg"
                  alt="No data"
                  width={280}
                  height={280}
                  className="opacity-70 relative"
                />
              </div>
              <div className="text-center space-y-2">
                <h1 className="font-black text-2xl uppercase italic tracking-tighter text-muted-foreground">
                  Aún no has enviado propuestas
                </h1>
                <p className="text-sm text-muted-foreground font-medium">Tus resúmenes enviados aparecerán listados en esta sección.</p>
              </div>
              <Button asChild className="rounded-2xl font-bold gap-2 shadow-lg">
                <Link href="/dashboard/files/upload">
                  <IconPlus size={18} stroke={3} />
                  Enviar primer resumen
                </Link>
              </Button>
            </section>
          )}

          <section className="grid grid-cols-1 gap-6">
            {summaries?.data?.map((summary) => (
              <div
                key={summary.id}
                className="group p-8 bg-card border-2 rounded-3xl shadow-sm flex flex-col gap-6 transition-all hover:shadow-2xl hover:border-primary/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <IconFileText size={120} stroke={1} />
                </div>

                <div className="flex flex-wrap gap-3 relative z-10">
                  <Badge
                    variant={summary.isApproved ? "default" : "secondary"}
                    className={cn(
                      "rounded-full px-4 py-1 font-bold uppercase tracking-widest text-[10px] italic shadow-sm",
                      summary.isApproved ? "bg-green-500 hover:bg-green-600" : "bg-primary/10 text-primary border-primary/20"
                    )}
                  >
                    {summary.isApproved
                      ? 'APROBADO'
                      : 'PENDIENTE'}
                  </Badge>

                  <Badge
                    variant={summary.file ? "outline" : "destructive"}
                    className="rounded-full px-4 py-1 font-bold uppercase tracking-widest text-[10px] italic shadow-sm"
                  >
                    {summary?.file
                      ? 'ARCHIVO SUBIDO'
                      : 'ARCHIVO PENDIENTE'}
                  </Badge>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                      Subido el {new Date(summary?.created_at).toLocaleDateString()} a las {new Date(summary?.created_at).toLocaleTimeString()}
                    </p>
                    <h1 className="font-black text-3xl tracking-tighter uppercase italic leading-none group-hover:text-primary transition-colors">
                      {summary.title}
                    </h1>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-xl border">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-tight">
                      Línea: <span className="text-foreground">{summary.topic?.name}</span>
                    </p>
                  </div>

                  {summary?.authors && summary?.authors?.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {summary.authors.map((author, i) => (
                        <span key={i} className="text-[10px] font-black uppercase tracking-wider bg-primary/5 text-primary/70 px-3 py-1 rounded-lg border border-primary/10">
                          {author}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-dashed relative z-10">
                  <div className="flex items-center gap-4">
                    {!summary?.isApproved && (
                      <Button
                        asChild
                        size="sm"
                        variant="secondary"
                        className="font-bold rounded-xl h-10 px-6 gap-2 border-2 border-transparent hover:border-primary/20"
                      >
                        <Link href={`/dashboard/files/${summary.id}`}>
                          <IconEdit size={18} />
                          Editar
                        </Link>
                      </Button>
                    )}

                    {summary.file && (
                      <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="font-bold text-primary hover:text-primary hover:bg-primary/5 gap-2 px-6"
                      >
                        <Link href={`${summary.file}`} target="_blank">
                          <IconExternalLink size={18} />
                          Ver documento
                        </Link>
                      </Button>
                    )}
                  </div>

                  {!summary.file && (
                    <span className="text-xs font-black uppercase tracking-widest text-destructive animate-pulse">
                      Archivo no subido
                    </span>
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
