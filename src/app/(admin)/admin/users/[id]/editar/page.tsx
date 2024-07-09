import { fetchUserById } from '@/api'
import { FrmUserEditor } from '@/modules/admin'
import { IUser } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const user: IUser = await fetchUserById(Number(id))
    .then((res) => res)
    .catch((err) => err)

  if (user) {
    return (
      <main className="w-full flex flex-col gap-2 items-center">
        <section className="w-full max-w-2xl rounded-lg border p-4">
          <FrmUserEditor user={user} />
        </section>
      </main>
    )
  }

  return <></>
}
