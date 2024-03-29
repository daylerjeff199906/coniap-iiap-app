import { useState } from 'react'
import { db } from '@/firebase/firebase'
import {
  collection,
  getDocs,
  DocumentData,
  doc,
  DocumentReference,
  getDoc,
  query,
  where,
  orderBy,
  addDoc,
} from 'firebase/firestore'
import { IProgram } from '@/types'
import { toast } from 'sonner'

// const convertDataToISlidersById = (data: DocumentData) => {
//   const { image, name, tag, isActive, createdAt, updatedAt } = data
//   const id = data?.id

//   // acortar la fecha de modificacion

//   return {
//     id: id,
//     image,
//     name,
//     tag,
//     isActive,
//     createdAt,
//     updatedAt,
//   }
// }

function convertTimestampToDate(timestamp: any) {
  const date = new Date(timestamp * 1000) // Multiplicamos por 1000 para convertir segundos a milisegundos
  return date.toLocaleDateString() // Utilizamos toLocaleDateString para obtener la fecha en formato local
}

export function usePrograms() {
  const [loading, setLoading] = useState<boolean>(false)
  const [programs, setPrograms] = useState<IProgram[] | null>(null)
  const [program, setProgram] = useState<IProgram | null>(null)

  //   const [slider, setSlider] = useState<ISliders | null>(null)

  const getPrograms = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'programs'), orderBy('date', 'asc'))
      )
      const program = querySnapshot.docs.map((doc) => ({
        id: doc.id.toString(),
        ...doc.data(),
      }))
      //   setSliders(convertDataToISliders(sliders))
      setPrograms(program as IProgram[])
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const createProgram = async (data: IProgram) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const docRef = await addDoc(collection(db, 'programs'), data)
      // console.log('Document written with ID: ', docRef.id)
      toast.success(`Programa creado con exito, ID: ${docRef.id}`)

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getProgramById = async (id: string) => {
    setLoading(true)
    try {
      const categoryRef: DocumentReference<DocumentData> = doc(
        db,
        'programs',
        id
      )
      const docSnap = await getDoc(categoryRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setProgram(data as IProgram)
      } else {
        console.log('No such document!')
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    loading,
    getPrograms,
    programs,
    createProgram,
    getProgramById,
    program,
  }
}
