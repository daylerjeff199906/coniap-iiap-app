import { fetchPersonById } from '@/api'
import { DialogStatus } from '@/modules/admin'
import { IPerson } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const person: IPerson = await fetchPersonById(id)
    .then((res) => res)
    .catch((err) => err)

  if (person && person?.isActived !== undefined) {
    return (
      <section className="flex flex-col w-full justify-center items-center">
        <DialogStatus
          id={id}
          path="persons"
          status={person?.isActived}
        />
      </section>
    )
  }

  return <></>
}
