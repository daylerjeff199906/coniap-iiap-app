import { Image } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'

export const MultimediasSection = () => {
  const { watch } = useFormContext()

  const urlImage = watch('image')
  return (
    <>
      <section className="w-full">
        <div className="flex items-center justify-center w-full">
          <Image
            src={urlImage || 'https://via.placeholder.com/150'}
            alt="Speaker image"
            className="w-40 h-40 rounded-full object-cover"
            removeWrapper
          />
        </div>
      </section>
    </>
  )
}
