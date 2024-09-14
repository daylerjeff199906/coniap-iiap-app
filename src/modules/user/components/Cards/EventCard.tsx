import { IEvent } from '@/types'

interface EventCardProps {
  variant?: 'gallery' | 'list' | 'agenda'
  data: IEvent
}

export const EventCard = (props: EventCardProps) => {
  const { variant = 'list', data } = props

  return (
    <>
      {variant === 'list' && (
        <main className="grid grid-cols-6">
          <section className="col-span-2"></section>
          <section className="col-span-4">
            <header>
              <h1 className="font-bold text-2xl uppercase">{data.name}</h1>
            </header>
          </section>
        </main>
      )}
      {variant === 'agenda' && <></>}
      {variant === 'gallery' && <></>}
    </>
  )
}
