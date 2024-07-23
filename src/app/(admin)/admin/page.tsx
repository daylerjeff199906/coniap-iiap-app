import { fetchPersonStats, fetchPersons } from '@/api'
import { CardList, PersonRecents } from '@/modules/admin'

import { IPerson } from '@/types'

interface IData {
  data: IPerson[]
  count: number
}

export default async function Page() {
  const personStats = await fetchPersonStats()

  const persons: IData | null = (await fetchPersons('', '', '', '', '', true, {
    page: 1,
    limit: 10,
  })) as IData | null

  const data = {
    ponentes: personStats['speaker'],
    participantes: personStats['participant'],
    'ponentes magistrales': personStats['speaker_mg'],
  }

  let personList: IPerson[] = []

  if (!persons) {
    personList = [] as unknown as IPerson[]
  } else {
    personList = persons.data as unknown as IPerson[]
  }

  return (
    <main className="flex flex-col gap-3 lg:flex-row lg:gap-3">
      <article className="flex flex-col gap-3 lg:max-w-3xl">
        <CardList data={data} />
        <PersonRecents data={personList} />
      </article>
      <aside className="flex flex-col gap-3 lg:max-w-3xl"></aside>
    </main>
  )
}
