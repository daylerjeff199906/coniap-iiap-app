import { IPerson } from '@/types'
import { Image } from '@nextui-org/react'

interface IProps {
  data: IPerson
}

export const DetailsParticipant = (props: IProps) => {
  const { data } = props
  return (
    <div>
      <div>
        <Image
          src={data.image}
          alt={data.name}
        />
        <div>
          <h3 className="text-xl font-bold">{data.name}</h3>
          <p className="text-lg ">{data.surName}</p>
          <p className="text-sm text-gray-500">{data.email}</p>
        </div>
      </div>
    </div>
  )
}
