'use client'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   getDocs,
// } from 'firebase/firestore'
import { IPerson, IUser } from '@/types'
import { IError } from './types'
import { toast } from 'sonner'

import { fetchUserByEmail } from '@/api'
import { getErrors } from './getErrors'

export const SignInWithGoogle = async (): Promise<IUser | null> => {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    //Se busca si existe la persona en la tabla person
    const userApi: IUser | null = (await fetchUserByEmail(
      user.email as string
    )) as IUser | null

    return userApi
  } catch (error) {
    const err = error as unknown as IError
    toast.error(getErrors(err))
    return null
  }
}
