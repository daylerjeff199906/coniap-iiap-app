import { ScrollShadow } from '@nextui-org/react'

type PersonStats = {
  total: number
  actived: number
  inactived: number
}
interface IProps {
  data: {
    participantes: PersonStats
    'ponentes magistrales': PersonStats
    ponentes: PersonStats
  }
}

export const CardList = (props: IProps) => {
  const { data } = props
  return (
    <>
      <ScrollShadow
        orientation="horizontal"
        className="max-w-3xl lg:max-w-full w-full"
      >
        <section className="flex gap-2 w-full">
          {Object.keys(data).map((key) => (
            <div
              className="flex flex-col gap-2 border border-gray-200 p-4 rounded-lg w-full bg-white min-w-52"
              key={key}
            >
              <span className="capitalize text-sm text-gray-500">{key}</span>
              <div className="flex gap-3 items-end">
                <span className="text-4xl font-bold">
                  {data[key as keyof typeof data]?.total}
                </span>
                <div className="flex flex-col text-tiny sm:text-xs font-medium">
                  {key !== 'participantes' && (
                    <>
                      <p className="text-success-500">
                        Activos {` `}
                        <span>{data[key as keyof typeof data]?.actived}</span>
                      </p>
                      <p className="text-danger-500">
                        Inactivos {` `}
                        <span>{data[key as keyof typeof data]?.inactived}</span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      </ScrollShadow>
    </>
  )
}
