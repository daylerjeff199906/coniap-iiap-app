import infoData from '@/utils/json/infoConiap.json'
import Link from 'next/link'

function convertDate(date: string) {
  return new Date(date)
}

export const HeaderNav = () => {
  const dateConference = infoData.data.dates['date-conference'].start
  const summary = infoData.data.dates['date-conference'].end

  const textDateInsctiption = `Inscripciones hasta el ${convertDate(
    dateConference
  ).toLocaleDateString()}`
  const textDateSpeaker = `Envío de resumen hasta el: ${convertDate(
    summary
  ).toLocaleDateString()}`
  return (
    <nav className="bg-warning-500  py-1 animate-pulse">
      <main className="container">
        <Link
          className="line-clamp-1 text-tiny sm:text-sm font-semibold text-center"
          href="/inscripciones"
        >
          {textDateInsctiption} | {textDateSpeaker}
        </Link>
      </main>
    </nav>
  )
}
