import { Divider } from '@nextui-org/react'

export const AboutUsSection = () => {
  return (
    <section className=" bg-white">
      <div className="container section-home ">
        <div className="space-y-6">
          <div className="flex">
            <div className="mr-4">
              <Divider
                orientation="vertical"
                className=" bg-orange-500 h-full w-1 rounded-full"
              />
            </div>
            <div className="">
              <h4>CONIAP</h4>
              <h2 className="title-section-home">Acerca del congreso</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className='space-y-3 p-4 border rounded-xl text-center'>
              <h1 className="text-xl font-bold">Objetivos</h1>
              <p className='text-sm'>
                El Congreso Internacional sobre Amazonia peruana: investigación
                para el desarrollo, perspectivas y retos, que se realizará
                anualmente, se constituye en un espacio de diálogo abierto de
                investigadores nacionales y extranjeros de distintas
                disciplinas, gestores de desarrollo, sectores públicos peruanos
                y organismos no gubernamentales.
              </p>
            </div>
            <div>
              <h1 className="text-xl font-bold">Misión</h1>
              <p>
                Su propósito es propiciar la difusión y el intercambio de
                conocimientos y experiencias, favoreciendo la comunicación entre
                investigadores y decisores de política para definir lineamientos
                y buscar consensos en temas de cultura, desarrollo social y
                humano, uso sostenible y conservación de los ecosistemas y
                recursos, tecnologías alternativas y desarrollo económico,
                ordenamiento del territorio y gestión de riesgos.
              </p>
            </div>
            <div>
              <h1 className="text-xl font-bold">Visión</h1>
              <p>
                El congreso busca contribuir al desarrollo socioeconómico de la
                región amazónica peruana en el contexto de cambio climático y el
                marco de los Objetivos del Desarrollo Sostenible — ODS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
