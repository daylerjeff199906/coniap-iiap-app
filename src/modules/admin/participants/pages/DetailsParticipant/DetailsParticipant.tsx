'use client'
import { IPerson } from '@/types'
import { Image, Chip } from '@nextui-org/react'

interface IProps {
  data: IPerson
}

export const DetailsParticipant = (props: IProps) => {
  const { data } = props
  return (
    <main className="flex flex-col gap-4 w-full p-6 border rounded-xl">
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
    </main>
  )
}
