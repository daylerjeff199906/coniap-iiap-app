import { IPerson } from '@/types'
import { Avatar } from '@nextui-org/react'

interface IProps {
  speakers: IPerson[]
}

export const ListSpeakers = (props: IProps) => {
  const { speakers } = props
  return (
    <>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {speakers.map((speaker) => (
          <div
            key={speaker.id}
            className="flex flex-col gap-1"
          >
            <div className="flex flex-row gap-2 sm:gap-4">
              {/* <Avatar
                src={speaker.image || ''}
                alt={speaker.name}
                className="w-10 h-10 sm:w-16 sm:h-16 min-w-10 min-h-10 sm:min-w-16 sm:min-h-16 rounded-full"
              /> */}
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold line-clamp-2 text-center text-primary-900">
                  {speaker.name} {speaker.surName}
                </h3>
              </div>
            </div>
            <p className="text-tiny sm:text-small text-gray-400 line-clamp-2 text-center">
              {speaker.job} | {''}
              <span className="font-bold">{speaker.institution}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
