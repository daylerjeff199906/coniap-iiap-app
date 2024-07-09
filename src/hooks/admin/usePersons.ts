'use client'
import { useState } from 'react'
import {
  createPerson,
  fetchPersonById,
  updatePerson,
  fetchPersonsInEvent,
  fetchPersonsNotInEvent,
  fetchPersons,
} from '@/api'
import { IPerson, IRes } from '@/types'
import { toast } from 'sonner'

const message =
  'duplicate key value violates unique constraint "persons_email_key"'

export function usePersons() {
  const [loading, setLoading] = useState<boolean>(false)
  const [person, setPerson] = useState<IPerson | null>(null)
  const [persons, setPersons] = useState<IPerson[] | null>(null)
  const [personInEvent, setPersonInEvent] = useState<IPerson[] | null>(null)
  const [asisstants, setAssistants] = useState<IPerson[] | null>(null)

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
    const res: IRes = (await updatePerson(id, data)) as IRes

    if (res.message) {
      toast.error('Error al actualizar persona', { description: res.message })
      setLoading(false)
      return res
    } else {
      toast.success('Persona actualizada correctamente')
      setLoading(false)
      return res
    }
  }

  const getPersons = async (
    query: string,
    typePerson = '',
    isNot?: string,
    status?: string
  ) => {
    setLoading(true)
    const data = await fetchPersons(query, typePerson, isNot, status)
      .then((res) => res)
      .catch((err) => err)
    setPersons(data)
    setLoading(false)
  }

  const getListPersonsInEvent = async () => {
    setLoading(true)
    const data = await fetchPersonsInEvent()
      .then((res) => res)
      .catch((err) => err)
    setPersonInEvent(data)
    setLoading(false)
  }

  const getAssistants = async (query: string) => {
    setLoading(true)
    const data = await fetchPersonsNotInEvent(query)
      .then((res) => res)
      .catch((err) => err)
    setAssistants(data)
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
    personInEvent,
    getListPersonsInEvent,
    asisstants,
    getAssistants,
  }
}
