import { IPerson } from '@/types'

interface IProps {
  speaker: IPerson
}

export const DetailsSpeaker = (props: IProps) => {
  const { speaker } = props
  return (
    <>
      <main>
        <section>
          <h1 className="text-2xl sm:text-5xl">
            {speaker?.name} {speaker?.surName}
          </h1>
        </section>
      </main>
    </>
  )
}
