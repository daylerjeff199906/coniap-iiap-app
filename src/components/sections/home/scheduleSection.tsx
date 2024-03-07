import { Button } from '@nextui-org/react'

// create array data for timeline
const data = [
  {
    title: 'Title 1',
    description: 'Description 1',
    date: 'Date 1',
  },
  {
    title: 'Title 2',
    description: 'Description 2',
    date: 'Date 2',
  },
  {
    title: 'Title 3',
    description: 'Description 3',
    date: 'Date 3',
  },
]

export const ScheduleSection = () => {
  return (
    <section className=" bg-white">
      <div className="container section-home grid grid-cols-1 lg:grid-cols-4">
        {/* <h2>Schedule</h2>
        <p>We are open Monday to Friday from 9am to 5pm.</p> */}
        <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 col-span-1">
          <h2 className="title-section-home">Agenda</h2>
          <div>
            {data.map((item, index) => (
              <CardTimeline
                key={index}
                title={item.title}
                description={item.description}
                date={item.date}
              />
            ))}
          </div>
          <Button
            color="success"
            variant="flat"
            radius="full"
            fullWidth
          >
            Ver agenda{' '}
          </Button>
        </div>
        <div></div>
      </div>
    </section>
  )
}

const CardTimeline = ({
  title,
  description,
  date,
}: {
  title: string
  description: string
  date: string
}) => {
  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 col-span-1">
      <h2 className="title-section-home">{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  )
}
