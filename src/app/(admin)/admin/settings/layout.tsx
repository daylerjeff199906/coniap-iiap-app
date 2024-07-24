import { AsideSetings } from '@/modules/admin'

interface IProps {
  children: React.ReactNode
}

export default function Layout(props: IProps) {
  const { children } = props

  return (
    <main className="w-full flex flex-col gap-3 lg:flex-row">
      <AsideSetings />
      <article className="w-full lg:max-w-[calc(100%-160px)]">{children}</article>
    </main>
  )
}
