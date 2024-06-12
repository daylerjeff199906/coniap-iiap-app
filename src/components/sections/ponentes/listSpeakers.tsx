'use client'
import { CardSpeaker, DataNotFound } from '@/components'

import { IPerson } from '@/types'

interface IProps {
  speakers: IPerson[] | undefined
}

export const ListSpeakers = (props: IProps) => {
  const { speakers } = props

  return (
    <>
      {speakers !== undefined ? (
        <>
          {speakers && speakers.length > 0 ? (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
              {speakers.map((speaker, index) => (
                <CardSpeaker
                  speaker={speaker}
                  key={index}
                />
              ))}
            </div>
          ) : (
            <DataNotFound />
          )}
        </>
      ) : (
        <DataNotFound />
      )}
    </>
  )
}
