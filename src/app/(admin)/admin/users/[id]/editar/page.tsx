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
      <section className="flex flex-col w-full justify-center items-center">
        <FrmUserEditor user={user} />
      </section>
    )
  }

  return <></>
}
