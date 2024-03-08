import { CardSpeaker } from '@/components'
import { ISpeaker } from '@/types'

const speakers: ISpeaker[] = [
  {
    id: 1,
    fullName: 'John',
    surName: 'Doe',
    job: 'CEO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    fullName: 'Jane',
    surName: 'Doe',
    job: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    fullName: 'John',
    surName: 'Doe',
    job: 'CEO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    fullName: 'Jane',
    surName: 'Doe',
    job: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    fullName: 'Jane',
    surName: 'Doe',
    job: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    fullName: 'Jane',
    surName: 'Doe',
    job: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 7,
    fullName: 'Jane',
    surName: 'Doe',
    job: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 8,
    fullName: 'Jane',
    surName: 'Doe',
    job: 'CTO',
    image: 'https://via.placeholder.com/150',
  },
]

export const SpeakersSection = () => {
  return (
    <>
      <section className="bg-white section-home">
        <div className="container space-y-3">
          <div className="section-title">
            <h2 className="title-section-home">Expositores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {speakers.slice(0, 7).map((speaker) => (
              // <div key={speaker.id}>
              <CardSpeaker
                speaker={speaker}
                key={speaker.id}
              />
              // </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
