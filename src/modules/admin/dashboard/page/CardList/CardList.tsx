interface IProps {
  data: {
    ponentes: number
    participantes: number
    'ponentes magistrales': number
  }
}

export const CardList = (props: IProps) => {
  const { data } = props
  return (
    <>
      <section className="flex gap-2 w-full max-w-2xl">
        {Object.keys(data).map((key) => (
          <div
            className="flex flex-col gap-2 border border-gray-200 p-4 rounded-lg w-full"
            key={key}
          >
            <span className="capitalize text-sm text-gray-500">{key}</span>
            <span className="text-4xl font-bold">
              {data[key as keyof typeof data]}
            </span>
          </div>
        ))}
      </section>
    </>
  )
}
