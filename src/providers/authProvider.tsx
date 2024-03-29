/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react'

import { usePrograms, useEvents, useFiles } from '@/hooks/admin'
import { IEvent, IProgram } from '@/types'

export const authProvider = createContext<{}>({})

export const EventToProgramProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <authProvider.Provider value={{}}>{children}</authProvider.Provider>
}

export const useLogicEventToProgram = () => useContext(authProvider)
