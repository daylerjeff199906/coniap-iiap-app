import { FrmUserEditor } from '@/modules/admin'

export default function Page() {
  return (
    <main className="w-full flex flex-col gap-2 items-center">
      <section className="w-full max-w-2xl rounded-lg border p-4">
        <FrmUserEditor />
      </section>
    </main>
  )
}
