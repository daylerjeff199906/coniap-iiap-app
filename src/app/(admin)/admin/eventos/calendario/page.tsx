import { fetchAllEvents } from '@/api'
export default async function Page() {
  const events = await fetchAllEvents('')
  return <></>
}
