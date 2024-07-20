/* eslint-disable react-hooks/exhaustive-deps */
'use client '
import { Avatar } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { FrmInscriptionSteps } from '@/modules/user'

function desencryptString(value: string) {
  if (typeof window !== 'undefined') {
    return atob(value)
  }
}

export const NextSteps = () => {
  const searchParams = useSearchParams()

  const emailEncrypt = searchParams.get('email')
  const email = desencryptString(emailEncrypt || '')

  const nameEncrypt = searchParams.get('name')
  const name = desencryptString(nameEncrypt || '')

  const photoEncrypt = searchParams.get('photo')
  const photo = desencryptString(photoEncrypt || '')

  return (
    <>
      <section className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <Avatar
          src={photo}
          size="lg"
        />
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </p>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            {email}
          </p>
        </div>
      </section>
      <section>
        <FrmInscriptionSteps
          email={email}
          photo={photo}
        />
      </section>
    </>
  )
}
