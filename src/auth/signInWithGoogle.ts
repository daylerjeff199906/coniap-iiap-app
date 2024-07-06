'use client'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { IUser, IUserCreated } from '@/types'
import { IError } from './types'
import { toast } from 'sonner'

import { fetchUserByEmail, createUser } from '@/api'
import { getErrors } from './getErrors'

export const SignInWithGoogle = async (): Promise<IUser | null> => {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    //Se busca si existe la persona en la tabla person
    if (!user) {
      toast.error('Error al iniciar sesión')
      return null
    } else {
      const userApi: IUser | null = (await fetchUserByEmail(
        user.email as string
      )) as IUser | null

      if (userApi === null) {
        const userData = {
          email: user.email as string,
          photo: user.photoURL as string,
          userName: user.displayName as string,
          role: null,
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
      }
      return userApi
    }
  } catch (error) {
    const err = error as unknown as IError
    toast.error(getErrors(err))
    return null
  }
}
