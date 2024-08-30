'use client'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { fetchUserByEmail, fetchPersonByEmail, createUser } from '@/api'
import { IError } from './types'

import { IUser, IPerson } from '@/types'
import { toast } from 'react-toastify'
import { getErrors } from './getErrors'
import { addContactToList } from '@/lib'

interface ILogin {
  email: string
  password: string
}

export const signInWithCredentials = async (
  props: ILogin
): Promise<IUser | null> => {
  const auth = getAuth()
  const { email, password } = props

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    if (userCredential.user.emailVerified) {
      //Se busca si existe la persona en la tabla person
      const user: IUser | null = (await fetchUserByEmail(
        userCredential.user.email as string
      )) as IUser | null

      const person: IPerson | null = (await fetchPersonByEmail(
        userCredential.user.email as string
      )) as IPerson | null

      if (person !== null && user === null) {
        const newUser = {
          userName: person.name,
          email: userCredential.user.email as string,
          photo: '',
          role: person.typePerson !== 'participant' ? ['speaker'] : null,
          person: Number(person?.id),
          emailVerified: userCredential.user.emailVerified,
        }

        const newUserRes = await createUser(newUser)
        if (newUserRes && person) {
          const typePerson = person?.typePerson === 'participant' ? 7 : 3

          await addContactToList(
            {
              email: userCredential.user.email as string,
              name: person?.name as string,
              surname: person?.surName as string,
            },
            typePerson
          )
          return {
            ...newUser,
            person: person,
          }
        } else {
          return null
        }
      } else if (user !== null) {
        return {
          ...user,
          person,
        }
      } else {
        return null
      }
    } else {
      toast.error('Revise su correo electrónico para verificar su cuenta', {
        position: 'top-right',
      })
      return null
    }
  } catch (error) {
    const err = error as unknown as IError
    toast.error(getErrors(err), { position: 'top-right' })
    return null
  }
}
