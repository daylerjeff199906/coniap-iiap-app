import { fetchTotalPersons } from '@/api'
import { CardList } from '@/modules/admin'
export default async function Page() {
  const participants = await fetchTotalPersons({
    typePerson: 'participant',
  })

  const speakers = await fetchTotalPersons({
    typePerson: 'speaker',
  })

  const speaker_mg = await fetchTotalPersons({
    typePerson: 'speaker_mg',
  })

  const totalParticipants = participants.length
  const totalSpeakers = speakers.length
  const totalSpeakerMg = speaker_mg.length

  return (
    <>
      <CardList
        data={{
          ponentes: totalSpeakers,
          participantes: totalParticipants,
          'ponentes magistrales': totalSpeakerMg,
        }}
      />
    </>
  )
}
