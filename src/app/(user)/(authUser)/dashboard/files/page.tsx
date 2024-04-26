import { UploadFile } from '@/modules/user'

export default function Page() {
  return (
    <>
      <section>
        <h1 className="text-xl">Envía tus resúmenes</h1>
      </section>
      <section>
        <UploadFile />
      </section>
    </>
  )
}
