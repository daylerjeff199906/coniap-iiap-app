export const DataNotFound = () => {
  return (
    <section className="h-screen max-h-[30rem] flex flex-col items-center justify-center">
      <iframe
        className="h-56 sm:h-72"
        src="https://lottie.host/embed/2e29d191-76b6-4189-b3da-bb03db3a8701/plbMgAHReS.json"
      ></iframe>
      <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold animate-pulse">
        En construcción
      </h1>
      <p className="text-sm font-bold text-gray-400">
        Estamos trabajando en eso...
      </p>
    </section>
  )
}
