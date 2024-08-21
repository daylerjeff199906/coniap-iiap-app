'use client'
import { IPerson, ISummary, IUser } from '@/types'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { InfoData, UserData } from './sections'

// import

interface IProps {
  data: IPerson
  summaries?: ISummary[] | null
  user?: IUser | null
}

export const DetailsParticipant = (props: IProps) => {
  const { data, summaries, user } = props
  const router = useRouter()

  const handleExit = () => {
    router.back()
  }

  return (
    <main className="flex flex-col gap-4 w-full p-6 border rounded-xl bg-white">
      <section>
        <Button
          onPress={handleExit}
          size="sm"
          variant="light"
          radius="sm"
          startContent={
            <IconArrowNarrowLeft
              size={20}
              stroke={1.5}
              className="text-gray-500"
            />
          }
        >
          Atras
        </Button>
      </section>
      <InfoData
        data={data}
        summaries={summaries}
      />
      <UserData
        user={user}
        person={data}
      />
    </main>
  )
}
