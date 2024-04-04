import { useState } from 'react'
import { createPerson, fetchPersonById, updatePerson, fetchPerson } from '@/api'
import { IPerson } from '@/types'
import { toast } from 'sonner'

const message =
  'duplicate key value violates unique constraint "persons_email_key"'

export function usePersons() {
  const [loading, setLoading] = useState<boolean>(false)
  const [person, setPerson] = useState<IPerson | null>(null)
  const [persons, setPersons] = useState<IPerson[] | null>(null)

  const addPerson = async (data: IPerson) => {
    setLoading(true)
    const res = await createPerson(data)
      .then((res) => res)
      .catch((err) => err)
    if (res[0]) {
      toast.success('Persona creada correctamente')
      setLoading(false)
      return res[0]
    } else {
      if (res.message === message) {
        toast.error('El correo ya esta registrado')
      } else {
        toast.error('Error al crear persona', {
          description: res.message,
        })
      }
      setLoading(false)
      return null
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

  const updatePersonData = async (id: string, data: IPerson) => {
    setLoading(true)
    const res = await updatePerson(id, data)
      .then((res) => res)
      .catch((err) => err)
    if (res) {
      toast.success('Persona actualizada correctamente')
      setLoading(false)
      return res[0]
    } else {
      toast.error('Error al actualizar persona')
      setLoading(false)
      return null
    }
  }

  const getPersons = async (query: string) => {
    setLoading(true)
    const data = await fetchPerson(query)
      .then((res) => res)
      .catch((err) => err)
    setPersons(data)
    setLoading(false)
  }

  return {
    loading,
    addPerson,
    getPerson,
    person,
    updatePersonData,
    getPersons,
    persons,
  }
}
