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
// import { createCookie, createLocalStorage } from '@/lib'
import { toast } from 'sonner'

interface ILogin {
  email: string
  password: string
}

interface IError {
  code: string
  message: string
}

export const signInWithCredentials = async (
  props: ILogin
): Promise<IUser | string> => {
  const auth = getAuth()
  const firestore = getFirestore()
  const { email, password } = props

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    if (userCredential.user.emailVerified) {
      const usersRef = collection(firestore, 'users')
      const q = query(usersRef, where('email', '==', userCredential.user.email))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        toast.error(
          'No tiene acceso a la plataforma. Contacte al administrador.'
        )
        return 'No tiene acceso a la plataforma. Contacte al administrador.'
      } else {
        let userData: IUser | null = null
        for (const doc of querySnapshot.docs) {
          const data = doc.data()
          userData = {
            id: doc.id,
            email: userCredential.user.email || '',
            userName: userCredential.user.displayName || '',
            photo: userCredential.user.photoURL || '',
            role: data.role || '',
          }
          break // Solo necesitamos el primer documento
        }
        new Promise((resolve) => setTimeout(resolve, 1000))
        return userData as IUser
      }
    } else {
      toast.error('Revise su correo electrónico para verificar su cuenta')
      return 'Por favor, verifique su correo electrónico'
    }
  } catch (error) {
    const err = error as unknown as IError
    if (err.code === 'auth/user-not-found') {
      return 'El usuario no existe'
    } else if (err.code === 'auth/wrong-password') {
      return 'La contraseña es incorrecta'
    } else {
      return err.message
    }
  }
}
