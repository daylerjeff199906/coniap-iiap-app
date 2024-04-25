import { createClient } from '@/utils/supabase/server'
import { ListSpeakers } from '@/components'
import { IPerson } from '@/types'

export default async function Page() {
  const supabase = createClient()

  const { data: speakers } = await supabase
    .from('persons')
    .select()
    .eq('isActived', true)
    .not('typePerson', 'eq', 'participant')

  const speakersData: IPerson[] | undefined = speakers?.map(
    (speaker: IPerson) => ({
      ...speaker,
      date: new Date(speaker?.created_at),
    })
  )

  return (
    <>
      <main className="container">
        <section className="section-page space-y-8">
          <ListSpeakers speakers={speakersData} />
        </section>
      </main>
    </>
  )
}
