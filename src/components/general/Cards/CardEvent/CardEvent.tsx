import { IEvent } from '@/types'
import { CardAgendaEvent, CardGalleryEvent, CardListEvent } from './variants'

interface IProps {
  event: IEvent
  variant?: 'gallery' | 'list' | 'agenda'
  showImage?: boolean
}

export const CardEvent = (props: IProps) => {
  const { event, variant, showImage = true } = props

  return (
    <>
      {variant === 'list' ? (
        <>
          <CardListEvent
            event={event}
            showImage={showImage}
          />
        </>
      ) : variant === 'agenda' ? (
        <>
          <CardAgendaEvent event={event} />
        </>
      ) : (
        <>
          <CardGalleryEvent event={event} />
        </>
      )}
    </>
  )
}
