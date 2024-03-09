/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { useSpeaker } from '@/hooks/client'

import { CardSpeaker } from '@/components'

export const ListSpeakers = () => {
  const { getSpekersActive, speakersActive } = useSpeaker()

  useEffect(() => {
    getSpekersActive()
  }, [])

  return (
    <>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {speakersActive &&
          speakersActive.map((speaker, index) => (
            <CardSpeaker
              speaker={speaker}
              key={index}
            />
          ))}
      </div>
    </>
  )
}
