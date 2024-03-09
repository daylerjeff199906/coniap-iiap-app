import { Card } from '@nextui-org/react'

const topicsExample = [
  {
    title:
      'EL AGUA Y SUS RECURSOS EN LA AMAZONIA: HIDROBIOLOGIA, ACUICULTURA Y PESCA',
    description:
      'Explora la gestión de recursos hídricos, calidad del agua y su impacto en la vida acuática y las comunidades ribereñas en la región amazónica.',
    image: 'https://via.placeholder.com/150',
    color: 'bg-danger-500/75',
  },
  {
    title: 'ECOLOGiA Y USO SOSTENIBLE DE BOSQUES AMAZÓNICOS',
    description:
      'Estudia la biología de organismos acuáticos, el cultivo de especies nativas y la pesca sostenible para el desarrollo económico y alimentario en la Amazonia.',
    image: 'https://via.placeholder.com/150',
    color: 'bg-primary-500/75',
  },
  {
    title: 'BIODIVERSIDAD',
    description:
      'Analiza la variedad de especies de flora y fauna en la Amazonia, su importancia ecológica y los esfuerzos de conservación para proteger este rico patrimonio biológico.',
    image: 'https://via.placeholder.com/150',
    color: 'bg-success-500/75',
  },
  {
    title:
      'CONOCIMIENTOS TRADICIONALES, CONSERVACIÓN Y BUEN VIVIR EN LA AMAZONIA PERUANA',
    description:
      'Examina las prácticas ancestrales de las comunidades indígenas para la conservación de la biodiversidad y su relación con el bienestar social y cultural en la región.',
    image: 'https://via.placeholder.com/150',
    color: 'bg-warning-500/75',
  },
  {
    title: 'GESTIÓN TERRITORIAL PARA EL DESARROLLO DE LA AMAZONÍA PERUANA',
    description:
      'Considera las políticas y estrategias de planificación territorial que promueven un desarrollo sostenible, equitativo y respetuoso con el medio ambiente en la Amazonía peruana.',
    image: 'https://via.placeholder.com/150',
    color: 'bg-secondary-500/75',
  },
]

export const TopicsSection = () => {
  return (
    <section className=" bg-black/70">
      <div className="container section-home space-y-2">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
          Líneas temáticas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3  py-4">
          {topicsExample.map((topic, i) => (
            <CardTopics
              key={i}
              title={topic.title}
              description={topic.description}
              image={topic.image}
              color={topic.color}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const CardTopics = ({
  title,
  description,
  image,
  color,
}: {
  title: string
  description: string
  image: string
  color: string
}) => {
  return (
    <Card
      className={` ${color} text-white p-6 text-center flex flex-col justify-center items-center gap-2 animate-appearance-in `}
      radius="none"
    >
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm line-clamp-2">{description}</p>
    </Card>
  )
}
