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

import { fetchPersonByEmail, createPerson } from '@/api'
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

    if (querySnapshot.empty) {
      const person = await fetchPersonByEmail(user.email as string)
      if (person) {
        const userData: IUser = {
          id: person.id as string,
          email: user.email || '',
          userName: person.name || '',
          photo: person.image || '',
          role: person.typePerson || '',
        }
        return userData
      } else {
        const newPerson: IPerson = {
          email: user.email || '',
          name: user.displayName || '',
          surName: '',
          image: user.photoURL || '',
          typePerson: 'speaker',
          institution: '',
          job: '',
          created_at: new Date().toISOString(),
          isActived: true,
          location: '',
          phone: '',
          presentation: '',
        }
        await createPerson(newPerson)
        const userData: IUser = {
          id: user.uid,
          email: user.email || '',
          userName: user.displayName || '',
          photo: user.photoURL || '',
          role: 'speaker',
        }
        return userData
      }
    } else {
      let userData: IUser | null = null
      for (const doc of querySnapshot.docs) {
        const data = doc.data()
        userData = {
          id: doc.id,
          email: user.email || '',
          userName: user.displayName || '',
          photo: user.photoURL || '',
          role: data.role || '',
        }
        break // Solo necesitamos el primer documento
      }
      new Promise((resolve) => setTimeout(resolve, 1000))
      return userData
    }
  } catch (error) {
    const err = error as unknown as IError
    toast.error(getErrors(err))
    return null
  }
}
