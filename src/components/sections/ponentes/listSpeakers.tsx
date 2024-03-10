/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

import { useSpeaker } from '@/hooks/client'
import { CardSpeaker } from '@/components'

import svgImage from '@/assets/svg/ISOTIPO - CONIAP.svg'

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: 'rgba(255, 255, 255, 0)',
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: 'rgba(255, 255, 255, 1)',
  },
}

export const ListSpeakers = () => {
  const { getSpekersActive, speakersActive, loading } = useSpeaker()

  useEffect(() => {
    getSpekersActive()
  }, [])

  return (
    <>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
        {loading && (
          <div className="w-full flex justify-center items-center h-[calc(100vh-20rem)]">
            {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500" /> */}
          </div>
        )}
        {speakersActive &&
          speakersActive?.map((speaker, index) => (
            <CardSpeaker
              speaker={speaker}
              key={index}
            />
          ))}
      </div>
    </>
  )
}
