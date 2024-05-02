'use client'
import { Button } from '@nextui-org/react'
import { useAuth } from '../..'
import Link from 'next/link'

export const ListSummaries = () => {
  const { myPerson } = useAuth()

  if (myPerson?.name === '' || myPerson?.surName === '')
    return (
      <>
        <section>
          <div className="p-6 bg-gray-100 rounded-lg flex flex-col justify-center gap-4">
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-xl">Completa tus datos</h1>
              <p>Debes completar tus datos para poder enviar un resumen</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Button
                as={Link}
                href="/dashboard/profile"
                color="primary"
                variant="solid"
              >
                Completar datos
              </Button>
            </div>
          </div>
        </section>
      </>
    )

  return <></>
}
