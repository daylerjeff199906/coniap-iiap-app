'use client'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'

import { IUser } from '@/types'
import { createCookie, createLocalStorage } from '@/lib'
import { toast } from 'sonner'

interface ILogin {
  email: string
  password: string
}

export const signInWithCredentials = async (
  props: ILogin
): Promise<IUser | null> => {
  const auth = getAuth()
  const firestore = getFirestore()
  const { email, password } = props

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    const usersRef = collection(firestore, 'users')
    const q = query(usersRef, where('email', '==', user.email))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      toast.error('No tiene acceso a la plataforma. Contacte al administrador.')
      return null
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
    console.error(error)
    return null
  }
}
