'use client'

import { FrmInscriptions } from '@/components'
import { Button } from '@nextui-org/react'

export default function Page() {
  return (
    <>
      <main className="container w-full">
        <section className="section py-6 w-full flex flex-col items-center">
          <FrmInscriptions />
          <p className="text-5xl font-semibold text-green-400">adsasda</p>
          <Button radius="full">azsdasdasd</Button>
          <button className="bg-red-600 p-2 text-white">Click me</button>
        </section>
      </main>
    </>
  )
}
