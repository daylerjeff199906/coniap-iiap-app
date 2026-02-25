'use client'
import { IPerson, ISummary, ITopic } from '@/types'
import { formatDate } from '@/utils/functions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface IProps {
  defaultValues?: ISummary
}

export const InfoDataSummary = (props: IProps) => {
  const { defaultValues } = props
  const { watch } = useFormContext<ISummary>()

  const title = watch('title')
  const date_created = watch('created_at')
  const personas: IPerson = watch('person') as IPerson
  const tematica: ITopic = watch('topic') as ITopic
  const authors: string[] = watch('authors') as string[]
  const statusApproved = defaultValues?.isApproved
  const isExternal = watch('isExternal')

  return (
    <div className="space-y-8">
      {/* Cabecera */}
      <header className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Detalle del resumen</p>
          <h1 className="font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight">{title}</h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            Creación: <span className="text-foreground">{formatDate(date_created, 'DD/MM/YYYY Hora: HH:mm')}</span>
          </p>
          <Badge
            variant="secondary"
            className={cn(
              "w-fit rounded-full px-4 py-1",
              statusApproved ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
            )}
          >
            {statusApproved ? 'Resumen Aprobado' : 'Pendiente de aprobación'}
          </Badge>
        </div>
      </header>

      {/* Tematica */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Línea temática</h3>
        <p className="text-base text-muted-foreground border-l-4 border-primary/20 pl-4 py-1 italic">
          {tematica?.name || 'No tiene temática asignada'}
        </p>
      </section>

      {/* Ponente o Creador */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">
          {isExternal ? 'Creado por' : 'Ponente'}
        </h3>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/30 border">
          <Avatar className="h-16 w-16 border-2 border-primary/10">
            <AvatarImage src={personas?.image} alt={personas?.name} />
            <AvatarFallback>{personas?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-bold text-lg leading-none mb-1">
              {personas?.name} {personas?.surName}
            </p>
            <p className="text-muted-foreground text-sm">
              {personas?.email}
            </p>
          </div>
        </div>
      </section>

      {/* Co autores */}
      {authors && authors.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Co-autores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {authors.map((author, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg bg-card border border-border text-sm font-medium"
              >
                <span className="text-primary">●</span>
                {author}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
