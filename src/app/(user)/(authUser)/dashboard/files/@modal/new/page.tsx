import { FrmUploadFile } from '@/modules/user'
import { getCookie } from '@/lib'
import { IPerson, IResCookie, ISummary } from '@/types'
// import { fetchPersonById } from '@/api'

export default async function Page() {
  const res = (await getCookie('use')) as IResCookie
  if (!res) {
    return null
  }
  const id_person = res.value.toString()
  // const person: IPerson = await fetchPersonById(id_person)
  const summary = {} as ISummary
  const person = {} as IPerson

  return (
    <>
      <FrmUploadFile
        summary={{
          ...summary,
          person: {
            ...person,
            id: id_person,
          },
        }}
      />
    </>
  )
}
