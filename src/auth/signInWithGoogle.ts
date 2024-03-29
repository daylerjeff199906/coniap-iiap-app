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

import { createCookie } from '@/lib'
import { toast } from 'sonner'
import { IUser } from '@/types'

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
