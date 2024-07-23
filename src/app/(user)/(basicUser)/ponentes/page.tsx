import { createClient } from '@/utils/supabase/server'
import { IPerson } from '@/types'
import { ListMastersSpeakers, ListSpeakers } from '@/modules/user'
import Image from 'next/image'

export default async function Page() {
  const supabase = createClient()

  const { data: speakers, error } = await supabase
    .from('persons')
    .select()
    .eq('isActived', true)
    .not('typePerson', 'eq', 'participant')

  if (error) {
    return (
      <div className="container section-page flex flex-col gap-6 w-full justify-center items-center">
        <div className="">
          <Image
            src="/svg/error.svg"
            alt="404"
            width={400}
            height={400}
          />
          <div>
            <h1 className="text-xs text-gray-500 sm:text-base lg:text-xl">
              Error al cargar los datos
            </h1> 
          </div>
        </div>
      </div>
    )
  }

  const speakersData = speakers as IPerson[]

  const magisterSpeakers = speakersData.filter(
    (speaker) => speaker.typePerson === 'speaker_mg'
  ) as IPerson[]

  const speakersList = speakersData.filter(
    (speaker) => speaker.typePerson === 'speaker'
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
        {speakersList.length > 0 && (
          <>
            <header className="flex flex-col gap-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl">Ponentes</h1>
              <hr />
            </header>
            <ListSpeakers speakers={speakersList} />
          </>
        )}
      </main>
    </>
  )
}
