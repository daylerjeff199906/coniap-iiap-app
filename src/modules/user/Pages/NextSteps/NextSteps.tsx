'use client'
import { Avatar } from '@nextui-org/react'
import { FrmInscriptionSteps } from '@/modules/user'
import { useFilterFromUrl } from '@/modules/core'

function desencryptString(value: string) {
  if (typeof window !== 'undefined') {
    return atob(value)
  }
}

export const NextSteps = () => {
  const { getParams } = useFilterFromUrl()

  const emailEncrypt = getParams('email', '')
  const email = desencryptString(emailEncrypt || '')

  const nameEncrypt = getParams('name', '')
  const name = desencryptString(nameEncrypt || '')

  const photoEncrypt = getParams('photo', '')
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
