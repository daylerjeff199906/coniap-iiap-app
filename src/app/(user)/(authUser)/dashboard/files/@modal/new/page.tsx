import { FrmUploadFile } from '@/modules/user'
import { getCookie } from '@/lib'
import { IPerson, IResCookie, ISummary } from '@/types'
import { fetchPersonByEmail } from '@/api'

export default async function Page() {
  const res = (await getCookie('user')) as IResCookie
  if (!res) {
    return null
  }
  const user = JSON.parse(res.value)

  const person: IPerson = (await fetchPersonByEmail(user.email)) as IPerson
  const summary = {} as ISummary

  return (
    <>
      <FrmUploadFile
        summary={{
          ...summary,
          person: {
            ...person,
            id: person.id,
          },
        }}
      />
    </>
  )
}
