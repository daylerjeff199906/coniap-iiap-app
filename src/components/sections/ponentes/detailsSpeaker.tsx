import { IPerson } from '@/types'
import { Divider } from '@nextui-org/react'

interface IProps {
  speaker: IPerson
}

export const DetailsSpeaker = (props: IProps) => {
  const { speaker } = props
  return (
    <>
      <main className="section-home">
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
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Presentación</h2>
          <p className="text-tiny sm:text-medium">{speaker?.presentation}</p>
        </section>
      </main>
    </>
  )
}
