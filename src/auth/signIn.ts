'use client'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { fetchUserByEmail, fetchPersonByEmail, createUser } from '@/api'
import { IError } from './types'

import { IUser, IPerson } from '@/types'
import { toast } from 'sonner'
import { getErrors } from './getErrors'

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
    console.log(userCredential)
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
      console.log(userCredential.user.emailVerified)
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
