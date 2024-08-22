'use client'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { IPerson, IUser, IUserCreated } from '@/types'
import { IError } from './types'
import { toast } from 'react-toastify'

import {
  fetchUserByEmail,
  createUser,
  updateUser,
  fetchPersonByEmail,
} from '@/api'
import { getErrors } from './getErrors'

export const SignInWithGoogle = async (): Promise<IUser | null> => {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    if (!user) {
      return null
    } else {
      // Check if user exists in the database
      const userApi: IUser | null = (await fetchUserByEmail(
        user.email as string
      )) as IUser | null

      const personApi = (await fetchPersonByEmail(
        user.email as string
      )) as IPerson | null

      if (userApi === null) {
        const userData: IUserCreated = {
          email: user.email as string,
          photo: user.photoURL as string,
          userName: user.displayName as string,
          role: personApi?.id
            ? personApi?.typePerson !== 'participant'
              ? ['speaker']
              : null
            : null,
          person: personApi?.id ? Number(personApi?.id) : null,
        }

        const newUser = await createUser(userData as IUserCreated)

        if (!newUser) {
          toast.error('Error al crear el usuario')
          return null
        }

        const userApi: IUser | null = (await fetchUserByEmail(
          user.email as string
        )) as IUser | null

        return userApi
      } else {
        if (userApi?.person === null && personApi?.id) {
          const userApiUpdated = await updateUser({
            id: userApi.id,
            email: user.email as string,
            photo: user.photoURL as string,
            userName: user.displayName as string,
            role: personApi.typePerson !== 'participant' ? ['speaker'] : null,
            emailVerified: user.emailVerified,
            topics: userApi.topics,
            person: personApi.id ? Number(personApi.id) : null,
          })

          if (!userApiUpdated) {
            toast.error('Error al actualizar el usuario')
            return null
          }
          return userApiUpdated
        } else {
          return userApi
        }
      }
    }
  } catch (error) {
    const err = error as unknown as IError
    toast.error(getErrors(err))
    return null
  }
}
