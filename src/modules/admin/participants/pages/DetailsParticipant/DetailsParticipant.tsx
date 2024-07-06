'use client'
import { IPerson, ISummary } from '@/types'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { InfoData, UserData } from './sections'

interface IProps {
  data: IPerson
  summaries?: ISummary[] | null
}

export const DetailsParticipant = (props: IProps) => {
  const { data, summaries } = props
  const router = useRouter()

  const handleExit = () => {
    router.back()
  }

  return (
    <main className="flex flex-col gap-4 w-full p-6 border rounded-xl">
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
      <UserData data={data} />
    </main>
  )
}
