import { Image } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'

export const HeaderSection = () => {
  const { watch } = useFormContext()
  return (
    <>
      <div className="w-full relative">
        <Image
          src={
            watch('banner') ||
            'https://img.freepik.com/foto-gratis/empresario-corporativo-dando-presentacion-gran-audiencia_53876-101865.jpg?t=st=1710697716~exp=1710701316~hmac=dd6c12b08873fb1628ee817174cc33d849c90c12647ce58e71911d1ba4451eeb&w=1380'
          }
          alt="Banner"
          radius="none"
          removeWrapper
          className="w-full h-72 object-cover"
        />
        <div className="absolute top-0 bottom-0 z-10 flex flex-col justify-center p-4 sm:p-8 lg:p-14 bg-black/45">
          <h1 className="text-4xl font-bold text-white">{watch('name')}</h1>
          <div className="flex gap-2">
            <p className="text-sm text-gray-300">
              {watch('date')} - {watch('timeStart')} -{watch('timeEnd')}
            </p>
          </div>
          <p className="text-white">
            {watch('shortDescription') || 'No tiene descripción corta'}
          </p>
        </div>
      </div>
    </>
  )
}
