'use client'
import { IPerson, ISummary, IUser } from '@/types'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { InfoData, UserData } from './sections'
import { HeaderSection } from '@/modules/core'

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
    <main className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <HeaderSection
        title={`${data.name} ${data.surName}`}
        subtitle="Detalles completos del participante y su actividad en el sistema"
        showBackButton
        hrefBack="#" // The handleExit logic is better handled by simply having a back button or link
      />

      <div className="grid grid-cols-1 gap-6">
        <InfoData
          data={data}
          summaries={summaries}
        />
        <UserData
          user={user}
          person={data}
        />
      </div>
    </main>
  )
}
