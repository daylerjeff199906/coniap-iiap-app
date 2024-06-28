import Image from 'next/image'
export default function Loading() {
  return (
    <>
      <main className="h-screen flex justify-center items-center bg-gray-100">
        <section className="flex flex-col items-center">
          <Image
            src="/logo_coniap.gif"
            width={100}
            height={100}
            alt="Loading"
          />
        </section>
      </main>
    </>
  )
}
