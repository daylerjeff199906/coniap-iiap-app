import { useState } from 'react'
import { createPerson } from '@/api'
import { IPerson } from '@/types'
import { toast } from 'sonner'

const message =
  'duplicate key value violates unique constraint "persons_email_key"'

export function usePersons() {
  const [loading, setLoading] = useState<boolean>(false)

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

  return {
    loading,
    addPerson,
  }
}
