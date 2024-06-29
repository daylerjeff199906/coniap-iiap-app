'use client'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { IPerson, IUser } from '@/types'
import { IError } from './types'
import { toast } from 'sonner'

import { fetchPersonByEmail } from '@/api'
import { getErrors } from './getErrors'

export const SignInWithGoogle = async (): Promise<IUser | null> => {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const firestore = getFirestore()
    const usersRef = collection(firestore, 'users')
    const q = query(usersRef, where('email', '==', user.email))
    const querySnapshot = await getDocs(q)

    //Se busca si existe la persona en la tabla person
    const person: IPerson = (await fetchPersonByEmail(
      user.email as string
    )) as IPerson

    let userData: IUser | null = null
    if (querySnapshot.empty) {
      userData = {
        id: person.id as string,
        userName: person.name || '',
        email: user.email || '',
        photo: person.image || '',
        role: null,
        person: person,
      }
    } else {
      userData = {
        id: querySnapshot.docs[0].id,
        userName: user.displayName || '',
        email: user.email || '',
        photo: user.photoURL || '',
        role: querySnapshot.docs[0].data().role || '',
        person: person,
      }
    }
    return userData
  } catch (error) {
    const err = error as unknown as IError
    toast.error(getErrors(err))
    return null
  }
}
