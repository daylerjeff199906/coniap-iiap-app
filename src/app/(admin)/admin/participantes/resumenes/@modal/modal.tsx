'use client'
import { ISummary } from '@/types'
import {
  FrmUpdateSummary,
  FrmDetailSummary,
  ModalSummary,
} from '@/modules/admin'

interface IProps {
  isEdit: boolean
  summary: ISummary
}

export const ModalDetails = (props: IProps) => {
  const { summary, isEdit } = props

  return (
    <>
      <ModalSummary summary={summary}>
        {isEdit ? (
          <FrmUpdateSummary summary={summary} />
        ) : (
          <FrmDetailSummary summary={summary} />
        )}
      </ModalSummary>
    </>
  )
}
