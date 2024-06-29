'use client'
import { IPerson } from '@/types'
import { convertListPersonToExcel } from '../../functions'
import { ExportExcelButton } from '@/modules/admin'
import { usePathname } from 'next/navigation'
import { useFilterFromUrl } from '@/modules/core'

interface IProps {
  dataList: Array<IPerson>
}

export const ExportExcel = (props: IProps) => {
  const { dataList } = props
  const listExcel = convertListPersonToExcel(dataList)

  const pathname = usePathname()
  const { getParams } = useFilterFromUrl()

  const includePonent = pathname.includes('ponentes')
  const includeParticipants = pathname.includes('asistentes')

  const isSpeaker = getParams('typePerson', '') === 'speaker'
  const isSpeakerMg = getParams('typePerson', '') === 'speaker_mg'
  const isParticipant = getParams('typePerson', '') === 'participant'

  const dateNow = new Date()

  const fileName = includePonent
    ? 'Ponentes'
    : includeParticipants
    ? 'Asistentes'
    : 'Participantes'

  const titlePath =
    !includePonent || !includeParticipants
      ? ''
      : isSpeaker
      ? 'Ponentes'
      : isSpeakerMg
      ? 'Ponentes Magistrales'
      : isParticipant
      ? 'Asistentes'
      : ''

  return (
    <>
      <ExportExcelButton
        dataList={listExcel}
        fileName={`${
          fileName || titlePath
        } - ${dateNow.toLocaleDateString()}.xlsx`}
      />
    </>
  )
}
