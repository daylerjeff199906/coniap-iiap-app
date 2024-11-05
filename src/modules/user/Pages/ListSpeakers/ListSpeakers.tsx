import { IPerson } from '@/types'

interface IProps {
  speakers: IPerson[]
}

export const ListSpeakers = (props: IProps) => {
  const { speakers } = props
  return (
    <>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-7">
        {speakers.map((speaker) => (
          <div
            key={speaker.id}
            className="flex flex-col gap-1"
          >
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-4">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold line-clamp-2 text-primary-900 text-center uppercase">
                {speaker.name} {speaker.surName}
              </h3>
            </div>
            <p className="text-sm text-gray-500 text-center">{speaker.job}</p>
            <p className="text-tiny sm:text-small text-gray-400 line-clamp-2 text-center">
              <span className="font-bold">{speaker.institution}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
