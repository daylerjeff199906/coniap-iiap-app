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
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        // const newData = JSON.stringify(data)
        const dataGoogle = {
          email: user.email,
          userName: user.displayName,
          photo: user.photoURL,
          role: data.role,
        }
        createCookie('user', JSON.stringify(dataGoogle))

        return dataGoogle as IUser
      })
    }
  } catch (error) {
    console.error(error)
    return null
  }
  return null
}
