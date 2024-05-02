'use client'
import { FrmProfile } from '../..'
import { IPerson } from '@/types'

interface IProps {
  person: IPerson
}

export const ProfileSection = (props: IProps) => {
  const { person } = props
  return (
    <>
      <FrmProfile person={person} />
    </>
  )
}
