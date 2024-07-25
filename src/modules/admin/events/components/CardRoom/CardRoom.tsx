import { Button, Image, Link } from '@nextui-org/react'
import socialNetworks from '@/utils/json/social_networks.json'
import { ISala } from '@/types'
import { IconDots } from '@tabler/icons-react'

const findSocialNetwork = (id: number) => {
  return socialNetworks.find((item) => item.id === id)
}

interface IProps {
  room: ISala
}

export const CardRoom = (props: IProps) => {
  const { room } = props
  const platform = findSocialNetwork(room.platform)

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow-lg relative">
      <section className="absolute top-2 right-2">
        <Button
          isIconOnly
          size="sm"
          radius="sm"
          variant="light"
          className="text-gray-500"
        >
          <IconDots size={20} />
        </Button>
      </section>
      <section className="flex flex-col gap-2 justify-center items-center">
        <Image
          src={platform?.logo}
          width={50}
          height={50}
          alt={platform?.name}
          className="rounded-full object-cover w-20"
        />
        <div>
          <h3 className="text-lg font-semibold text-center">
            {platform?.name}
          </h3>
          <p className="text-sm text-center line-clamp-1">{room?.name}</p>
        </div>
      </section>
      {/* <section>
        <Link
          href={room.url || ''}
          className="btn btn-sm btn-primary"
        >
          Ver link
        </Link>
      </section> */}
    </div>
  )
}
