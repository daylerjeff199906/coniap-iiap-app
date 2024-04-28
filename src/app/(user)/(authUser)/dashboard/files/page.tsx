import { FrmUploadSummary } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <section>
        <h1 className="text-xl">Envía tus resúmenes</h1>
      </section>
      <section>
        <FrmUploadSummary />
      </section>
    </>
  )
}
