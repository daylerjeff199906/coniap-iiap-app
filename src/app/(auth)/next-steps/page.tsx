'use client'
import Link from 'next/link'
import { NextSteps } from '@/modules/user'

export default function Page() {
  return (
    <>
      <main className="section-page bg-gray-100">
        <section className="flex flex-col section-page justify-center items-center gap-6 h-full bg-white rounded-lg border container w-full max-w-3xl">
          <div className="w-full">
            <h1 className="text-xl sm:text-2xl font-bold text-center">
              🎉 Completa el registro para finalizar la inscripción 🎊
            </h1>
          </div>
          <NextSteps />
          <section>
            <Link
              href="/"
              className="text-xs hover:underline"
            >
              Volver al inicio
            </Link>
          </section>
        </section>
      </main>
    </>
  )
}
