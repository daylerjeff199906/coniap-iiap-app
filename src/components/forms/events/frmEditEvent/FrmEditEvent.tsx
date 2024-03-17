'use client'
import { IEvent } from '@/types'
import { Image } from '@nextui-org/react'
export const FrmEditEvent = (event: IEvent) => {
  return (
    <>
      <header className="w-full">
        <Image
          src={
            event?.banner ||
            'https://img.freepik.com/foto-gratis/empresario-corporativo-dando-presentacion-gran-audiencia_53876-101865.jpg?t=st=1710697716~exp=1710701316~hmac=dd6c12b08873fb1628ee817174cc33d849c90c12647ce58e71911d1ba4451eeb&w=1380'
          }
          alt="Banner"
          removeWrapper
          className="w-full h-80 object-cover rounded-lg"
        />
      </header>
      <section>
        
      </section>
    </>
  )
}
