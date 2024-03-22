interface IProps {
  params: {
    slug: string
    type: string
  }
}

export default function Page(props: IProps) {
  const { slug, type } = props.params
  return (
    <>
      <h1>
       Programa {slug} - {type}
      </h1>
    </>
  )
}
