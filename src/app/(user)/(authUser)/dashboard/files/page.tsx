import { ListSummaries } from '@/modules/user'

export default function Page() {
  return (
    <>
      <main className='flex flex-col gap-4'>
        <section>
          <h1 className="sm:text-xl font-semibold">Historial de resúmenes</h1>
        </section>
        <section>
          <ListSummaries />
        </section>
      </main>
    </>
  )
}
