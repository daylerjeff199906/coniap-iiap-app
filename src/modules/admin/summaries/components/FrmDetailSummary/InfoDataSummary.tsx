'use client'
import { IPerson, ISummary, ITopic } from '@/types'
import { convertDate } from '@/utils/functions'
import { Avatar, Chip } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'

export const InfoDataSummary = () => {
  const { watch } = useFormContext<ISummary>()

  const title = watch('title')
  const date_created = watch('created_at')
  const personas: IPerson = watch('person') as IPerson
  const tematica: ITopic = watch('topic') as ITopic
  const authors: string[] = watch('authors') as string[]
  const status = watch('isActived')
  const statusApproved = watch('isApproved')
  const isExternal = watch('isExternal')

  return (
    <>
      {/* Cabecera */}
      <header>
        <div className="flex flex-col gap-1">
          <div>
            <p className="text-xs text-gray-500">Detalle del resumen</p>
            <h1 className="font-bold uppercase text-2xl">{title}</h1>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-500">
              Creación: {convertDate(date_created)}
            </p>
            <Chip
              color={statusApproved ? 'success' : 'warning'}
              size="sm"
              radius="sm"
              variant="flat"
            >
              {statusApproved ? 'Aprobado' : 'Pendiente de aprobación'}
            </Chip>
          </div>
        </div>
      </header>
      {/* Tematica */}
      <section className="flex flex-col gap-2">
        <h3 className=" font-semibold">Linea temática</h3>
        <h1 className="text-sm font-medium text-gray-500">
          {tematica?.name || 'No tiene temática asignada'}
        </h1>
      </section>
      {/* Ponente o Creador */}
      <section className="flex flex-col gap-2">
        <h3 className=" font-semibold">
          {isExternal ? 'Creado por' : 'Ponente'}
        </h3>
        <section className="flex items-center gap-4">
          <Avatar
            src={personas?.image}
            alt={personas?.name}
            size="lg"
          />
          <div className="flex flex-col">
            <p className="font-bold text-xl">
              {personas?.name} {personas?.surName}
            </p>
            <p className="text-slate-500 font-medium text-sm">
              {personas?.email}
            </p>
          </div>
        </section>
      </section>
      {/* Co autores */}
      {authors && authors.length > 0 && (
        <section className="flex flex-col gap-2">
          <h3 className=" font-semibold">Co-autores</h3>
          <section className="flex flex-col gap-1">
            {authors.map((author, index) => (
              <p
                key={index}
                className="text-sm font-medium"
              >
                ✔️{author}
              </p>
            ))}
          </section>
        </section>
      )}
    </>
  )
}
