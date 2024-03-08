import { Button, Image } from '@nextui-org/react'
import { IconCalendarEvent } from '@tabler/icons-react'
import bgImage from '@/assets/images/bgBanner.webp'

export const BannerHome = () => {
  return (
    <section
      id="banner-home"
      className="h-screen flex items-center relative bg-gradient-to-r from-black/80 to-transparent"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
        <div className="w-full lg:max-w-2xl space-y-6">
          <h1 className="text-3xl lg:text-[2.8rem] font-bold animate-appearance-in leading-tight text-white">
            Bienvenidos al III Congreso Internacional de la{' '}
            <span className="text-green-500 ">Amazonía</span> Peruana
          </h1>
          {/* <p className="text-sm lg:text-lg animate-appearance-in text-white">
            Del 15 al 18 de noviembre de 2022, ven y participa de este gran
            evento.
          </p> */}
          <div className="flex items-center gap-2">
            <IconCalendarEvent
              size={56}
              stroke={1.5}
              color="#fff"
            />
            <h3 className="text-white sm:text-lg max-w-48">
              Del 15 al 18 de noviembre de 2022
            </h3>
          </div>
          <div className="w-full flex items-center gap-3">
            <Button
              className="animate-appearance-in text-white bg-green-700"
              variant="solid"
              radius="full"
              size="lg"
            >
              Conoce más
            </Button>
            <Button
              // variant=""
              radius="full"
              size="lg"
            >
              Inscríbete
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex gap-3">
          <div className="space-y-3">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2Fiiap-expo.webp?alt=media&token=df476d80-88cd-40d0-ab86-2fd2a83ca39d"
              alt="Banner Home"
              className="w-52 h-60 object-cover "
              radius="sm"
              removeWrapper
            />
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2FiiapTejido.webp?alt=media&token=6e673280-2daa-4b3f-96b7-945ab95b5ede"
              alt="Tejido-iiap"
              radius="sm"
              className="w-52 h-60 object-cover"
            />
          </div>
          <div className="space-y-3 pt-14">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2Fiiap-colecta.webp?alt=media&token=f92e36ba-65ef-4935-b3e1-85d522047ec3"
              alt="expoIIAP"
              radius="sm"
              className="w-64 h-72 object-cover"
            />
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2FiiapFoto.webp?alt=media&token=ebd2a474-f961-48e6-9b4d-06c530dda0c2"
              alt="Banner Home"
              radius="sm"
              className="h-56 object-cover"
            />
          </div>
        </div>
      </div>
      <Image
        src={bgImage.src}
        alt="Banner Home"
        className="fixed w-full h-full max-h-screen object-cover  top-0 -z-50"
        removeWrapper
        radius="none"
      />
    </section>
  )
}
