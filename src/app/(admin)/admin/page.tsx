import { fetchPersonStats, fetchPersons, fetchUsers } from '@/api'
import {
  CardList,
  PanelUser,
  PersonRecents,
  UserRecents,
} from '@/modules/admin'

import { IPerson, IUser } from '@/types'

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

  const users = await fetchUsers({})

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

  let userList: IUser[] = []

  if (!users) {
    userList = [] as unknown as IUser[]
  } else {
    userList = users.slice(0, 10) as unknown as IUser[]
  }

  return (
    <main className="flex flex-col gap-3 lg:flex-row lg:gap-3">
      <article className="flex flex-col gap-3 w-full sm:max-w-[calc(100%-320px)] lg:max-w-[calc(100%-420px)]">
        <CardList data={data} />
        <PersonRecents data={personList} />
      </article>
      <aside className="flex flex-col gap-3 w-80 max-w-80 sm:w-[320px] sm:max-w-[320px] lg:w-[420px] lg:max-w-[420px]">
        <PanelUser />
        <UserRecents data={userList} />
      </aside>
    </main>
  )
}
