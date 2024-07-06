import Image from 'next/image'
export default function Loading() {
  return (
    <>
      <main className="h-screen flex justify-center items-center bg-gray-100">
        <section className="flex flex-col items-center">
          <Image
            src="/logo_coniap.gif"
            width={420}
            height={420}
            alt="Loading"
            unoptimized
          />
        </section>
      </main>
    </>
  )
}
