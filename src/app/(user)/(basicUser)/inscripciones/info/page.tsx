'use client'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks'
import { AlertCustom } from '@/modules/core'

const steps = [
  {
    title: 'Verifica tu correo',
    content:
      'Si aún no verificas tu correo, revisa tu bandeja de entrada. Si ingresaste con cuenta de Google, no es necesario verificar tu correo.',
    link: null,
  },
  {
    title: 'Ya estás registrado como asistente',
    content: 'Si deseas enviar un resumen, contactanos al correo',
    link: null,
  },
]

export default function Page() {
  return (
    <>
      <main className="section-page bg-gray-100">
        <Fireworks
          autorun={{
            speed: 3,
            duration: 3000,
          }}
        />
        <section className="flex flex-col section-page justify-center items-center gap-6 h-full bg-white rounded-lg border container w-full max-w-3xl px-2 sm:px-6 lg:px-8">
          <div className="w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-center">
              🎉 Muchas gracias por inscribirte en el congreso 🎊
            </h1>
          </div>
          <section className="">
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className="mb-10 ms-4"
                >
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {step.content}
                  </p>
                  {step.link && (
                    <Button
                      href={step?.link}
                      as={Link}
                      variant="bordered"
                      radius="full"
                      color="primary"
                    >
                      Iniciar sesión
                    </Button>
                  )}
                </li>
              ))}
            </ol>
          </section>
          <section>
            <AlertCustom
              type="info"
              showIcon
              title="Si te inscribiste como asistente, y luego deseas enviar un resumen contactanos al correo"
              message={
                <Link
                  href="mailto:ggagliardi@iiap.gob.pe"
                  className="text-primary hover:underline"
                >
                  ggagliardi@iiap.gob.pe
                </Link>
              }
            />
          </section>
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
