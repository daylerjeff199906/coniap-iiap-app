'use client'
import { useState } from 'react'
import {
  createPerson,
  fetchPersonById,
  updatePerson,
  fetchPersonsInEvent,
  fetchPersonsNotInEvent,
  fetchPersons,
  fetchPersonsFilter,
  updateFieldUser,
  fetchUserByEmail,
} from '@/api'
import { IPerson, IRes, IPersonFilter } from '@/types'
import { toast } from 'react-toastify'
import { addContactToList } from '@/lib'

const message =
  'duplicate key value violates unique constraint "persons_email_key"'

export function usePersons() {
  const [loading, setLoading] = useState<boolean>(false)
  const [person, setPerson] = useState<IPerson | null>(null)
  const [persons, setPersons] = useState<{
    data: IPerson[]
    count: number
  } | null>(null)
  const [personInEvent, setPersonInEvent] = useState<IPerson[] | null>(null)
  const [asisstants, setAssistants] = useState<IPerson[] | null>(null)

  const addPerson = async (data: IPerson) => {
    setLoading(true)
    const res = await createPerson(data)
      .then((res) => res)
      .catch((err) => err)
    if (res) {
      if (data.typePerson !== 'participant') {
        addContactToList(
          {
            email: data.email,
            name: data.name,
            surname: data.surName,
          },
          3
        )
      } else {
        addContactToList(
          {
            email: data.email,
            name: data.name,
            surname: data.surName,
          },
          7
        )
      }

      toast.success('Persona creada correctamente')
      setLoading(false)
      return res
    } else {
      if (res.message === message) {
        toast.error('El correo ya esta registrado')
      } else {
        toast.error(`Error al crear persona: ${res.message}`)
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
      toast.error(`Error al actualizar persona: ${res.message}`)
      setLoading(false)
      return res
    } else {
      toast.success('Persona actualizada correctamente', {
        autoClose: false,
      })

      const userRes = await fetchUserByEmail(data.email)

      if (userRes?.id) {
        const rolesNow = userRes?.role

        if (
          data.typePerson !== 'participant' &&
          data?.typePerson === 'speaker'
        ) {
          if (!rolesNow?.includes('speaker')) {
            rolesNow?.push('speaker')
            await updateFieldUser(userRes?.id, 'role', rolesNow)
          }
        } else if (
          data.typePerson !== 'participant' &&
          data?.typePerson === 'speaker_mg'
        ) {
          if (!rolesNow?.includes('speaker_mg')) {
            rolesNow?.push('speaker_mg')
            await updateFieldUser(userRes?.id, 'role', rolesNow)
          }
        } else if (data.typePerson === 'participant') {
          await updateFieldUser(userRes?.id, 'role', [])
        }
      } else {
        if (data.typePerson !== 'participant') {
          toast.error('La persona no tiene usuario, le recomendamos crear uno')
        }
      }

      setLoading(false)
      return res
    }
  }

  const getPersons = async (
    query: string,
    typePerson = '',
    isNot?: string,
    status?: string,
    column?: string,
    isPagination?: boolean,
    params?: { page: number; limit: number }
  ) => {
    setLoading(true)
    const data = await fetchPersons(
      query,
      typePerson,
      isNot,
      status,
      column,
      isPagination,
      params
    )
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

  const getPersonsFilter = async (filter: IPersonFilter) => {
    setLoading(true)
    const data = await fetchPersonsFilter(filter)
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
    personInEvent,
    getListPersonsInEvent,
    asisstants,
    getAssistants,
    getPersonsFilter,
    setPersons,
  }
}
