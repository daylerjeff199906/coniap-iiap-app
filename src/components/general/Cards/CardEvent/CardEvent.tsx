import { IEvent } from '@/types'
import { CardGalleryEvent, CardListEvent } from './variants'

interface IProps {
  event: IEvent
  variant?: 'gallery' | 'list'
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
      ) : (
        <>
          <CardGalleryEvent
            event={event}
            showImage={showImage}
          />
        </>
      )}
    </>
  )
}
