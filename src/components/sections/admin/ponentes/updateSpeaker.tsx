/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { FrmEditSpeaker } from '@/components'

import { useSpeakers } from '@/hooks/admin'
import { usePersons } from '@/hooks/admin/usePersons'
import { useEffect } from 'react'

interface IProps {
  id: string
  isEdit: boolean
}

export const UpdateSpeaker = (props: IProps) => {
  const { id, isEdit } = props

  const { getPerson, person } = usePersons()

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        if (id) {
          await getPerson(id)
        }
      }
    }

    fetchData()
  }, [id, isEdit])

  return <>{person !== null && <FrmEditSpeaker speaker={person} />}</>
}
