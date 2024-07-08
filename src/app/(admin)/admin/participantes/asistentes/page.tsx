import { ListParticipants } from '@/modules/admin'

export default async function Page() {
  return (
    <main className="flex flex-col gap-4">
      <ListParticipants />
    </main>
  )
}
