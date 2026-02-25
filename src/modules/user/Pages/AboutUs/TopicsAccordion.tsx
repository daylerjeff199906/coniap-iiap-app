'use client'
import { ITopic } from '@/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import NextImage from 'next/image'

interface IProps {
  data: ITopic[]
}

export const TopicsAccordion = (props: IProps) => {
  const { data } = props

  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        {data.map((topic) => (
          <AccordionItem key={topic.id} value={topic.id.toString()}>
            <AccordionTrigger className="hover:no-underline px-4">
              <div className="flex items-center gap-4">
                <div
                  className="relative h-12 w-12 flex-shrink-0 flex items-center justify-center p-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: topic.color || '#0E793C' }}
                >
                  <NextImage
                    src={topic.image}
                    alt={topic.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-left">{topic.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-16 py-4 text-muted-foreground leading-relaxed">
              {topic.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
