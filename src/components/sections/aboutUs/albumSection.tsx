import { Image } from '@nextui-org/react'

export const AlbumSection = () => {
  return (
    <>
      <section className="py-10 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 items-center">
          <div className="w-full h-full">
            <iframe
              // width=""
              // height="315"
              className="w-full h-96 sm:h-full"
              src="https://www.youtube.com/embed/RPHdeC-QQOM?si=39FTowF9AL5RMSVS"
              title="YouTube video player"
              // frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              // referrerpolicy="strict-origin-when-cross-origin"
              // allowfullscreen
            ></iframe>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <Image
              src="https://andeangreattreks.com/wp-content/uploads/exotic-Peruvian-Amazon-1.jpg"
              alt="Peruvian Amazon"
              removeWrapper
              className="w-full h-full"
              radius="none"
            />
            <Image
              src="https://andeangreattreks.com/wp-content/uploads/Incredible-biodiversity-of-the-Peruvian-Amazon-1.jpg"
              alt="Incredible biodiversity of the Peruvian Amazon"
              removeWrapper
              className="w-full h-full"
              radius="none"
            />
            <Image
              src="https://andeangreattreks.com/wp-content/uploads/birdwatrching-in-peruvian-amazon-1.jpg"
              alt="Bird watching in Peruvian Amazon"
              removeWrapper
              className="w-full h-full"
              radius="none"
            />
            <Image
              src="https://andeangreattreks.com/wp-content/uploads/why-explore-the-peruvian-amazon-1.jpg"
              alt="Bird watching in Peruvian Amazon"
              removeWrapper
              className="w-full h-full"
              radius="none"
            />
          </div>
        </div>
      </section>
    </>
  )
}
