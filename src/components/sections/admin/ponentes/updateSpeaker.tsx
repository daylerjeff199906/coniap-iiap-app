/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { FrmEditSpeaker } from '@/components'

import { useSpeakers } from '@/hooks/admin'
import { useEffect } from 'react'

interface IProps {
  id: string
  isEdit: boolean
}

export const UpdateSpeaker = (props: IProps) => {
  const { id, isEdit } = props

  const { geSpeakerById, speaker } = useSpeakers()

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        if (id) {
          await geSpeakerById(id)
        }
      }
    }

    fetchData()
  }, [id, isEdit])

  return <>{speaker !== null && <FrmEditSpeaker speaker={speaker} />}</>
}
