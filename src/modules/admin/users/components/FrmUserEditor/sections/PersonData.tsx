'use client'
import { IUserCreate } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'

export const PersonData = () => {
  const { control } = useFormContext<IUserCreate>()

  return <></>
}
