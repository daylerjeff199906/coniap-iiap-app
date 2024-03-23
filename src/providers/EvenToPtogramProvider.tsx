/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react'

import { usePrograms, useEvents } from '@/hooks/admin'
import { IEvent, IProgram } from '@/types'

export const EventToProgramContext = createContext<{
  program: IProgram | null
  getProgramById: (id: string) => void
}>({
  program: null,
  getProgramById: () => {},
})

export const EventToProgramProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { getProgramById, program } = usePrograms()

  return (
    <EventToProgramContext.Provider
      value={{
        program,
        getProgramById,
      }}
    >
      {children}
    </EventToProgramContext.Provider>
  )
}

export const useLogicRecords = () => useContext(EventToProgramContext)
