'use client'
import { useState } from 'react'
import {
  createPerson,
  fetchPersonById,
  updatePerson,
  fetchPersons,
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
        const rolesNow = userRes.role || []

        if (data.typePerson !== 'participant') {
          const roleToAdd =
            data.typePerson === 'speaker'
              ? 'speaker'
              : data.typePerson === 'speaker_mg'
              ? 'speaker_mg'
              : null

          if (roleToAdd && !rolesNow.includes(roleToAdd)) {
            rolesNow.push(roleToAdd)
            await updateFieldUser(userRes.id, 'role', rolesNow)
          }
        } else {
          await updateFieldUser(userRes.id, 'role', ['user'])
        }
      } else if (data.typePerson !== 'participant') {
        toast.error('La persona no tiene usuario, le recomendamos crear uno')
      }

      setLoading(false)
      return res
    }
  }

  // get all persons
  const getPersons = async (filters: IPersonFilter) => {
    setLoading(true)
    const data = await fetchPersons(filters)
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
    setPersons,
  }
}
