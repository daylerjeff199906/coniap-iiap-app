'use client'
import Link from 'next/link'
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks'
import { NextSteps } from '@/modules/user'

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
        <section className="flex flex-col section-page justify-center items-center gap-6 h-full bg-white rounded-lg border container w-full max-w-3xl">
          <div className="w-full">
            <h1 className="text-xl sm:text-2xl font-bold text-center">
              🎉 Completa el registro para finalizar la inscripción 🎊
            </h1>
          </div>
          <NextSteps />

          {/* <section>
            <div className="flex items-start gap-3 p-4 rounded-md bg-primary-50 dark:bg-primary-500 text-primary-700 dark:text-primary-100 text-sm border-l-8 border-primary-500">
              <div>
                <IconInfoCircle size={24} />
              </div>
              <div>
                <p>
                  Si te inscribiste como asistente, y luego deseas enviar un
                  resumen contactanos al correo{' '}
                  <a
                    href="mailto:ggagliardi@iiap.gob.pe"
                    className="text-primary hover:underline"
                  >
                    ggagliardi@iiap.gob.pe
                  </a>{' '}
                  para habilitar tu cuenta.
                </p>
              </div>
            </div>
          </section> */}
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
