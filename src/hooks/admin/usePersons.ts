import { useState } from 'react'
import { createPerson, fetchPersonById } from '@/api'
import { IPerson } from '@/types'
import { toast } from 'sonner'

const message =
  'duplicate key value violates unique constraint "persons_email_key"'

export function usePersons() {
  const [loading, setLoading] = useState<boolean>(false)
  const [person, setPerson] = useState<IPerson | null>(null)

  const addPerson = async (data: IPerson) => {
    setLoading(true)
    try {
      const res = await createPerson(data)
      if (res !== null) {
        if (res.message) {
          toast.error(
            res.message === message
              ? 'El correo ya existe'
              : 'Error al guardar la persona'
          )
        } else {
          toast.success('Datos registrados con éxito')
        }
      }
      return res
    } catch (error) {
      toast.error('Error al guardar la persona')
    } finally {
      setLoading(false)
    }
  }

  const getPerson = async (id: string) => {
    setLoading(true)
    const data = await fetchPersonById(id)
      .then((res) => res)
      .catch((err) => err)
    setPerson(data)
    setLoading(false)
  }

  return {
    loading,
    addPerson,
    getPerson,
    person,
  }
}
