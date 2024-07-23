import { createClient } from '@/utils/supabase/server'
import { IPerson } from '@/types'
import { ListMastersSpeakers } from '@/modules/user'

export default async function Page() {
  const supabase = createClient()

  const { data: speakers, error } = await supabase
    .from('persons')
    .select()
    .eq('isActived', true)
    .not('typePerson', 'eq', 'participant')

  if (error) {
    return <div>Error loading speakers</div>
  }

  const speakersData = speakers as IPerson[]

  const magisterSpeakers = speakersData.filter(
    (speaker) => speaker.typePerson === 'speaker_mg'
  ) as IPerson[]

  return (
    <>
      <main className="container section-page flex flex-col gap-6">
        <header className="flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl">
            Ponentes Magistrales
          </h1>
          <hr />
        </header>
        <section className="">
          <ListMastersSpeakers speakers={magisterSpeakers} />
        </section>
      </main>
    </>
  )
}
