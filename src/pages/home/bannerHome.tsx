import Image from 'next/image'

export const BannerHome = () => {
  return (
    <section
      id="banner-home"
      className="h-screen max-h-[calc(100vh-4rem)] flex items-center bg-slate-100"
    >
      <div className="container flex">
        <div className="w-full lg:max-w-3xl">
          <h2 className="text-2xl lg:text-5xl font-bold animate-appearance-in">
            Bienvenidos al III Congreso Internacional de la{' '}
            <span className="text-green-700">Amazonía</span> Peruana
          </h2>
        </div>
        <div>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/coniap-iiap%2FiiapFoto.webp?alt=media&token=ebd2a474-f961-48e6-9b4d-06c530dda0c2"
            alt="Banner Home"
            width={300}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
