import { fetchTopics } from '@/api'
import { ITopic } from '@/types'
import { TopicsAccordion } from './TopicsAccordion'

export const TopicsSection = async () => {
  let topics: ITopic[] = [] as ITopic[]

  try {
    const res = await fetchTopics('', {
      isActived: 'true',
    })
    if (res) {
      const data = res as ITopic[]
      topics = data
    }
  } catch (error) {
    console.error(error)
  }

  return (
    <main className="flex flex-col gap-5 py-6 sm:py-8 lg:py-16">
      <header>
        <div className="flex items-center gap-3 pb-3">
          <div className="dot-custom" />
          <p className="text-xs font-semibold  uppercase">#CONIAP- 2024</p>
        </div>
        <div className="w-full max-w-4xl">
          <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight ">
            Líneas <b>temáticas</b>
          </h2>
        </div>
      </header>
      <section>
        {topics?.length > 0 && <TopicsAccordion data={topics} />}
      </section>
    </main>
  )
}
