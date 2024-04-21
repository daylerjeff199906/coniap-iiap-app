/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'

import { FrmAddProgram } from '@/components'
import { usePrograms } from '@/hooks/admin'

interface IProps {
  id: string
  isEdit: boolean
}

export const UpdateProgram = (props: IProps) => {
  const { id, isEdit } = props

  const { getProgramById, program } = usePrograms()

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        if (id) {
          await getProgramById(id)
        }
      }
    }

    fetchData()
  }, [id, isEdit])

  return <>{program !== null && <FrmAddProgram program={program} />}</>
}
