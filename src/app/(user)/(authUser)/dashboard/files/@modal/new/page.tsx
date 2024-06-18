import { FrmUploadFile } from '@/modules/user'
import { getCookie } from '@/lib'
import { IPerson, IResCookie } from '@/types'
import { fetchPersonById } from '@/api'

export default async function Page() {
  const res = (await getCookie('use')) as IResCookie
  if (!res) {
    return null
  }
  const id_person = res.value.toString()
  const person: IPerson = await fetchPersonById(id_person)

  return (
    <>
      <FrmUploadFile
        summary={{
          person: person,
        }}
      />
    </>
  )
}
