'use client'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   getDocs,
// } from 'firebase/firestore'
import { fetchUserByEmail } from '@/api'
import { IError } from './types'

import { IUser } from '@/types'
// import { createCookie, createLocalStorage } from '@/lib'
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
    if (userCredential.user.emailVerified) {
      //Se busca si existe la persona en la tabla person
      const user: IUser | null = (await fetchUserByEmail(
        userCredential.user.email as string
      )) as IUser | null

      return user
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
