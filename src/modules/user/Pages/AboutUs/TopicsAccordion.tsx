'use client'
import { ITopic } from '@/types'
import { Accordion, AccordionItem, Image } from '@nextui-org/react'
interface IProps {
  data: ITopic[]
}
export const TopicsAccordion = (props: IProps) => {
  const { data } = props

  return (
    <main>
      <Accordion
        itemClasses={{
          content: 'p-6',
          title: 'text-white',
        }}
      >
        {data.map((topic) => (
          <AccordionItem
            key={topic.id}
            title={topic.name}
            startContent={
              <Image
                src={topic.image}
                alt={topic.name}
                width={50}
                height={50}
              />
            }
            classNames={{
              trigger: `px-6`,
            }}
            style={{
              backgroundColor: `${topic.color || '#0E793C'}`,
            }}
          >
            {topic.description}
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  )
}
