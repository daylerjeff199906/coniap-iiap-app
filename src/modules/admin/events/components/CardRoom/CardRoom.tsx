import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
} from '@nextui-org/react'
import socialNetworks from '@/utils/json/social_networks.json'
import { ISala } from '@/types'
import { IconDots } from '@tabler/icons-react'

const findSocialNetwork = (id: number) => {
  return socialNetworks.find((item) => item.id === id)
}

interface IProps {
  room: ISala
}

const options = [
  {
    id: 'edit',
    label: 'Editar',
    path: 'editar',
  },
  // {
  //   id: 'details',
  //   label: 'Detalles',
  //   path: '',
  // },
]

export const CardRoom = (props: IProps) => {
  const { room } = props
  const platform = findSocialNetwork(room.platform)

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow-lg relative hover:shadow-xl transition-all duration-300 hover:cursor-pointer">
      <section className="absolute top-2 left-2">
        <Chip
          color={room?.isActived ? 'success' : 'danger'}
          size="sm"
          variant="dot"
          radius="sm"
        >
          {room?.isActived ? 'On' : 'Off'}
        </Chip>
      </section>
      <section className="absolute top-2 right-2">
        <Dropdown
          aria-label="Profile"
          radius="sm"
          showArrow
          classNames={{
            base: 'before:bg-default-200', // change arrow background
            content: 'p-0 border-small border-divider bg-background',
          }}
        >
          <DropdownTrigger>
            <Button
              isIconOnly
              size="sm"
              radius="sm"
              variant="light"
              className="text-gray-500"
            >
              <IconDots size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Custom item styles"
            variant="flat"
            className="p-2"
            itemClasses={{
              base: 'hover:bg-default-200 text-xs',
              title: 'text-xs font-medium',
            }}
          >
            {options.map((option) => (
              <DropdownItem
                key={option.id}
                as={Link}
                href={`/admin/eventos/salas/${room.id}/${option.path}`}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </section>
      <section className="flex flex-col gap-2 justify-center items-center">
        <Image
          src={platform?.logo}
          width={40}
          height={40}
          alt={platform?.name}
          className={`rounded-full object-cover w-14 min-w-14 h-14 min-h-14 ${
            !room?.isActived && 'filter grayscale'
          }`}
        />
        <div>
          <h3 className="text-lg font-semibold text-center">
            {platform?.name}
          </h3>
          <p className="text-sm text-center line-clamp-1">{room?.name}</p>
        </div>
        <div>
          <Link
            href={room.url || ''}
            target="_blank"
            showAnchorIcon
            size="sm"
          >
            Ver link
          </Link>
        </div>
      </section>
    </div>
  )
}
