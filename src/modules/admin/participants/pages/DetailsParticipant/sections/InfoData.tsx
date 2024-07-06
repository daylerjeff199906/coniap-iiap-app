'use client'
import { IPerson, ISummary } from '@/types'
import { Image, Chip } from '@nextui-org/react'

interface IProps {
  data: IPerson
  summaries?: ISummary[] | null
}

export const InfoData = (props: IProps) => {
  const { data, summaries } = props

  return (
    <>
      <section className="flex items-center gap-4">
        <div className="w-fit">
          <Image
            src={data?.image}
            alt={data?.name}
            removeWrapper
            width={72}
            className="h-40 w-44 object-cover rounded-full"
          />
        </div>
        <div className="w-full">
          <Chip
            size="sm"
            radius="sm"
            variant="flat"
            color="success"
          >
            {data?.typePerson === 'speaker'
              ? 'Ponente'
              : data?.typePerson === 'speaker_mg'
              ? 'Ponente magistral'
              : 'Participante'}
          </Chip>
          <h3 className="text-5xl font-bold">{data?.name}</h3>
          <p className="text-lg ">{data?.surName}</p>
          <p className="text-sm text-gray-500">{data?.email}</p>
        </div>
      </section>
      <section>
        <h4 className="font-bold mt-4 text-gray-500">Presentación</h4>
        <p className="text-sm">{data?.presentation || 'No hay presentación'}</p>
      </section>
      <section className="flex flex-col gap-2">
        <h4 className="font-bold mt-4 text-gray-500">Otros datos</h4>
        <div>
          <p>Institución: {data?.institution}</p>
          <p>Rol: {data?.job}</p>
          <p>País: {data?.location}</p>
        </div>
      </section>
      {summaries && summaries?.length > 0 && (
        <section className="flex flex-col gap-2">
          <h4 className="font-bold mt-4 text-gray-500">Resúmenes adjuntos</h4>
          <div>
            {props.summaries?.map((summary) => (
              <div
                key={summary.id}
                className="flex flex-col gap-2 border rounded-lg p-4 bg-gray-100"
              >
                <Chip
                  size="sm"
                  radius="sm"
                  variant="dot"
                >
                  Año: {summary.created_at.split('-')[0]}
                </Chip>
                <h5 className="font-bold uppercase">{summary.title}</h5>
                <p>Línea temática</p>
                <p className="text-sm text-gray-500">{summary.topic?.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
