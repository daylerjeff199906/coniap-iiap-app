import { Button, Image } from '@nextui-org/react'

export const BannerHome = () => {
  return (
    <section
      id="banner-home"
      className="h-screen max-h-[calc(100vh-4rem)] flex items-center bg-slate-100"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
        <div className="w-full lg:max-w-2xl space-y-4">
          <h1 className="text-2xl lg:text-[2.8rem] font-bold animate-appearance-in leading-snug ">
            Bienvenidos al III Congreso Internacional de la{' '}
            <span className="text-green-700 ">Amazonía</span> Peruana
          </h1>
          <p className="text-sm lg:text-lg animate-appearance-in">
            Del 20 al 22 de octubre de 2021
          </p>
          <Button
            className="animate-appearance-in text-white bg-green-700"
            variant="solid"
            radius="full"
            size="lg"
          >
            Conoce más
          </Button>
        </div>
        <div className="flex gap-3">
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
              className="w-52 h-72 object-cover"
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
    </section>
  )
}
