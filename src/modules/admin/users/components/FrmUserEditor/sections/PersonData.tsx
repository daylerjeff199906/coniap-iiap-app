import { IUser } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'

export const PersonData = () => {
  const { control } = useFormContext<IUser>()

  return <></>
}
