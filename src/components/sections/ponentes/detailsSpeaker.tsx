import { IPerson } from '@/types'
import { Avatar, Divider } from '@nextui-org/react'
import Link from 'next/link'
import { IconArrowNarrowLeft } from '@tabler/icons-react'

interface IProps {
  speaker: IPerson
}

const img_default =
  'https://img.freepik.com/foto-gratis/apuesto-hombre-negocios-maduro'

export const DetailsSpeaker = (props: IProps) => {
  const { speaker } = props
  return (
    <>
      <main className="container section-home space-y-6">
        <section>
          <div className="flex gap-4 items-center">
            <Link
              href="/ponentes"
              className="text-primary-500  hover:text-primary-600 flex items-center gap-2"
            >
              <IconArrowNarrowLeft size={20} />
              Lista de ponentes
            </Link>
            <Divider
              orientation="vertical"
              className="bg-primary-500 h-6 w-[1px]"
            />
            <Link
              href="/agenda"
              className="text-primary-500  hover:text-primary-600"
            >
              Ir a Agenda
            </Link>
          </div>
        </section>
        <section className="flex justify-between items-center">
          <section className="space-y-4">
            <h1 className="text-2xl sm:text-4xl font-bold">
              {speaker?.name} {speaker?.surName}
            </h1>
            <p className="text-tiny sm:text-medium text-gray-400">
              {speaker?.job} | {''}
              <span className="font-bold">{speaker?.institution}</span>
            </p>
            <Divider className="w-full max-w-48 py-0.5" />
            <h3 className="font-medium text-gray-400">{speaker?.location}</h3>
          </section>
          <Avatar
            src={speaker?.image || img_default}
            className="w-40 h-40"
          />
        </section>
        <Divider className="w-full" />
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Presentación</h2>
          <p className="text-tiny sm:text-medium">{speaker?.presentation}</p>
        </section>
      </main>
    </>
  )
}
