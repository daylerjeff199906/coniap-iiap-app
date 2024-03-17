interface IProps {
  params: {
    id: string
  }
}

export default function Page(props: IProps) {
  const { id } = props.params
  return (
    <div>
      <h1>Page</h1>
    </div>
  )
}
