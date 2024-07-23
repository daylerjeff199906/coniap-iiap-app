import { fetchPersonStats } from '@/api'
import { CardList } from '@/modules/admin'

export default async function Page() {
  const personStats = await fetchPersonStats()

  const data = {
    ponentes: personStats['speaker'],
    participantes: personStats['participant'],
    'ponentes magistrales': personStats['speaker_mg'],
  }

  return (
    <>
      <CardList data={data} />
    </>
  )
}
