import {
  AlbumSection,
  InfoAboutUs,
  OrganizationSection,
  TopicsSection,
} from '@/modules/user'
import { fetchInformationById } from '@/api'
import { IGeneralData } from '@/types'

export default async function Page() {
  const res = await fetchInformationById(1)

  if (!res) {
    return (
      <>
        <div>
          <h1>Error al traer los datos</h1>
        </div>
      </>
    )
  }

  const data = res as IGeneralData

  return (
    <>
      <article className="container py-6">
        <InfoAboutUs description={data.description} />
        <TopicsSection />
        <AlbumSection />
        <OrganizationSection
          comiteCientifico={data.c_cientifico}
          comiteInformatica={data.c_informatica}
          comiteOrganizador={data.c_organizador}
        />
      </article>
    </>
  )
}
