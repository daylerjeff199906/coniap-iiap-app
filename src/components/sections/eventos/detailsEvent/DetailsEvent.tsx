import { BannerStatic } from '@/components'
import { IEvent } from '@/types'

interface IProps {
  event: IEvent
}

export const DetailsEvent = (props: IProps) => {
  const { event } = props

  const subtitle = `Hora: ${event?.timeStart} - ${event?.timeEnd}`
  return (
    <>
      <BannerStatic
        title={event?.name}
        subtitle={subtitle}
        description={event?.date}
        urlImage={event?.banner || ''}
      />
    </>
  )
}
